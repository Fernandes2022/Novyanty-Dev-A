export interface Draft {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  metadata?: {
    author?: string
    tags?: string[]
    [key: string]: any
  }
}
