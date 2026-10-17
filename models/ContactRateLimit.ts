import { Schema, model, models, type InferSchemaType } from "mongoose";

const contactRateLimitSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    count: { type: Number, required: true, default: 0 },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false },
);

contactRateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type ContactRateLimitDocument = InferSchemaType<
  typeof contactRateLimitSchema
>;

const ContactRateLimitModel =
  models.ContactRateLimit ?? model("ContactRateLimit", contactRateLimitSchema);

export default ContactRateLimitModel;
