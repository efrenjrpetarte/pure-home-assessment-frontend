export interface Family {
  id: string
  propertyId: string
  name: string
  createdAt: Date
}

// 👇 For creating
export interface CreateFamilyDto {
  propertyId: string
  name: string
}