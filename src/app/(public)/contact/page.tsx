import Link from "next/link"
import { Sprout, Mail, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ContactPage() {
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

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 gradient-mesh">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about launching your venture? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-3xl font-bold mb-6">
                Let's Talk About Your Vision
              </h2>
              <p className="text-muted-foreground mb-8">
                Whether you're just exploring ideas or ready to launch, we'd love
                to hear from you. Our team is passionate about helping community
                builders succeed.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Us</h4>
                    <p className="text-muted-foreground text-sm">
                      hello@venturestudiroforgood.ca
                    </p>
                    <p className="text-muted-foreground text-sm">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Community</h4>
                    <p className="text-muted-foreground text-sm">
                      Join our community of builders on Discord
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Share experiences and get peer support
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Based in Canada</h4>
                    <p className="text-muted-foreground text-sm">
                      Serving communities from coast to coast
                    </p>
                    <p className="text-muted-foreground text-sm">
                      All playbooks tailored for Canadian context
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl border border-border/50 p-8">
              <h3 className="font-display text-xl font-semibold mb-6">
                Send Us a Message
              </h3>

              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input placeholder="Your name" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    What brings you here?
                  </label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>Exploring playbooks</option>
                    <option>Ready to launch a venture</option>
                    <option>Partnership inquiry</option>
                    <option>Press/media</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <textarea
                    className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Tell us about your community and what you're hoping to build..."
                  />
                </div>

                <Button className="w-full" size="lg">
                  Send Message
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We typically respond within 24 hours.
                </p>
              </form>
            </div>
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
