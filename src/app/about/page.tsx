import { BookOpen, Trophy, HelpCircle, Code2 } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="container max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">About This Project</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A web application built for training purposes, blending literature exploration with interactive gaming.
        </p>
      </section>

      <hr className="border-border" />

      {/* Features Grid */}
      <section className="grid gap-6 sm:grid-cols-2">
        {/* Feature 1 */}
        <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-3">
          <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
            <BookOpen className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">Book Discovery</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Explore an extensive catalog of books fetched directly from the
            <span className="font-medium text-foreground"> Open Library API</span>. Browse titles, discover classics, and dive
            into literary history.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-3">
          <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">Literary Quiz</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Test your general knowledge with our interactive quiz powered by the
            <span className="font-medium text-foreground"> Open Trivia Database</span>. Perfect for bookworms looking for a
            challenge.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-3">
          <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
            <Trophy className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">Player Statistics</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Visualize community engagement and player performance through our custom dashboard charts, showcasing simulated
            gameplay data.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-3">
          <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary">
            <Code2 className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">Tech Stack</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Built using modern web technologies: <span className="font-medium text-foreground">Next.js</span> with typescript,
            Tailwind CSS and Shadcn UI components.
          </p>
        </div>
      </section>

      {/* Footer note */}
      <footer className="text-center pt-6">
        <p className="text-xs text-muted-foreground">
          Developed as part of a professional web development training program. All player data is simulated.
        </p>
      </footer>
    </main>
  )
}
