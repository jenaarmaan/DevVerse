
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CodeSquare, Github, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { GoogleIcon } from "@/components/icons/google";
import { signInWithGoogle, signInWithGithub, signInWithEmail, signUpWithEmail } from "@/lib/firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const passwordChecks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isPasswordStrong = Object.values(passwordChecks).every(Boolean);

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    const signInMethod = provider === 'google' ? signInWithGoogle : signInWithGithub;
    const { user, error } = await signInMethod();
    if (user) {
      toast({ title: "Success!", description: "Logged in successfully." });
      router.push('/');
    } else {
      console.error(error);
      toast({ variant: 'destructive', title: "Error", description: "Failed to log in with the selected provider." });
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const authMethod = isSignUp ? signUpWithEmail : signInWithEmail;
    const { user, error } = await authMethod(email, password);

    if (user) {
      toast({ title: "Success!", description: isSignUp ? "Signed up successfully!" : "Logged in successfully." });
      router.push('/');
    } else {
      console.error(error);
      let description = "An unexpected error occurred. Please try again.";
      const errorCode = (error as any)?.code;

      switch (errorCode) {
        case 'auth/invalid-credential':
          description = "Invalid email or password. Please check your credentials and try again.";
          break;
        case 'auth/weak-password':
          description = "Your password is too weak. It should be at least 6 characters long.";
          break;
        case 'auth/email-already-in-use':
          description = "This email is already registered. Please sign in or use a different email address.";
          break;
        case 'auth/user-not-found':
          description = "No account found with this email. Please sign up instead.";
          break;
        case 'auth/wrong-password':
          description = "Incorrect password. Please try again.";
          break;
      }

      toast({ variant: 'destructive', title: "Authentication Failed", description });
    }
  };
  
  const PasswordRequirement = ({ label, met }: { label: string; met: boolean }) => (
    <div className={cn("flex items-center gap-2 text-muted-foreground", { "text-success": met, "text-destructive": !met })}>
        {met ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
        <span>{label}</span>
    </div>
  );

  return (
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <Link href="/" className="flex justify-center items-center gap-2 mb-4">
             <CodeSquare className="w-10 h-10 text-primary" />
             <h1 className="text-3xl font-bold font-headline">DevVerse Hub</h1>
          </Link>
          <CardTitle className="text-2xl">{isSignUp ? 'Create an Account' : 'Welcome Back!'}</CardTitle>
          <CardDescription>{isSignUp ? 'Join the DevVerse today.' : 'Sign in to continue your journey in the DevVerse.'}</CardDescription>
        </CardHeader>
        <form onSubmit={handleEmailAuth}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" type="button" onClick={() => handleSocialLogin('google')}>
                <GoogleIcon className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" type="button" onClick={() => handleSocialLogin('github')}>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
               <div className="relative">
                <Input 
                    id="password" 
                    type={showPassword ? 'text' : 'password'} 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="••••••••"
                />
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute inset-y-0 right-0 h-full w-10 text-muted-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {isSignUp && password.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs mt-2 p-3 bg-muted rounded-md">
                    <PasswordRequirement label="At least 8 characters" met={passwordChecks.length} />
                    <PasswordRequirement label="One lowercase letter" met={passwordChecks.lowercase} />
                    <PasswordRequirement label="One uppercase letter" met={passwordChecks.uppercase} />
                    <PasswordRequirement label="One number" met={passwordChecks.number} />
                    <PasswordRequirement label="One special character" met={passwordChecks.special} />
                </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full font-semibold" disabled={isSignUp && !isPasswordStrong}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="font-medium text-primary hover:underline">
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
  );
}
