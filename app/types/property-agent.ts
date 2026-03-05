import type { Property } from "./property";

export interface PropertyAgent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt: Date;
  updatedAt: Date;
  properties: Property[]
}

// 👇 For creating
export interface CreatePropertyAgentDto {
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
}