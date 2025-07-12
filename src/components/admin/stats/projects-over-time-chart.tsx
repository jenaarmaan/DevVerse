"use client"

import { Line, LineChart, CartesianGrid, XAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-07-01", projects: 21 },
  { date: "2024-07-02", projects: 25 },
  { date: "2024-07-03", projects: 32 },
  { date: "2024-07-04", projects: 45 },
  { date: "2024-07-05", projects: 51 },
  { date: "2024-07-06", projects: 60 },
  { date: "2024-07-07", projects: 73 },
  { date: "2024-07-08", projects: 82 },
]

const chartConfig = {
  projects: {
    label: "Projects",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ProjectsOverTimeChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Line
          dataKey="projects"
          type="monotone"
          stroke="var(--color-projects)"
          strokeWidth={2}
          dot={true}
        />
      </LineChart>
    </ChartContainer>
  )
}
