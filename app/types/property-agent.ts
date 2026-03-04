export interface PropertyAgent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: string;
  updatedAt: string;
}

// 👇 For creating
export interface CreatePropertyAgentDto {
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
}