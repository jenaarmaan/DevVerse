import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, CircleCheck, CircleAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const services = [
  { name: "Firebase Auth", status: "Operational" },
  { name: "Cloud Firestore", status: "Operational" },
  { name: "GitHub Webhooks", status: "Operational" },
  { name: "Genkit API", status: "Degraded Performance" },
];

export function StatusMonitor() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span>Status Monitor</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {services.map((service) => (
            <li key={service.name} className="flex items-center justify-between text-sm">
              <span>{service.name}</span>
              <div className="flex items-center gap-2">
                {service.status === "Operational" ? (
                  <CircleCheck className="w-4 h-4 text-green-500" />
                ) : (
                  <CircleAlert className="w-4 h-4 text-yellow-500" />
                )}
                <span className={service.status === 'Operational' ? 'text-green-600' : 'text-yellow-600'}>
                  {service.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <Button variant="outline" size="sm" asChild className="mt-4 w-full">
            <Link href="#">View Status Page</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
