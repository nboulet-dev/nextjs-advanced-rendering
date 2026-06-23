import { getBookWithCoverAndAuthor, getCoverUrl } from "@/lib/books"
import { BookOpen, Calendar, Tag, User } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; cover: string; author: string }>
}): Promise<Metadata> {
  const { id, cover, author } = await params
  const book = await getBookWithCoverAndAuthor(id, cover, decodeURIComponent(author))

  if (!book) {
    return {
      title: "Book Not Found",
      description: "This book does not exist.",
    }
  }
  return {
    title: book.title,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      url: `http://localhost:3000/book/${book.id}/${book.coverId}/${encodeURIComponent(book.author)}`,
      images: book.coverId
        ? [
            {
              url: getCoverUrl(book.coverId, "M"),
              alt: `Book cover of ${book.title}`,
            },
          ]
        : [],
    },
  }
}

export default async function BookPage({ params }: { params: Promise<{ id: string; cover: string; author: string }> }) {
  const { id, cover, author } = await params
  const book = await getBookWithCoverAndAuthor(id, cover, decodeURIComponent(author))
  if (!book) notFound()

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="space-y-6">
        <div className="relative aspect-2/3 w-full max-w-70 mx-auto md:max-w-none rounded-xl overflow-hidden border border-border bg-muted shadow-lg">
          {book.coverId ? (
            <Image
              src={getCoverUrl(book.coverId, "L")}
              alt={`Book cover of ${book.title}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-muted-foreground space-y-3">
              <BookOpen className="h-12 w-12 text-muted-foreground/50" />
              <span className="text-sm font-medium">No cover available</span>
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-card p-4 space-y-3 text-sm">
          {book.firstPublishDate && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span>
                First published : <strong className="text-foreground">{book.firstPublishDate}</strong>
              </span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-muted-foreground">
            <User className="h-4 w-4 text-primary" />
            <span>
              Author : <strong className="text-foreground">{book.author}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 space-y-6">
        <div className="space-y-2 border-b pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{book.title}</h1>
          <p className="text-xl text-muted-foreground">
            By <span className="font-semibold text-foreground">{book.author}</span>
          </p>
        </div>

        {book.subjects && book.subjects.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              Subjects
            </h2>
            <div className="flex flex-wrap gap-2">
              {book.subjects.slice(0, 6).map((subject: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-full border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Section Description */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold tracking-tight">Synopsis</h2>
          <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
            {book.description ?? ""}
          </div>
        </div>
      </div>
    </div>
  )
}
