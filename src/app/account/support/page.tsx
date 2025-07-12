
import { AppShell } from "@/components/shared/app-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Go to settings and click 'Reset Password'. If you are logged out, you can use the 'Forgot Password' link on the login page.",
  },
  {
    question: "How to deploy a project?",
    answer: "Navigate to the 'Project Deployer' from the sidebar. You can create a new project or link an existing repository and follow the CI/CD setup wizard.",
  },
  {
    question: "Can I invite my teammates?",
    answer: "Yes! Use the 'CollabBoard' to find collaborators. You can create posts to look for team members or send invites directly from the 'Connect' tab.",
  }
];

export default function SupportPage() {
    return (
        <AppShell>
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
                        Help & Support
                    </h1>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Find answers to common questions or get in touch with our team.
                    </p>
                </div>
                
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Contact Us</CardTitle>
                        <CardDescription>
                            Still have questions? Fill out the form below and we'll get back to you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" placeholder="e.g., Issue with deployment" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description / Issue</Label>
                                <Textarea id="description" placeholder="Please describe your issue in detail." />
                            </div>
                            <Button type="submit">Submit Request</Button>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </AppShell>
    );
}
