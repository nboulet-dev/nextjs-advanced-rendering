import "server-only"
import { Book } from "./types"

export async function getBooks(limit = 10) {
  const searchParams = new URLSearchParams()
  searchParams.set("limit", limit.toString())
  const res = await fetch("http://localhost:3000/api/books?" + searchParams, { next: { revalidate: 60 } })

  if (!res.ok) {
    throw new Error(`Cannot fetch books localhost : HTTP status ${res.status}`)
  }

  const books: Book[] = await res.json()

  return books
}
