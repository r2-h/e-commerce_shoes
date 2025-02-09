import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import prisma from "@/lib/db"
import { unstable_noStore as noStore } from "next/cache"

const getOrders = async () => {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
      User: {
        select: {
          firstName: true,
          email: true,
          profileImage: true,
        },
      },
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return data
}

export default async function OrdersPage() {
  noStore()
  const orders = await getOrders()

  return (
    <Card className="border-0 sm:border  ">
      <CardHeader className="p-0 sm:p-6 sm:px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store!</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:px-6 ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-0 sm:pl-4">Customer</TableHead>
              <TableHead className="pl-0 sm:pl-4">Type</TableHead>
              <TableHead className="pl-0 sm:pl-4">Status</TableHead>
              <TableHead className="pl-0 sm:pl-4">Date</TableHead>
              <TableHead className="text-right pl-0 sm:pl-4">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell className="pl-0 sm:pl-4">
                    <p className="font-medium">{order.User?.firstName}</p>
                    <p className="hidden md:flex text-sm text-muted-foreground">{order.User?.email}</p>
                  </TableCell>
                  <TableCell className="pl-0 sm:pl-4">Order</TableCell>
                  <TableCell className="pl-0 sm:pl-4">{order.status}</TableCell>
                  <TableCell className="pl-0 sm:pl-4">
                    {new Intl.DateTimeFormat("ru").format(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-right pl-0 sm:pl-4">
                    ${new Intl.NumberFormat("en-US").format(order.amount / 100)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
