"use server";

import { randomUUID } from "node:crypto";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { auth } from "@/auth";
import {
  createProjectComment,
  deleteProjectComment,
  ProjectCommentForbiddenError,
  ProjectCommentNotFoundError,
  toggleProjectLike,
  updateProjectComment,
} from "@/lib/project-interactions";
import { getProject } from "@/lib/projects";

type CommentActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

function getText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

async function getAuthenticatedUser() {
  const session = await auth();
  const id = session?.user?.id;

  if (!id) return null;
  return {
    id,
    name: session.user.name?.trim() || session.user.email?.trim() || "사용자",
  };
}

async function getLikeActorId(): Promise<string> {
  const user = await getAuthenticatedUser();
  if (user) return `user:${user.id}`;

  const cookieStore = await cookies();
  const existingVisitorId = cookieStore.get("portfolio_like_visitor")?.value;
  if (existingVisitorId) return `visitor:${existingVisitorId}`;

  const visitorId = randomUUID();
  cookieStore.set("portfolio_like_visitor", visitorId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return `visitor:${visitorId}`;
}

async function isKnownProject(projectSlug: string): Promise<boolean> {
  return Boolean(projectSlug && (await getProject(projectSlug)));
}

function revalidateProject(projectSlug: string): void {
  revalidatePath("/projects");
  revalidatePath(`/projects/${projectSlug}`);
}

export async function likeProjectAction(projectSlug: string): Promise<{
  ok: boolean;
  message: string;
  count?: number;
  liked?: boolean;
}> {
  if (!(await isKnownProject(projectSlug))) {
    return { ok: false, message: "프로젝트를 찾을 수 없습니다." };
  }

  const result = await toggleProjectLike(projectSlug, await getLikeActorId());
  revalidateProject(projectSlug);
  return {
    ok: true,
    count: result.count,
    liked: result.liked,
    message: result.liked ? "좋아요를 남겼습니다." : "좋아요를 취소했습니다.",
  };
}

export async function createProjectCommentAction(
  _previousState: CommentActionState,
  formData: FormData,
): Promise<CommentActionState> {
  const projectSlug = getText(formData, "projectSlug");
  const authorName = getText(formData, "authorName");
  const content = getText(formData, "content");
  if (!(await isKnownProject(projectSlug))) {
    return { status: "error", message: "프로젝트를 찾을 수 없습니다." };
  }
  if (!content || content.length > 1000) {
    return { status: "error", message: "댓글은 1~1,000자 사이로 입력해 주세요." };
  }
  if (!authorName || authorName.length > 80) {
    return { status: "error", message: "이름 또는 닉네임은 1~80자 사이로 입력해 주세요." };
  }

  try {
    await createProjectComment({
      projectSlug,
      authorId: await getLikeActorId(),
      authorName,
      content,
    });
    revalidateProject(projectSlug);
    return { status: "success", message: "댓글을 등록했습니다." };
  } catch {
    return { status: "error", message: "댓글을 등록하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }
}

export async function updateProjectCommentAction(
  _previousState: CommentActionState,
  formData: FormData,
): Promise<CommentActionState> {
  const user = await getAuthenticatedUser();
  if (!user) return { status: "error", message: "로그인 후 댓글을 수정할 수 있습니다." };

  const projectSlug = getText(formData, "projectSlug");
  const commentId = getText(formData, "commentId");
  const content = getText(formData, "content");
  if (!(await isKnownProject(projectSlug))) {
    return { status: "error", message: "프로젝트를 찾을 수 없습니다." };
  }
  if (!content || content.length > 1000) {
    return { status: "error", message: "댓글은 1~1,000자 사이로 입력해 주세요." };
  }

  try {
    await updateProjectComment({ commentId, authorId: user.id, content });
    revalidateProject(projectSlug);
    return { status: "success", message: "댓글을 수정했습니다." };
  } catch (error: unknown) {
    return toCommentErrorState(error, "수정");
  }
}

export async function deleteProjectCommentAction(
  _previousState: CommentActionState,
  formData: FormData,
): Promise<CommentActionState> {
  const user = await getAuthenticatedUser();
  if (!user) return { status: "error", message: "로그인 후 댓글을 삭제할 수 있습니다." };

  const projectSlug = getText(formData, "projectSlug");
  const commentId = getText(formData, "commentId");
  if (!(await isKnownProject(projectSlug))) {
    return { status: "error", message: "프로젝트를 찾을 수 없습니다." };
  }

  try {
    await deleteProjectComment({ commentId, authorId: user.id });
    revalidateProject(projectSlug);
    return { status: "success", message: "댓글을 삭제했습니다." };
  } catch (error: unknown) {
    return toCommentErrorState(error, "삭제");
  }
}

function toCommentErrorState(error: unknown, action: "수정" | "삭제"): CommentActionState {
  if (error instanceof ProjectCommentForbiddenError) {
    return { status: "error", message: "본인이 작성한 댓글만 " + action + "할 수 있습니다." };
  }
  if (error instanceof ProjectCommentNotFoundError) {
    return { status: "error", message: "댓글을 찾을 수 없습니다." };
  }
  return { status: "error", message: `댓글을 ${action}하지 못했습니다. 잠시 후 다시 시도해 주세요.` };
}
