import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default async function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to book list</span>
        </Link>
      </div>

      <Suspense>{children}</Suspense>
    </main>
  )
}
