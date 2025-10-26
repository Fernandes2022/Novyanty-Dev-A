export interface Block {
  id: string;
  type: 'text' | 'heading' | 'image' | 'code';
  content: string;
  style?: Record<string, string | undefined>;
}

export interface Draft {
  id: string;
  title: string;
  lastEdited: string;
  blocks: Block[];
  status?: 'draft' | 'published';
  createdAt?: string;
  userId?: string;
  publishedUrl?: string;
  [key: string]: any;
}

export interface CreatePayload {
  prompt: string;
  settings: {
    tone: string;
    length: string;
  };
}

export interface CreateResponse {
  success: boolean;
  draftId: string;
  previewData: Draft;
  message?: string;
  [key: string]: any;
}

export interface UpdatePayload {
  draftId: string;
  content: Draft;
}

export interface UpdateResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}

export interface DeployPayload {
  draftId: string;
}

export interface DeployResponse {
  success: boolean;
  url: string;
  [key: string]: any;
}

export interface PaymentPayload {
  amount: number;
  userId: string;
  plan: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  unlockedFeatures: string[];
  [key: string]: any;
}
