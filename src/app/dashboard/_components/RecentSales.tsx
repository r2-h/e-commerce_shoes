import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

async function getOrders() {
  const order = await prisma.order.findMany({
    select: {
      id: true,
      amount: true,
      User: {
        select: {
          email: true,
          firstName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  })
  return order
}

export async function RecentSales() {
  const orders = await getOrders()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {orders.map((order) => (
          <div className="flex items-center gap-4" key={order.id}>
            <Avatar className="hidden sm:flex h-9 w-9">
              <AvatarImage src={order.User?.profileImage} alt="Avatar Image" />
              <AvatarFallback>{order.User?.firstName.slice(0, 3)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">{order.User?.firstName}</p>
              <p className="text-sm text-muted-foreground">{order.User?.email}</p>
            </div>
            <p className="ml-auto font-medium">
              +${new Intl.NumberFormat("en-US").format(order.amount / 100)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
