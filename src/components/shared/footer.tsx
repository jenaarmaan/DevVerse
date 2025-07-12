import { cn } from "@/lib/utils";
import { Flame, Sparkles, Github, Cloud } from "lucide-react";

export function Footer({ className }: { className?: string }) {
    return (
        <footer className={cn("bg-background border-t", className)}>
            <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row items-center">
                <p className="text-muted-foreground text-sm text-center sm:text-left">
                    Built with ❤️ by DevVerse Team
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start items-center gap-4">
                    <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-googleRed transition-colors">
                        <Flame className="w-5 h-5" />
                        <span className="sr-only">Firebase</span>
                    </a>
                    <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-googleBlue transition-colors">
                        <Sparkles className="w-5 h-5" />
                        <span className="sr-only">Gemini</span>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="w-5 h-5" />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a href="https://cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-googleGreen transition-colors">
                        <Cloud className="w-5 h-5" />
                        <span className="sr-only">Google Cloud</span>
                    </a>
                </span>
            </div>
        </footer>
    );
}
