export interface Announcement {
  id: string
  agentId: string
  propertyId: string
  familyId: string 
  title: string
  description: string
  date: Date
  createdAt: Date
}

// 👇 For creating
export interface CreateAnnouncementDto {
  agentId: string
  propertyId: string
  familyId: string
  title: string
  description: string
  date: Date
}