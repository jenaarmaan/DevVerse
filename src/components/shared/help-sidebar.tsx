"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, Github, Mail, BookUser } from "lucide-react"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

const faqs = [
  {
    question: "What is DevVerse Hub?",
    answer: "DevVerse Hub is an all-in-one platform for developers to discover project templates, collaborate with others, and learn new skills. It integrates powerful AI tools to accelerate your development workflow."
  },
  {
    question: "How does the AI Idea Generator work?",
    answer: "The AI Idea Generator uses a powerful language model to brainstorm project ideas based on the categories and tags you provide. Just enter your interests, and let the AI inspire you!"
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take security seriously. Authentication is handled by Firebase, and we follow best practices to protect your information. The SecuLearn AI module is also available to help you learn about security."
  }
];

function HelpPanelContent() {
    return (
        <>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq">
                <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
                <AccordionContent>
                    <ul className="space-y-4 text-sm text-muted-foreground">
                        {faqs.map((faq, index) => (
                            <li key={index}>
                                <p className="font-semibold text-card-foreground">{faq.question}</p>
                                <p>{faq.answer}</p>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="user-guide">
                <AccordionTrigger>User Guide</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-muted-foreground">
                     <p>Our comprehensive user guide is currently under development. Please check back soon for detailed instructions on how to use all the features of DevVerse Hub.</p>
                      <Button variant="outline" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <BookUser className="mr-2" />
                          Read Documentation (Coming Soon)
                        </a>
                      </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-auto pt-6 space-y-4">
                <h3 className="text-lg font-semibold">Contact Us</h3>
                <div className="flex flex-col space-y-2">
                     <Button variant="outline" asChild>
                        <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                           <Github className="mr-2" />
                           View on GitHub
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <a href="mailto:feedback@devverse.com">
                            <Mail className="mr-2" />
                            Send Feedback
                        </a>
                    </Button>
                </div>
            </div>
        </>
    )
}

export function HelpSidebar() {
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const isMobile = useIsMobile();
    
    if (!isClient) {
        return null;
    }

    if (isMobile) {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                    variant="secondary"
                    size="icon"
                    className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl"
                    aria-label="Open help panel"
                    >
                    <HelpCircle className="h-7 w-7" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md">
                    <SheetHeader className="mb-6 text-left">
                    <SheetTitle>Help & Support</SheetTitle>
                    <SheetDescription>
                        Find answers to your questions and get support.
                    </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col h-full">
                        <HelpPanelContent />
                    </div>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <aside className="hidden w-72 flex-col border-l bg-background p-4 lg:flex shrink-0">
            <div className="sticky top-4">
                <div className="mb-6 text-left">
                    <h2 className="text-lg font-semibold text-foreground">Help & Support</h2>
                    <p className="text-sm text-muted-foreground">Find answers to your questions.</p>
                </div>
                <div className="flex flex-col">
                    <HelpPanelContent />
                </div>
            </div>
        </aside>
    )
}
