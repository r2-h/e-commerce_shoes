"use client"
import { createProduct } from "@/app/actions"
import { SubmitButton } from "@/components/SubmitButtons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { categories } from "@/lib/categories"
import { UploadDropzone } from "@/lib/uploadthings"
import { productSchema } from "@/lib/zodSchema"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { ChevronLeft, XIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useFormState } from "react-dom"

export default function ProductCreatePage() {
  const [lastResult, action] = useFormState(createProduct, undefined)
  const [images, setImages] = useState<string[]>([])
  const [images2, setImages2] = useState<any[]>([])

  const { toast } = useToast()

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
  const handleDelete2 = (index: number) => {
    setImages2(images.filter((_, i) => i !== index))
  }

  return (
    <form id={form.id} action={action} onSubmit={form.onSubmit}>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>In this form you can create your product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                className="w-full"
                placeholder="Product Name"
                key={fields.name.name}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                placeholder="Write your description right here..."
                key={fields.description.name}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="$55"
                key={fields.price.name}
                name={fields.price.name}
                defaultValue={fields.price.initialValue}
              />
              <p className="text-red-500">{fields.price.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Featured Product</Label>
              <Switch
                key={fields.isFeatured.name}
                name={fields.isFeatured.name}
                defaultValue={fields.isFeatured.initialValue}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={fields.status.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={fields.category.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
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
                    toast({
                      title: "Error",
                      description: "Something went wrong",
                      variant: "destructive",
                    })
                  }}
                />
              )}
              <p className="text-red-500">{fields.images.errors}</p>
            </div>

            {/* <div className="flex flex-col gap-3">
              <Label>Images2</Label>
              <input
                type="hidden"
                value={images2}
                key={fields.images2.key}
                name={fields.images2.name}
                defaultValue={fields.images2.initialValue as any}
              />
              {images2.length > 0 ? (
                <div className="flex gap-5">
                  {images2.map((image2, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image
                        height={100}
                        width={100}
                        src={image2}
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
                <UploadField images2={images2} setImages2={setImages2} handleDelete2={handleDelete2} />
              )}
              <p className="text-red-500">{fields.images2.errors}</p>
            </div> */}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Product" />
        </CardFooter>
      </Card>
    </form>
  )
}
