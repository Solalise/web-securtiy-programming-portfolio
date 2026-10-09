import { model, models, Schema, type Model } from "mongoose";

export type AdminRole = "admin";

export interface AdminUserDocument {
  email: string;
  passwordHash: string;
  name: string;
  role: AdminRole;
  createdAt: Date;
  updatedAt: Date;
}

const adminUserSchema = new Schema<AdminUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
      required: true,
    },
  },
  { timestamps: true },
);

const AdminUser =
  (models.AdminUser as Model<AdminUserDocument> | undefined) ??
  model<AdminUserDocument>("AdminUser", adminUserSchema);

export default AdminUser;
