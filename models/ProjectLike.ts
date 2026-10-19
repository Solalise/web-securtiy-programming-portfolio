import { Schema, model, models, type InferSchemaType } from "mongoose";

const projectLikeSchema = new Schema(
  {
    projectSlug: { type: String, required: true, trim: true, maxlength: 120 },
    userId: { type: String, required: true, trim: true, maxlength: 200 },
  },
  { timestamps: true },
);

// 사용자 한 명은 하나의 프로젝트에 한 번만 좋아요를 남길 수 있습니다.
projectLikeSchema.index({ projectSlug: 1, userId: 1 }, { unique: true });
projectLikeSchema.index({ projectSlug: 1, createdAt: -1 });

export type ProjectLikeDocument = InferSchemaType<typeof projectLikeSchema>;

const ProjectLikeModel =
  models.ProjectLike ?? model("ProjectLike", projectLikeSchema);

export default ProjectLikeModel;
