"use client"

import { Pie, PieChart, Tooltip } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { role: "student", count: 275, fill: "var(--color-student)" },
  { role: "mentor", count: 120, fill: "var(--color-mentor)" },
  { role: "organizer", count: 55, fill: "var(--color-organizer)" },
]

const chartConfig = {
  count: {
    label: "Count",
  },
  student: {
    label: "Student",
    color: "hsl(var(--chart-1))",
  },
  mentor: {
    label: "Mentor",
    color: "hsl(var(--chart-2))",
  },
  organizer: {
    label: "Organizer",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function UserRolesChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart accessibilityLayer>
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="role"
          innerRadius={60}
          strokeWidth={5}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="role" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
