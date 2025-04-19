import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Monitor, Camera, Maximize, Layout, ImageIcon, Zap, MessageSquare, RefreshCw } from "lucide-react"
import { Releases } from "@/components/releases"
import { FAQ } from "@/components/faq"
import { FeedbackForm } from '@/components/feedback-form'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B1120]">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center gap-2">
            <Layout className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Screen Split</span>
            <span className="rounded-full bg-primary/90 px-2 py-0.5 text-xs font-medium text-primary-foreground">BETA</span>
          </div>
          <nav className="ml-auto flex items-center gap-4">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Features
            </Link>
            <Link href="#download" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Download
            </Link>
            <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-primary">
              FAQ
            </Link>
            <Link href="#feedback" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Feedback
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-16 md:py-20 bg-gradient-to-b from-[#0B1120] to-[#000000]">
          <div className="mx-auto max-w-[980px] text-center">
            <h1 className="text-4xl font-bold tracking-tighter md:text-6xl lg:leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-white via-[#93C5FD] to-[#3B82F6]">
              Create cleaner
              content – with
              screen & self
              side-by-side
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              The perfect tool for streamers, educators, and presenters who want to show both their screen and face in one clean window.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="#download">
                  <Download className="mr-2 h-5 w-5" />
                  Download Beta
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/10" asChild>
                <Link href="#features">
                  Learn more
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="h-8 bg-gradient-to-b from-[#000000] to-[#0B1120]" />

        <section className="container py-16 md:py-20 bg-[#0B1120]" id="features">
          <div className="mx-auto max-w-[980px] text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-[#3b82f6]">
              Powerful Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Screen Split gives you everything you need to create professional-looking content with both your screen and webcam.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-start gap-2 rounded-lg border border-primary/20 bg-secondary/50 p-6">
                <Layout className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Side-by-Side Display</h3>
                <p className="text-muted-foreground">
                  View your screen capture and webcam feed simultaneously in a single, adjustable window.
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 rounded-lg border border-primary/20 bg-secondary/50 p-6">
                <Monitor className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Multi-Monitor Support</h3>
                <p className="text-muted-foreground">
                  Capture from any connected display while maintaining high-quality output.
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 rounded-lg border border-primary/20 bg-secondary/50 p-6">
                <Maximize className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Resizable Interface</h3>
                <p className="text-muted-foreground">
                  Drag to resize both screen and webcam areas to create your perfect layout.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 border-t border-primary/20 bg-[#000000]" id="download">
          <div className="container">
            <div className="mx-auto max-w-[980px]">
              <Releases />
            </div>
          </div>
        </section>

        <section className="container py-16 md:py-20 border-t border-primary/20 bg-[#0B1120]" id="faq">
          <div className="mx-auto max-w-[980px] text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-[#3b82f6]">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get answers to common questions about Screen Split.
            </p>
            <div className="mt-8">
              <FAQ />
            </div>
          </div>
        </section>

        <section className="container py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">
              Your Feedback Matters
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Help us improve Screen Split by sharing your thoughts and suggestions. Your feedback directly influences our development priorities.
            </p>
          </div>
          <div className="mx-auto max-w-2xl mt-10">
            <div className="rounded-lg border bg-card p-6">
              <FeedbackForm />
            </div>
          </div>
        </section>

        <footer className="border-t border-primary/20 py-6 md:py-0 bg-[#000000]">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <Layout className="h-6 w-6 text-primary" />
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by Kieran Jackson. The source code is available on{" "}
                <Link href="https://github.com/KezLahd/Screen-Split" className="font-medium text-primary hover:underline underline-offset-4">
                  GitHub
                </Link>
                .
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
