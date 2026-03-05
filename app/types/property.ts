export interface Property {
  id: string
  agentId: string
  name: string
  address: string
  createdAt: Date
  updatedAt: Date
}

// 👇 For creating
export interface CreatePropertyDto {
  agentId: string
  name: string
  address: string
}