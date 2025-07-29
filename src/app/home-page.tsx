import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, DollarSign, ArrowRight, Star, Shield, Zap, Target, Clock, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">ADmyBRAND Insights</h1>
          </div>
          <Link href="/dashboard">
            <Button>
              Open Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            AI-Powered 
            <span className="text-primary"> Analytics Dashboard</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your data into actionable insights with our modern analytics platform 
            designed for digital marketing agencies.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg">
                View Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Analytics Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to track, analyze, and optimize your digital marketing performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <DollarSign className="h-8 w-8 mx-auto text-primary" />
              <CardTitle>Revenue Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor your revenue streams and identify growth opportunities with real-time tracking.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-8 w-8 mx-auto text-primary" />
              <CardTitle>User Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Understand your audience behavior and engagement patterns across all channels.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="h-8 w-8 mx-auto text-primary" />
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track key performance indicators and conversion rates to optimize your campaigns.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-8 w-8 mx-auto text-primary" />
              <CardTitle>Interactive Charts</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visualize your data with beautiful, interactive charts and customizable dashboards.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-primary">10K+</h3>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-primary">$2.5M+</h3>
            <p className="text-muted-foreground">Revenue Tracked</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-primary">99.9%</h3>
            <p className="text-muted-foreground">Uptime</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-primary">500+</h3>
            <p className="text-muted-foreground">Agencies Trust Us</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted by leading agencies worldwide to drive data-driven decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription>
                  "ADmyBRAND Insights transformed how we track campaign performance. The real-time analytics helped us increase ROI by 40%."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Mitchell</p>
                    <p className="text-sm text-muted-foreground">Marketing Director, TechFlow Agency</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription>
                  "The intuitive dashboard and detailed reporting saved us countless hours. We can now focus on strategy instead of data collection."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">MJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael Johnson</p>
                    <p className="text-sm text-muted-foreground">CEO, Digital Growth Solutions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription>
                  "Best analytics platform we've used. The AI-powered insights helped us optimize our clients' campaigns like never before."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">ER</span>
                  </div>
                  <div>
                    <p className="font-semibold">Emily Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Analytics Lead, Boost Marketing</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose ADmyBRAND Insights?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built for modern agencies with enterprise-grade security and performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="text-center border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <Shield className="h-8 w-8 mx-auto text-primary" />
              <CardTitle>Enterprise Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                SOC 2 compliant with end-to-end encryption and regular security audits.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <Zap className="h-8 w-8 mx-auto text-primary" />
              <CardTitle>Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Sub-second query performance with real-time data processing and updates.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <Target className="h-8 w-8 mx-auto text-primary" />
              <CardTitle>AI-Powered Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Machine learning algorithms identify trends and anomalies automatically.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <Clock className="h-8 w-8 mx-auto text-primary" />
              <CardTitle>24/7 Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Round-the-clock customer support with dedicated account managers.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <Award className="h-8 w-8 mx-auto text-primary" />
              <CardTitle>Industry Leading</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Recognized by Gartner and Forrester as a leader in analytics platforms.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <BarChart3 className="h-8 w-8 mx-auto text-primary" />
              <CardTitle>Custom Dashboards</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create unlimited custom dashboards tailored to your specific needs.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Integration Section */}
      <section className="bg-muted/30 py-16 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Seamless Integrations</h2>
            <p className="text-muted-foreground">
              Connect with your existing tools and platforms in minutes, not hours.
            </p>
            
            {/* Marquee Animation */}
            <div className="relative mt-12">
              <div className="flex animate-marquee">
                {/* First set of cards */}
                <div className="flex space-x-6 shrink-0">
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">Google Analytics</p>
                    <p className="text-xs text-muted-foreground mt-1">Web Analytics</p>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">Facebook Ads</p>
                    <p className="text-xs text-muted-foreground mt-1">Social Media</p>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">Google Ads</p>
                    <p className="text-xs text-muted-foreground mt-1">Search Advertising</p>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">Shopify</p>
                    <p className="text-xs text-muted-foreground mt-1">E-commerce</p>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">HubSpot</p>
                    <p className="text-xs text-muted-foreground mt-1">CRM & Marketing</p>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">Salesforce</p>
                    <p className="text-xs text-muted-foreground mt-1">Customer Success</p>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">Stripe</p>
                    <p className="text-xs text-muted-foreground mt-1">Payment Processing</p>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">Slack</p>
                    <p className="text-xs text-muted-foreground mt-1">Team Communication</p>
                  </div>
                </div>
                
                {/* Exact duplicate set for seamless loop */}
                <div className="flex space-x-6 shrink-0 ml-6">
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">Google Analytics</p>
                    <p className="text-xs text-muted-foreground mt-1">Web Analytics</p>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">Facebook Ads</p>
                    <p className="text-xs text-muted-foreground mt-1">Social Media</p>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">Google Ads</p>
                    <p className="text-xs text-muted-foreground mt-1">Search Advertising</p>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">Shopify</p>
                    <p className="text-xs text-muted-foreground mt-1">E-commerce</p>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">HubSpot</p>
                    <p className="text-xs text-muted-foreground mt-1">CRM & Marketing</p>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">Salesforce</p>
                    <p className="text-xs text-muted-foreground mt-1">Customer Success</p>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">Stripe</p>
                    <p className="text-xs text-muted-foreground mt-1">Payment Processing</p>
                  </div>
                  <div className="p-6 bg-background rounded-xl shadow-sm border hover:shadow-md transition-shadow min-w-[180px]">
                    <p className="font-semibold text-base">Slack</p>
                    <p className="text-xs text-muted-foreground mt-1">Team Communication</p>
                  </div>
                </div>
              </div>
              
              {/* Gradient overlays for smooth fade effect */}
              <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-muted/30 to-transparent pointer-events-none"></div>
              <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-muted/30 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-muted-foreground">
              Join thousands of agencies already using ADmyBRAND Insights to drive growth and optimize performance.
            </p>
            <Link href="/dashboard">
              <Button size="lg">
                Launch Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-bold">ADmyBRAND Insights</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                The leading analytics platform for digital marketing agencies worldwide.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Analytics</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Reports</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Integrations</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2025 ADmyBRAND Insights. Built with Next.js, Tailwind CSS, and shadcn/ui.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
