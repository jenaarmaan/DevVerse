'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sparkles, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';

interface GeminiChatProps {
    isOpen: boolean;
    onClose: () => void;
}

type Message = {
    role: 'user' | 'bot';
    text: string;
};

export function GeminiChat({ isOpen, onClose }: GeminiChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok || !response.body) {
                throw new Error(response.statusText || 'No response body');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let botResponse = '';
            setMessages((prev) => [...prev, { role: 'bot', text: '' }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value, { stream: true });
                botResponse += chunk;

                setMessages((prev) => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage.role === 'bot') {
                        lastMessage.text = botResponse;
                        return [...prev.slice(0, -1), lastMessage];
                    }
                    return prev;
                });
            }
        } catch (error) {
            console.error('Chat failed:', error);
            setMessages((prev) => [
                ...prev,
                { role: 'bot', text: 'Sorry, something went wrong. Please try again.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-8 duration-500">
            <Card className="w-[380px] h-[60vh] flex flex-col shadow-2xl rounded-2xl overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-primary" />
                        <h3 className="text-lg font-semibold">DevVerse Assistant</h3>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close chat">
                        <X className="w-5 h-5" />
                    </Button>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-4">
                            {messages.length === 0 && (
                                <div className="text-center text-muted-foreground p-8">
                                    <Bot className="mx-auto w-12 h-12 mb-4" />
                                    <p>Ask me anything about DevVerse, coding, or project ideas!</p>
                                </div>
                            )}
                            {messages.map((msg, index) => (
                                <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                                    {msg.role === 'bot' && <Avatar className="w-8 h-8"><AvatarFallback><Bot /></AvatarFallback></Avatar>}
                                    <div className={cn("rounded-lg px-3 py-2 max-w-xs", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                    {msg.role === 'user' && <Avatar className="w-8 h-8"><AvatarFallback><User /></AvatarFallback></Avatar>}
                                </div>
                            ))}
                            {isLoading && messages[messages.length - 1]?.role === 'user' && (
                                <div className="flex items-start gap-3 justify-start">
                                    <Avatar className="w-8 h-8"><AvatarFallback><Bot /></AvatarFallback></Avatar>
                                    <div className="rounded-lg px-3 py-2 bg-secondary flex items-center">
                                        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                                    </div>
                                </div>
                            )}
                             <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 border-t">
                    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                        <Input
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                        />
                        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                            <Send className="w-5 h-5" />
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}
