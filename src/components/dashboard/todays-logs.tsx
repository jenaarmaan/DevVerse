import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, GitCommit, UserPlus, UploadCloud } from "lucide-react";

const logs = [
  {
    icon: <UploadCloud className="w-4 h-4 text-green-500" />,
    action: "Deployment successful for",
    target: "DevVerse Hub Frontend",
    time: "10:45 AM",
  },
  {
    icon: <GitCommit className="w-4 h-4 text-blue-500" />,
    action: "New commit pushed to",
    target: "AI Idea Generator API",
    time: "9:30 AM",
  },
  {
    icon: <UserPlus className="w-4 h-4 text-purple-500" />,
    action: "Alice Johnson joined project",
    target: "CollabBoard Backend",
    time: "8:15 AM",
  },
    {
    icon: <UploadCloud className="w-4 h-4 text-red-500" />,
    action: "Deployment failed for",
    target: "Authentication Service",
    time: "Yesterday",
  },
];

export function TodaysLogs() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <History className="w-5 h-5 text-primary" />
          <span>Today's Logs</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {logs.map((log, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="bg-muted p-2 rounded-full mt-1">{log.icon}</div>
              <div className="flex-grow">
                <p className="text-sm">
                  {log.action} <span className="font-semibold">{log.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{log.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
