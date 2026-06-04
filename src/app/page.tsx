import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { getRandomBooks } from "@/lib/books"
import { BookOpen } from "lucide-react"
import Image from "next/image"

export default async function HomePage() {
  const books = (await getRandomBooks()).filter((book) => typeof book.coverUrl !== "undefined")
  return (
    <main className="container max-w-4xl mx-auto px-4 py-12 space-y-10">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-primary">
          <BookOpen className="h-5 w-5" />
          <span className="text-sm font-semibold tracking-wider uppercase">Curated Selection</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Popular Classics</h1>
        <p className="text-muted-foreground text-lg">
          Explore a showcase of timeless literary masterpieces fetched from Open Library.
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative px-12 py-4 bg-muted/30 rounded-2xl border border-border/50">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {books.map((book) => (
              <CarouselItem key={book.id} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden border-none bg-transparent shadow-none pt-0 group">
                    <CardContent className="p-0 flex flex-col space-y-3">
                      <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg border border-border bg-muted shadow-md group-hover:shadow-xl group-hover:border-primary/50 transition-all duration-300">
                        {book.coverUrl && (
                          <Image
                            src={book.coverUrl}
                            alt={`Cover of ${book.title}`}
                            className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                          />
                        )}
                      </div>

                      {/* Book Metadata */}
                      <div className="space-y-1 px-1">
                        <h3 className="font-semibold text-base tracking-tight leading-none group-hover:text-primary transition-colors line-clamp-1">
                          {book.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">by {book.author}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="ml-2 top-1/2" />
          <CarouselNext className="mr-2 top-1/2" />
        </Carousel>
      </div>
    </main>
  )
}
