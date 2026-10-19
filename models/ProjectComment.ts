import { Schema, model, models, type InferSchemaType } from "mongoose";

const projectCommentSchema = new Schema(
  {
    projectSlug: { type: String, required: true, trim: true, maxlength: 120 },
    // 비로그인 방문자도 이름만으로 간단히 의견을 남길 수 있습니다.
    authorId: { type: String, trim: true, maxlength: 200 },
    authorName: { type: String, required: true, trim: true, maxlength: 80 },
    content: { type: String, required: true, trim: true, maxlength: 1000 },
  },
  { timestamps: true },
);

projectCommentSchema.index({ projectSlug: 1, createdAt: -1, _id: -1 });
projectCommentSchema.index({ authorId: 1, createdAt: -1 });

export type ProjectCommentDocument = InferSchemaType<typeof projectCommentSchema>;

const ProjectCommentModel =
  models.ProjectComment ?? model("ProjectComment", projectCommentSchema);

export default ProjectCommentModel;
