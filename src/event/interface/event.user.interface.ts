export interface IResponseEventUser {
  id: string
  userIdOwner: string
  isEventOwner: boolean
  userId: string
  isPublic: boolean
  title: string
  status: string
  description: string
  startDate: Date
  endDate: Date
  startTime: Date
  endTime: Date
}
