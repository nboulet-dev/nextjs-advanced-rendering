import "server-only"
import { OLBook } from "./types"

const booksUrl = "https://openlibrary.org"
const coversUrl = "https://covers.openlibrary.org/b" // /$key/$value-$size.jpg

const SUBJECTS = ["romance", "cooking", "horror", "fantasy", "short_stories", "painting", "ancient_civilization"]

function getPseudoRandomSubject() {
  const nowInSeconds = Math.floor(Date.now() / 1000)

  const timeBlock = Math.floor(nowInSeconds / 60)
  const randomIndex = timeBlock % SUBJECTS.length
  const currentSubject = SUBJECTS[randomIndex]

  console.log(`[Server] Fetching subject: ${currentSubject} (Block: ${timeBlock})`)
  return currentSubject
}

export async function getRandomBooks(subject: string = getPseudoRandomSubject(), limit = 10) {
  console.log("getRandomBooks", subject)

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 4000)

  let res

  try {
    res = await fetch(`${booksUrl}/subjects/${subject}.json?limit=${limit}`, {
      signal: controller.signal,
      next: { revalidate: 60 },
    })
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

  return books
}
