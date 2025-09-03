"use client"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { getMoodColor } from "@/app/utils/statistics"

export default function MoodPieChart({ data }: { data: {name: string, value: number}[] }) {
  const colors = data.map(item => getMoodColor(item.name))

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { total: number } }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900 capitalize">{data.name}</p>
          <p className="text-sm text-gray-600">
            {data.value} times ({((data.value / data.payload.total) * 100).toFixed(1)}%)
          </p>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }: { payload?: Array<{ value: string; color: string }> }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm text-gray-600 capitalize">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }

  // Add total to each data point for tooltip calculation
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const dataWithTotal = data.map(item => ({ ...item, total }))

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie 
          data={dataWithTotal} 
          dataKey="value" 
          nameKey="name" 
          cx="50%" 
          cy="45%" 
          outerRadius={100}
          innerRadius={40}
          paddingAngle={2}
        >
          {dataWithTotal.map((entry, index) => (
            <Cell 
              key={index} 
              fill={colors[index]}
              stroke="#f9fafb"
              strokeWidth={3}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  )
}
