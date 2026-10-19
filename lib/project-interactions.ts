import "server-only";

import { isValidObjectId, type HydratedDocument } from "mongoose";

import { connectDB } from "@/lib/mongodb";
import ProjectCommentModel, {
  type ProjectCommentDocument,
} from "@/models/ProjectComment";
import ProjectLikeModel from "@/models/ProjectLike";

export type ProjectComment = {
  id: string;
  authorId?: string;
  authorName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export class ProjectCommentNotFoundError extends Error {}
export class ProjectCommentForbiddenError extends Error {}

type HydratedProjectComment = HydratedDocument<ProjectCommentDocument>;

function serializeComment(comment: HydratedProjectComment): ProjectComment {
  return {
    id: comment._id.toString(),
    authorId: comment.authorId || undefined,
    authorName: comment.authorName,
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
    updatedAt: comment.updatedAt.toISOString(),
  };
}

export async function getProjectLikeSummary(
  projectSlug: string,
  userId?: string,
): Promise<{ count: number; likedByCurrentUser: boolean }> {
  await connectDB();

  const [count, ownLike] = await Promise.all([
    ProjectLikeModel.countDocuments({ projectSlug }),
    userId
      ? ProjectLikeModel.exists({ projectSlug, userId })
      : Promise.resolve(null),
  ]);

  return { count, likedByCurrentUser: Boolean(ownLike) };
}

export async function getProjectInteractionCounts(
  projectSlugs: string[],
): Promise<Record<string, { likes: number; comments: number }>> {
  await connectDB();

  const [likeCounts, commentCounts] = await Promise.all([
    ProjectLikeModel.aggregate<{ _id: string; count: number }>([
      { $match: { projectSlug: { $in: projectSlugs } } },
      { $group: { _id: "$projectSlug", count: { $sum: 1 } } },
    ]).exec(),
    ProjectCommentModel.aggregate<{ _id: string; count: number }>([
      { $match: { projectSlug: { $in: projectSlugs } } },
      { $group: { _id: "$projectSlug", count: { $sum: 1 } } },
    ]).exec(),
  ]);

  const counts = Object.fromEntries(
    projectSlugs.map((projectSlug) => [projectSlug, { likes: 0, comments: 0 }]),
  );
  for (const item of likeCounts) counts[item._id] = { ...counts[item._id], likes: item.count };
  for (const item of commentCounts) counts[item._id] = { ...counts[item._id], comments: item.count };
  return counts;
}

export async function getLikedProjectSlugs(actorIds: string[]): Promise<string[]> {
  if (!actorIds.length) return [];
  await connectDB();
  const likes = await ProjectLikeModel.find({
    userId: { $in: actorIds },
  })
    .select({ projectSlug: 1 })
    .exec();
  return likes.map((like) => like.projectSlug);
}

export async function toggleProjectLike(
  projectSlug: string,
  userId: string,
): Promise<{ count: number; liked: boolean }> {
  await connectDB();
  await ProjectLikeModel.init();

  const existing = await ProjectLikeModel.findOneAndDelete({
    projectSlug,
    userId,
  }).exec();

  if (existing) {
    return {
      count: await ProjectLikeModel.countDocuments({ projectSlug }),
      liked: false,
    };
  }

  try {
    await ProjectLikeModel.create({ projectSlug, userId });
    return {
      count: await ProjectLikeModel.countDocuments({ projectSlug }),
      liked: true,
    };
  } catch (error: unknown) {
    if (!isDuplicateKeyError(error)) throw error;
    return {
      count: await ProjectLikeModel.countDocuments({ projectSlug }),
      liked: true,
    };
  }
}

export async function getProjectComments(projectSlug: string): Promise<ProjectComment[]> {
  await connectDB();
  const comments = await ProjectCommentModel.find({ projectSlug })
    .sort({ createdAt: -1, _id: -1 })
    .exec();

  return comments.map(serializeComment);
}

export async function getProjectCommentsBySlugs(
  projectSlugs: string[],
): Promise<Record<string, ProjectComment[]>> {
  await connectDB();
  const comments = await ProjectCommentModel.find({
    projectSlug: { $in: projectSlugs },
  })
    .sort({ createdAt: -1, _id: -1 })
    .exec();

  const result = Object.fromEntries(projectSlugs.map((slug) => [slug, [] as ProjectComment[]]));
  for (const comment of comments) result[comment.projectSlug]?.push(serializeComment(comment));
  return result;
}

export async function createProjectComment(input: {
  projectSlug: string;
  authorId: string;
  authorName: string;
  content: string;
}): Promise<void> {
  await connectDB();
  await ProjectCommentModel.create(input);
}

export async function updateProjectComment(input: {
  commentId: string;
  authorId: string;
  content: string;
}): Promise<void> {
  if (!isValidObjectId(input.commentId)) throw new ProjectCommentNotFoundError();
  await connectDB();

  const comment = await ProjectCommentModel.findOneAndUpdate(
    { _id: input.commentId, authorId: input.authorId },
    { content: input.content },
    { runValidators: true, returnDocument: "after" },
  ).exec();

  if (comment) return;

  const exists = await ProjectCommentModel.exists({ _id: input.commentId });
  if (exists) throw new ProjectCommentForbiddenError();
  throw new ProjectCommentNotFoundError();
}

export async function deleteProjectComment(input: {
  commentId: string;
  authorId: string;
}): Promise<void> {
  if (!isValidObjectId(input.commentId)) throw new ProjectCommentNotFoundError();
  await connectDB();

  const comment = await ProjectCommentModel.findOneAndDelete({
    _id: input.commentId,
    authorId: input.authorId,
  }).exec();

  if (comment) return;

  const exists = await ProjectCommentModel.exists({ _id: input.commentId });
  if (exists) throw new ProjectCommentForbiddenError();
  throw new ProjectCommentNotFoundError();
}

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}
