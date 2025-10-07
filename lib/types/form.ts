export interface DemoFormData {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  organizationType?: string;
  surveyNeeds?: string;
}

export interface DemoSubmission extends DemoFormData {
  id: string;
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  submissionId?: string;
}


