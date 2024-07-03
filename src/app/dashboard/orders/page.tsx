import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { unstable_noStore as noStore } from "next/cache"

export default async function OrdersPage() {
  noStore()

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
            <TableRow>
              <TableCell className="pl-0 sm:pl-4">
                <p className="font-medium">User</p>
                <p className="hidden md:flex text-sm text-muted-foreground">sesf@.com</p>
              </TableCell>
              <TableCell className="pl-0 sm:pl-4">Order</TableCell>
              <TableCell className="pl-0 sm:pl-4">Status</TableCell>
              <TableCell className="pl-0 sm:pl-4">2033</TableCell>
              <TableCell className="text-right pl-0 sm:pl-4">
                ${new Intl.NumberFormat("en-US").format(2324 / 100)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
