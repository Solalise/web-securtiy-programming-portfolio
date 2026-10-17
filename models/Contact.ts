import { Schema, model, models, type InferSchemaType } from "mongoose";

const contactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 50 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    category: {
      type: String,
      required: true,
      enum: ["collaboration", "development", "other"],
    },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    content: { type: String, required: true, trim: true, maxlength: 5000 },
    status: {
      type: String,
      required: true,
      enum: ["pending", "answered", "unread", "read", "completed"],
      default: "pending",
    },
    isPrivate: { type: Boolean, required: true, default: false },
    passwordHash: { type: String, select: false },
    answer: { type: String, trim: true, maxlength: 5000 },
    answeredAt: { type: Date },
    answerUpdatedAt: { type: Date },
  },
  { timestamps: true },
);

contactSchema.index({ createdAt: -1, _id: -1 });
contactSchema.index({ status: 1, createdAt: -1, _id: -1 });

export type ContactDocument = InferSchemaType<typeof contactSchema>;

const ContactModel = models.Contact ?? model("Contact", contactSchema);

export default ContactModel;
