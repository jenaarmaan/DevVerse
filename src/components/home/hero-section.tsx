"use client";

import { Button } from '@/components/ui/button';
import { CodeSquare } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
    return (
        <div className="w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-top-12 duration-1000">
            <div className="relative isolate overflow-hidden bg-primary shadow-2xl rounded-3xl">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-12 sm:p-16 md:p-20">
                    <div className="text-center md:text-left space-y-6 text-primary-foreground">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline">
                            Welcome to DevVerse
                        </h1>
                        <p className="text-lg md:text-xl text-primary-foreground/80">
                           The Developer's Universe to Build Together, Learn Forever
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <Button asChild size="lg" variant="secondary" className="font-semibold">
                                <Link href="/hackstack">Start Exploring</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center p-4">
                        <div className="w-80 h-80 rounded-full bg-primary-foreground/20 flex items-center justify-center shadow-2xl group transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                            <CodeSquare className="w-48 h-48 text-white transition-transform duration-300 ease-in-out group-hover:scale-110" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
