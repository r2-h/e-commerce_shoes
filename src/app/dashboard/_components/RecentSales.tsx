import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function RecentSales() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Avatar className="hidden sm:flex h-9 w-9">
            <AvatarImage src={user?.picture || ""} alt="Avatar Image" />
            <AvatarFallback>{user?.family_name?.slice(0, 3)}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium">{user?.family_name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <p className="ml-auto font-medium">+${new Intl.NumberFormat("en-US").format(2300 / 100)}</p>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden sm:flex h-9 w-9">
            <AvatarImage src={user?.picture || ""} alt="Avatar Image" />
            <AvatarFallback>{user?.family_name?.slice(0, 3)}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium">{user?.family_name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <p className="ml-auto font-medium">+${new Intl.NumberFormat("en-US").format(2300 / 100)}</p>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden sm:flex h-9 w-9">
            <AvatarImage src={user?.picture || ""} alt="Avatar Image" />
            <AvatarFallback>{user?.family_name?.slice(0, 3)}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium">{user?.family_name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <p className="ml-auto font-medium">+${new Intl.NumberFormat("en-US").format(2300 / 100)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
