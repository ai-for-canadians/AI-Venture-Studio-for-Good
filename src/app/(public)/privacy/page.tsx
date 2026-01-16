import Link from "next/link"
import { Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">
              Venture Studio
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              Last updated: January 2025
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-4">
              Our Commitment to Privacy
            </h2>
            <p className="text-muted-foreground mb-4">
              AI Venture Studio for Good is committed to protecting your privacy. This policy
              explains how we collect, use, and safeguard your information when you use our platform.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-4">
              Information We Collect
            </h2>
            <p className="text-muted-foreground mb-4">
              We collect information you provide directly, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Account information (name, email, location)</li>
              <li>Profile information (motivations, interests, expertise)</li>
              <li>Venture information (projects you create, steps you execute)</li>
              <li>Payment information (processed securely through Stripe)</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Provide and improve our services</li>
              <li>Match you with relevant playbooks</li>
              <li>Customize AI-generated content for your location</li>
              <li>Process payments and manage your account</li>
              <li>Send important updates about your ventures</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-4">
              AI Processing
            </h2>
            <p className="text-muted-foreground mb-4">
              When you execute AI agent steps, your venture information and location are
              sent to our AI providers to generate customized research and content. This
              information is used solely to provide the requested service and is not
              retained by AI providers beyond the processing of your request.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-4">
              Data Security
            </h2>
            <p className="text-muted-foreground mb-4">
              We implement industry-standard security measures to protect your data.
              However, no method of transmission over the Internet is 100% secure,
              and we cannot guarantee absolute security.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-4">
              Your Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and data</li>
              <li>Export your venture data</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this privacy policy or your data, please
              contact us at privacy@venturestudioforgood.ca.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Venture Studio for Good
          </p>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </main>
  )
}
