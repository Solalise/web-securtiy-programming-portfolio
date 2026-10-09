import "server-only";

import { hash } from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import AdminUser, {
  type AdminRole,
  type AdminUserDocument,
} from "@/models/AdminUser";

export type AdminCredentialsRecord = Pick<
  AdminUserDocument,
  "email" | "name" | "passwordHash" | "role"
> & { _id: { toString(): string } };

let seedPromise: Promise<void> | null = null;

function getInitialAdminCredentials(): {
  email: string;
  password: string;
  name: string;
} {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "관리자";

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required.",
    );
  }

  return { email, password, name };
}

async function seedInitialAdmin(): Promise<void> {
  const { email, password, name } = getInitialAdminCredentials();

  await connectDB();

  const existingAdmin = await AdminUser.exists({ email });
  if (existingAdmin) {
    return;
  }

  const passwordHash = await hash(password, 12);

  await AdminUser.updateOne(
    { email },
    {
      $setOnInsert: {
        email,
        passwordHash,
        name,
        role: "admin" satisfies AdminRole,
      },
    },
    { upsert: true },
  );
}

export async function ensureInitialAdmin(): Promise<void> {
  seedPromise ??= seedInitialAdmin().catch((error: unknown) => {
    seedPromise = null;
    throw error;
  });

  await seedPromise;
}

export async function getAdminByEmail(
  email: string,
): Promise<AdminCredentialsRecord | null> {
  await ensureInitialAdmin();

  return AdminUser.findOne({ email: email.trim().toLowerCase() })
    .select("+passwordHash")
    .lean<AdminCredentialsRecord>()
    .exec();
}
