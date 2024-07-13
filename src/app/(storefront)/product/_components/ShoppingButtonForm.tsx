"use client"
import { addItem } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, ShoppingBag } from "lucide-react"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"

export const ShoppingButtonForm = ({ id }: { id: string }) => {
  const [state, formAction] = useFormState(addItem.bind(null, id), null)
  const { pending } = useFormStatus()
  const { toast } = useToast()

  useEffect(() => {
    if (state?.message) {
      toast({ title: state.message })
    }
  }, [state])

  return (
    <form action={formAction}>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button size="lg" className="w-full mt-5" type="submit">
          <ShoppingBag className="mr-4 h-5 w-5" /> Add to Cart
        </Button>
      )}
    </form>
  )
}
