export interface Tenant {
  id: string
  familyId: string
  firstName: string
  lastName: string
  contactNumber: string
  createdAt: Date
}

// 👇 For creating
export interface CreateTenantDto {
  familyId: string
  firstName: string
  lastName: string
  contactNumber: string
}