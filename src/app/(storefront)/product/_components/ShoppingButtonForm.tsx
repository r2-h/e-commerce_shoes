"use client"
import { addItem } from "@/app/actions"
import { ShoppingBagButton } from "@/components/SubmitButtons"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"
import { useFormState } from "react-dom"

export const ShoppingButtonForm = ({ id }: { id: string }) => {
  const [state, formAction] = useFormState(addItem.bind(null, id), null)
  const { toast } = useToast()

  useEffect(() => {
    if (state?.message) {
      toast({ title: state.message })
    }
  }, [state])

  return (
    <form action={formAction}>
      <ShoppingBagButton />
    </form>
  )
}
