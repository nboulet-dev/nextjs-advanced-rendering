import "server-only"
import { Book, OLBook, OLWork } from "./types"
import { cacheLife } from "next/cache"

const booksUrl = "https://openlibrary.org"
const coversUrl = "https://covers.openlibrary.org/b" // /$key/$value-$size.jpg

const SUBJECTS = ["romance", "cooking", "horror", "fantasy", "short_stories", "painting", "ancient_civilization"]

export async function getBooks(limit = 10) {
  "use cache"
  cacheLife("minutes")

  const subject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)]

  console.log("Fetch random books from Open Library", subject)

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  try {
    const res = await fetch(`${booksUrl}/subjects/${subject}.json?limit=${limit}`, { signal: controller.signal })

    if (!res.ok) throw new Error(`Cannot fetch books from Open Library : HTTP status ${res.status}`)

    const data: { works: OLBook[] } = await res.json()

    const books: Book[] = data.works.map((book) => ({
      id: book.key.replace(/^\/works\//, ""),
      coverId: book.cover_id ? book.cover_id.toString() : undefined,
      title: book.title,
      author: book.authors[0]?.name || "Unknown author",
    }))

    console.log("Fetched", subject)

    return books
  } catch (error) {
    console.warn(error)
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function getBookWithCoverAndAuthor(id: string, coverId: string, author: string) {
  // console.log("Fetch book from Open Library", id)

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 4000)

  try {
    const res = await fetch(`${booksUrl}/works/${id}.json`, { next: { revalidate: 22118400 } })

    if (!res.ok) throw new Error(`Cannot fetch book from Open Library : HTTP status ${res.status}`)

    const work: OLWork = await res.json()

    const book: Book = {
      id,
      coverId,
      title: work.title,
      author,
      description: typeof work.description === "object" && work.description !== null ? work.description.value : work.description,
      firstPublishDate: work.first_publish_date,
      subjects: work.subjects,
    }

    return book
  } catch (error) {
    console.warn("Open Library API timed out or failed", error)
    return null
  } finally {
    clearTimeout(timeoutId)
  }
}

export function getCoverUrl(coverId: string, size: "S" | "M" | "L") {
  return `${coversUrl}/ID/${coverId}-${size}.jpg`
}
