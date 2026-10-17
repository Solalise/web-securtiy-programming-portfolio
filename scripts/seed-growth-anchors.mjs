import nextEnv from "@next/env";
import { createRequire } from "node:module";
import mongoose from "mongoose";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
const require = createRequire(import.meta.url);
require("../mongodb-dns.cjs").configureMongoDns();

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI must be set in .env.local.");
  process.exit(1);
}

const anchors = [
  { date: "2023-03-01", title: "중부대학교 입학", description: "정보보호학과에 입학하며 개발과 보안 학습을 시작했습니다.", growthValue: 0, type: "enrollment" },
  { date: "2024-02-01", title: "군 입대", description: "군 복무를 시작하며 학업과 프로젝트 활동이 잠시 정체된 시기입니다.", growthValue: 18, type: "military" },
  { date: "2025-08-01", title: "전역", description: "군 복무를 마치고 학업과 기술 학습으로 돌아갈 준비를 시작했습니다.", growthValue: 18, type: "military" },
  { date: "2025-09-01", title: "복학 및 학습 재시작", description: "복학 후 웹 개발과 보안 학습, 프로젝트 경험을 다시 확장하기 시작했습니다.", growthValue: 22, type: "return" },
];

try {
  await mongoose.connect(process.env.MONGODB_URI);
  const collection = mongoose.connection.collection("growthevents");
  for (const anchor of anchors) {
    await collection.updateOne(
      { date: anchor.date, title: anchor.title },
      { $setOnInsert: { ...anchor, technologies: [], visible: true, createdAt: new Date(), updatedAt: new Date() } },
      { upsert: true },
    );
  }
  console.log("Growth anchor points are ready.");
} catch (error) {
  const reason = error instanceof Error ? error.name : "UnknownError";
  console.error(`Growth anchor setup failed (${reason}).`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
