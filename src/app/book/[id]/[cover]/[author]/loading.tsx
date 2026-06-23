import { Skeleton } from "@/components/ui/skeleton"

export default function BookDetailLoading() {
  return (
    <main className="container max-w-2xl mx-auto px-4 py-12 space-y-6 animate-pulse">
      <Skeleton className="h-10 w-3/4 rounded-lg bg-muted" />

      <Skeleton className="h-4 w-1/4 rounded-lg bg-muted" />

      <div className="space-y-3 pt-4">
        <Skeleton className="h-4 w-full rounded-lg bg-muted" />
        <Skeleton className="h-4 w-full rounded-lg bg-muted" />
        <Skeleton className="h-4 w-5/6 rounded-lg bg-muted" />
        <Skeleton className="h-4 w-2/3 rounded-lg bg-muted" />
      </div>
    </main>
  )
}
