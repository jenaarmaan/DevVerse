
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, PieChart, Pie, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, XCircle } from "lucide-react";

const totalDeploymentsData = [
  { name: 'Jan', deployments: 30 }, { name: 'Feb', deployments: 45 }, { name: 'Mar', deployments: 60 },
  { name: 'Apr', deployments: 50 }, { name: 'May', deployments: 70 }, { name: 'Jun', deployments: 90 },
];

const successRateData = [
  { name: 'Success', value: 325, fill: 'hsl(var(--success))' },
  { name: 'Failed', value: 20, fill: 'hsl(var(--destructive))' },
];

const activeProjectsData = [
    { name: 'DevVerse FE', deployments: 45 },
    { name: 'CollabBoard BE', deployments: 30 },
    { name: 'Auth Service', deployments: 15 },
    { name: 'Idea Gen API', deployments: 10 },
];


export default function InsightsPage() {
    const totalSuccess = successRateData.find(d => d.name === 'Success')?.value || 0;
    const totalFailed = successRateData.find(d => d.name === 'Failed')?.value || 0;
    const total = totalSuccess + totalFailed;
    const successPercentage = total > 0 ? ((totalSuccess / total) * 100).toFixed(1) : 0;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Deployment Insights</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Total Deployments</CardTitle>
                        <CardDescription>All-time count of project deployments.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{total}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Success Rate</CardTitle>
                        <CardDescription>Percentage of successful deployments.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-success">{successPercentage}%</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Most Active Project</CardTitle>
                        <CardDescription>The project with the most deployments.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-primary">DevVerse FE</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Activity</CardTitle>
                        <CardDescription>Deployment trends over the past few months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={totalDeploymentsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="deployments" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Deployments by Project</CardTitle>
                        <CardDescription>Breakdown of deployments for each project.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={activeProjectsData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={100} />
                                <Tooltip />
                                <Bar dataKey="deployments" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
