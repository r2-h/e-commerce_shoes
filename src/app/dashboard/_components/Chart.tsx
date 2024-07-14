"use client"
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts"

type Data = {
  date: string
  revenue: number
}
type Props = {
  data: Data[]
}

const aggregateData = (data: Data[]) => {
  const aggregated = data.reduce((acc: Record<string, number>, curr: Data) => {
    if (acc[curr.date]) {
      acc[curr.date] += curr.revenue
    } else {
      acc[curr.date] = curr.revenue
    }
    return acc
  }, {})

  return Object.keys(aggregated).map((date) => ({
    date,
    revenue: aggregated[date],
  }))
}

export function Chart({ data }: Props) {
  const proccesedData = aggregateData(data)
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={proccesedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" stroke="#3b82f6" activeDot={{ r: 8 }} dataKey="revenue" />
      </LineChart>
    </ResponsiveContainer>
  )
}
