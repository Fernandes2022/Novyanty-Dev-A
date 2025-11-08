export interface Draft {
  id: string;
  name: string;
  title?: string;
  content: string;
  htmlContent?: string;
  createdAt: string;
  updatedAt: string;
  published?: boolean;
  previewUrl?: string;
  metadata?: {
    description?: string;
    keywords?: string[];
    author?: string;
    [key: string]: any;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  drafts: Draft[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}
