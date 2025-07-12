
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, Shield, Wand2, Loader2, Info } from "lucide-react";
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

type Severity = "Critical" | "High" | "Medium" | "Low";

const mockReport = {
    vulnerabilities: [
        { id: "VULN-001", description: "Exposed API key in `src/config.js`.", severity: "Critical" as Severity, file: "src/config.js", line: 12 },
        { id: "VULN-002", description: "Outdated dependency 'react-scripts' (v4.0.3) with known vulnerabilities.", severity: "High" as Severity, file: "package.json", line: 25 },
        { id: "VULN-003", description: "Use of `dangerouslySetInnerHTML` without proper sanitization.", severity: "Medium" as Severity, file: "src/components/content.jsx", line: 45 },
    ],
    recommendations: [
        "Move API keys to environment variables and access them via `process.env`.",
        "Run `npm audit fix` or `npm update react-scripts` to patch the vulnerability.",
        "Use a library like `dompurify` to sanitize HTML before rendering.",
    ],
};

const severityVariantMap: Record<Severity, "destructive" | "default" | "secondary"> = {
    Critical: "destructive",
    High: "destructive",
    Medium: "default",
    Low: "secondary",
};
const severityClassMap: Record<Severity, string> = {
    Critical: "text-red-600 dark:text-red-500",
    High: "text-orange-500 dark:text-orange-400",
    Medium: "text-yellow-500 dark:text-yellow-400",
    Low: "text-blue-500 dark:text-blue-400",
};


export default function SecurityPage() {
    const [selectedProject, setSelectedProject] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [report, setReport] = useState<typeof mockReport | null>(null);
    const { toast } = useToast();

    const handleScan = () => {
        if (!selectedProject) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a project to scan.' });
            return;
        }
        setIsLoading(true);
        setReport(null);
        setTimeout(() => {
            setReport(mockReport);
            setIsLoading(false);
            toast({ title: 'Scan Complete', description: 'Security vulnerabilities found.' });
        }, 3000);
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Security Center</h1>
            <Card>
                <CardHeader>
                    <CardTitle>AI-Powered Security Scan</CardTitle>
                    <CardDescription>Select a project and let Gemini analyze your codebase for potential vulnerabilities.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-center gap-4">
                    <Select onValueChange={setSelectedProject}>
                        <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select a project..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="devverse-hub-frontend">devverse-hub-frontend</SelectItem>
                            <SelectItem value="collabboard-backend">collabboard-backend</SelectItem>
                            <SelectItem value="authentication-service">authentication-service</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleScan} disabled={isLoading || !selectedProject} className="w-full sm:w-auto">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Shield className="mr-2 h-4 w-4" />}
                        Scan Project
                    </Button>
                </CardContent>
            </Card>

            {isLoading && (
                <div className="text-center p-8 space-y-4">
                    <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
                    <p className="text-muted-foreground">Gemini is scanning your code... this may take a moment.</p>
                </div>
            )}
            
            {report ? (
                <div className="space-y-6">
                    <Card className="border-destructive/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="text-destructive"/>
                                Vulnerabilities Found ({report.vulnerabilities.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {report.vulnerabilities.map(vuln => (
                                <div key={vuln.id} className="p-4 border rounded-md">
                                    <div className="flex justify-between items-start">
                                        <p className="font-semibold">{vuln.description}</p>
                                        <Badge variant={severityVariantMap[vuln.severity]} className={severityClassMap[vuln.severity]}>{vuln.severity}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground font-mono mt-1">{vuln.file}:{vuln.line}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Wand2 className="text-primary"/>
                                Gemini's Recommendations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                           <ul className="list-disc list-inside space-y-2">
                                {report.recommendations.map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                           </ul>
                           <div className="pt-4">
                               <Button><Wand2 className="mr-2 h-4 w-4" />Suggest Auto-Fix</Button>
                           </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                !isLoading && (
                     <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Ready to Scan</AlertTitle>
                        <AlertDescription>
                          Select a project and click "Scan Project" to check for security issues.
                        </AlertDescription>
                    </Alert>
                )
            )}
        </div>
    );
}
