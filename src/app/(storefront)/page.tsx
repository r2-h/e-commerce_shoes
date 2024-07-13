import { CategoriesSelection } from "./_components/CategoriesSection"
import { FeaturedProducts } from "./_components/FeaturedProducts"
import { Hero } from "./_components/Hero"

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSelection />
      <FeaturedProducts />
    </>
  )
}
