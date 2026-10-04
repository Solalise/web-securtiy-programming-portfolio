export type DevLog = {
  id: string;
  title: string;
  summary: string;
  content: {
    problem?: string;
    cause?: string;
    solution?: string[];
    learned?: string;
  };
  tags: string[];
  createdAt: string;
};
