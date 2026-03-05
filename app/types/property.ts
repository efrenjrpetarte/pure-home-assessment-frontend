import type { Family } from "./family"
import type { PropertyAgent } from "./property-agent"

export interface Property {
  id: string
  agentId: string
  agent: PropertyAgent
  family: Family
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