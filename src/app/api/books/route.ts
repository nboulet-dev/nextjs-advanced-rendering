import "server-only"

import { OLBook } from "@/lib/types"
import { NextRequest } from "next/server"

const booksUrl = "https://openlibrary.org"
const coversUrl = "https://covers.openlibrary.org/b" // /$key/$value-$size.jpg

const SUBJECTS = ["romance", "cooking", "horror", "fantasy", "short_stories", "painting", "ancient_civilization"]

export async function GET(request: NextRequest) {
  const subject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)]
  const searchParams = request.nextUrl.searchParams
  const limit = searchParams.get("limit") ?? 10

  console.log("Fetch random books from Open Library", subject)

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 4000)

  let res

  try {
    res = await fetch(`${booksUrl}/subjects/${subject}.json?limit=${limit}`)
  } catch (error) {
    console.warn("Open Library API timed out or failed", error)
    return []
  } finally {
    clearTimeout(timeoutId)
  }

  if (!res.ok) {
    throw new Error(`Cannot fetch books from Open Library : HTTP status ${res.status}`)
  }

  const data: { works: OLBook[] } = await res.json()

  const books = data.works.map((book) => ({
    id: book.key.replace(/^\/works\//, ""),
    coverUrl: book.cover_id ? `${coversUrl}/ID/${book.cover_id}-L.jpg` : undefined,
    title: book.title,
    author: book.authors[0]?.name || "Unknown author",
  }))

  return Response.json(books)
}
