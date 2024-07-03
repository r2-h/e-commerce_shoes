import { unstable_noStore as noStore } from "next/cache"
import { DashboardStats } from "./_components/DashboardStats"
import { RecentSales } from "./_components/RecentSales"
import { Transactions } from "./_components/Transactions"

export default async function DashboardPage() {
  noStore()

  return (
    <>
      <DashboardStats />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Transactions />
        <RecentSales />
      </div>
    </>
  )
}
