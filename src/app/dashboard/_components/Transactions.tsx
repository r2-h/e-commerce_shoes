import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { unstable_noStore as noStore } from "next/cache"
import { Chart } from "./Chart"
import prisma from "@/lib/db"

async function getData() {
  const now = new Date()
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(now.getDate() - 7)

  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  })

  const result = data.map((item) => ({
    date: new Intl.DateTimeFormat("ru").format(item.createdAt),
    revenue: item.amount / 100,
  }))

  return result
}

export const Transactions = async () => {
  noStore()
  const data = await getData()

  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>Recent transactions from the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart data={data} />
      </CardContent>
    </Card>
  )
}
