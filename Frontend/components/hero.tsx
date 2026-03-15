import { Button } from "@/components/ui/button"
import { User, Headset } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-primary/5 to-background py-20 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          AI-Powered Government Services
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
          GovHelpPortal{" "}
          
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
          Reducing form rejections and saving operator time using AI. Our intelligent copilot system helps process citizen applications faster, more accurately, and with fewer errors.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login">
          <Button
            size="lg"
            className="w-full sm:w-auto min-w-[200px] h-14 text-lg gap-3 bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <User className="h-5 w-5" />
            USER PORTAL
          </Button>
          </Link>
          <Link href="/Operator">
          <Button
            size="lg"
            className="w-full sm:w-auto min-w-[200px] h-14 text-lg gap-3 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Headset className="h-5 w-5" />
            OPERATOR PORTAL
          </Button>
          </Link>
        </div>

      </div>
    </section>
  )
}
