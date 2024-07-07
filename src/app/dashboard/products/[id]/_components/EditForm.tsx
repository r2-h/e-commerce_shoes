"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, XIcon } from "lucide-react"
import Link from "next/link"
import { CATEGORIES, STATUSES } from "@/lib/constants"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"
import { editProduct } from "@/app/actions"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { useState } from "react"
import { useFormState } from "react-dom"
import { SubmitButton } from "@/components/SubmitButtons"
import { UploadDropzone } from "@/lib/uploadthings"
import { productSchema } from "@/lib/zodSchema"
import { type $Enums } from "@prisma/client"

interface Props {
  data: {
    id: string
    name: string
    description: string
    status: $Enums.ProductStatus
    price: number
    images: string[]
    category: $Enums.Category
    isFeatured: boolean
  }
}

export function EditForm({ data }: Props) {
  const [images, setImages] = useState<string[]>(data.images)
  const [lastResult, action] = useFormState(editProduct, undefined)
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema })
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  })

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <input type="hidden" name="productId" value={data.id} /> {/* передать в action id по которому будем изменять продукт*/}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Edit Product</h1>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>In this form you can update your product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={data.name}
                className="w-full"
                placeholder="Product Name"
              />

              <p className="text-red-500">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={data.description}
                placeholder="Write your description right here..."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <Input
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={data.price}
                type="number"
                placeholder="$55"
              />
              <p className="text-red-500">{fields.price.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Featured Product</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultChecked={data.isFeatured}
              />
              <p className="text-red-500">{fields.isFeatured.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select key={fields.status.key} name={fields.status.name} defaultValue={data.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((status) => (
                    <SelectItem value={status.name} key={status.id}>
                      {status.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select key={fields.category.key} name={fields.category.name} defaultValue={data.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.category.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as any}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image
                        height={100}
                        width={100}
                        src={image}
                        alt="Product Image"
                        className="w-full h-full object-cover rounded-lg border"
                      />

                      <button
                        onClick={() => handleDelete(index)}
                        type="button"
                        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url))
                  }}
                  onUploadError={() => {
                    alert("Something went wrong")
                  }}
                />
              )}
              <p className="text-red-500">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Edit Product" />
        </CardFooter>
      </Card>
    </form>
  )
}
