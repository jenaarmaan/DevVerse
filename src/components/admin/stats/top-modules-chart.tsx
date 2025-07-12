
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { module: "HackStack", usage: 186, fill: "var(--color-hackstack)" },
  { module: "CollabBoard", usage: 305, fill: "var(--color-collabboard)" },
  { module: "SkillBridge", usage: 237, fill: "var(--color-skillbridge)" },
  { module: "Deployer", usage: 73, fill: "var(--color-deployer)" },
  { module: "Idea Gen", usage: 209, fill: "var(--color-ideagen)" },
  { module: "Campus Hub", usage: 214, fill: "var(--color-campushub)" },
]

const chartConfig = {
  usage: {
    label: "Usage",
  },
  hackstack: {
    label: "HackStack Hub",
    color: "hsl(var(--chart-1))",
  },
  collabboard: {
    label: "CollabBoard",
    color: "hsl(var(--chart-2))",
  },
  skillbridge: {
    label: "SkillBridge",
    color: "hsl(var(--chart-3))",
  },
  deployer: {
    label: "Project Deployer",
    color: "hsl(var(--chart-4))",
  },
  ideagen: {
    label: "Idea Generator",
    color: "hsl(var(--chart-5))",
  },
  campushub: {
    label: "Campus Hub",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function TopModulesChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="module"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="usage" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}
