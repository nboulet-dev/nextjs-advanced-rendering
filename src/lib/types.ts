type OLBookKey = `/works/${string}`
type OLAuthorKey = `/authors/${string}`

export type OLBook = {
  authors: { key: OLAuthorKey; name: string }[]
  cover_id?: number
  key: OLBookKey
  title: string
}

export type OLWork = {
  authors: { key: OLAuthorKey; name: string }[]
  covers?: number[]
  key: OLBookKey
  title: string
  description: string | { value: string }
  first_publish_date: string
  subjects: string[]
}

export type Book = {
  id: string
  coverId?: string
  title: string
  author: string
  description?: string
  firstPublishDate?: string
  subjects?: string[]
}
