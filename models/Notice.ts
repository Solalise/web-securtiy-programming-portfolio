import { Schema, model, models, type InferSchemaType } from "mongoose";

const noticeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export type NoticeDocument = InferSchemaType<typeof noticeSchema>;

const Notice = models.Notice ?? model("Notice", noticeSchema);

export default Notice;
