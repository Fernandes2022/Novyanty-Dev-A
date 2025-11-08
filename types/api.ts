export interface Block {
  id: string;
  type: 'text' | 'image' | 'heading' | 'button' | 'divider' | 'code';
  content: string;
  styles?: {
    fontSize?: string;
    color?: string;
    alignment?: 'left' | 'center' | 'right';
    backgroundColor?: string;
    padding?: string;
    margin?: string;
  };
  metadata?: {
    alt?: string;
    url?: string;
    target?: '_blank' | '_self';
  };
}

export interface Workspace {
  id: string;
  name: string;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface DeployPayload {
  projectId: string;
  draftId: string;
  domain?: string;
  environment?: 'production' | 'staging' | 'preview';
}

export interface DeployResponse {
  success: boolean;
  deploymentId?: string;
  url?: string;
  message?: string;
}

export interface UpdatePayload {
  draftId: string;
  changes: {
    content?: string;
    title?: string;
    metadata?: Record<string, any>;
  };
  instruction?: string;
}

export interface UpdateResponse {
  success: boolean;
  updatedDraft?: any;
  message?: string;
}

export interface Draft {
  id: string;
  name: string;
  title?: string;
  content: string;
  htmlContent?: string;
  blocks?: Block[];
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
