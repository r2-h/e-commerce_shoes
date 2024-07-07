import prisma from "@/lib/db"
import { EditForm } from "./_components/EditForm"
import { notFound } from "next/navigation"

const getProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  })
  if (!product) {
    return notFound()
  }
  return product
}

export default async function EditProduct({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  return <EditForm data={product} />
}
