interface IResponseEvent {
  id: string
  isPublic: boolean
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
}

export interface IResponseEventUser {
  id: string
  userIdOwner: string
  isEventOwner: boolean
  isConfirmed: boolean
  userId: '1ae3a886-1108-4562-9c8a-d0a2ae95a428'
  eventId: '836a9173-4f4f-498b-a8da-879b6c088711'
  event: IResponseEvent
}
