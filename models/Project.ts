import { Schema, model, models, type InferSchemaType } from "mongoose";

const projectSchema = new Schema(
  {
    slug: { type: String, required: true, trim: true, unique: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    techStack: { type: [String], default: [] },
    thumbnail: { type: String, trim: true },
    overview: { type: String, trim: true, default: "" },
    problem: { type: String, trim: true, default: "" },
    features: { type: [String], default: [] },
    role: { type: String, trim: true, default: "" },
    troubleshooting: { type: String, trim: true, default: "" },
    learned: { type: [String], default: [] },
    githubUrl: { type: String, trim: true },
    demoUrl: { type: String, trim: true },
    period: { type: String, trim: true },
    teamSize: { type: String, trim: true },
    status: { type: String, required: true, trim: true },
    featured: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

export type ProjectDocument = InferSchemaType<typeof projectSchema>;

const ProjectModel = models.Project ?? model("Project", projectSchema);

export default ProjectModel;
