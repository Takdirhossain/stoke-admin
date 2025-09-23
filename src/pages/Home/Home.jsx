import Navbar from "@/components/common/Navbar"
import Hero from "@/components/common/Hero"
import Service from "@/components/common/Service"
import Founder from "@/components/common/Founder"
import Team from "@/components/common/Team"
import Footer from "@/components/common/Footer"
import Product from "@/components/common/Product"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
        <Navbar/>
        <Hero/>
        <Product/>
        <Service/>
        <Founder/>
        <Team/>
        <Footer/>
    </div>
  )
}
