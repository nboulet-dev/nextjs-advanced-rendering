type OLBookKey = `/works/${string}`
type OLAuthorKey = `/authors/${string}`

export type OLBook = {
  authors: { key: OLAuthorKey; name: string }[]
  cover_id?: number
  key: OLBookKey
  title: string
}
