import { QrCode, FileCheck, AlertTriangle, Languages } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: QrCode,
    title: "QR Based Citizen Identity",
    description:
      "Secure and instant citizen identification through QR code scanning. Streamlines the verification process and reduces manual data entry errors.",
  },
  {
    icon: FileCheck,
    title: "AI Form Validation",
    description:
      "Intelligent form checking that automatically validates submissions against requirements, ensuring completeness before processing begins.",
  },
  {
    icon: AlertTriangle,
    title: "Rejection Prediction",
    description:
      "Predictive AI that identifies potential issues before submission, helping operators guide citizens to correct problems proactively.",
  },
  {
    icon: Languages,
    title: "Multilingual AI Assistant",
    description:
      "AI-powered language support that assists operators in communicating with citizens in their preferred language, breaking down barriers.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Powerful Features for Modern Government Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI copilot system is designed to enhance operator efficiency and improve citizen experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border/60 hover:border-primary/40 transition-colors hover:shadow-md"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
