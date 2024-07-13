import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

export default async function BagPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    redirect("/")
  }

  return <div>baggggggggggg</div>
}
