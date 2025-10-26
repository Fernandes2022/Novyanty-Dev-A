export interface Draft {
  id: string;
  title: string;
  lastEdited: string;
  blocks: Block[];
}

export interface Block {
  id: string;
  type: 'text' | 'heading' | 'image' | 'code';
  content: string;
}

export interface CreateRequest {
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
}

export interface UpdateRequest {
  draftId: string;
  content: Draft;
}

export interface UpdateResponse {
  success: boolean;
  message: string;
}

export interface DeployRequest {
  draftId: string;
}

export interface DeployResponse {
  success: boolean;
  url: string;
}

export interface PaymentRequest {
  amount: number;
  userId: string;
  plan: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  unlockedFeatures: string[];
}