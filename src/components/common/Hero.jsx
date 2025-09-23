import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { CheckCircle, Phone, Shield, Star, Truck } from 'lucide-react'
import heroImage from '@/assets/home/image-1.jpg'
export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-20">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Badge className="bg-primary/10 text-primary border-primary/20">Trusted Since 2017</Badge>
          <h1 className="text-4xl lg:text-6xl font-black text-foreground leading-tight">
            Premium LPG Cylinders with
            <span className="text-primary"> Fast Home Delivery</span>
            <span className="text-primary"> With Retail Price</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Get reliable, safe LPG cylinders delivered to your doorstep. Expert support, competitive prices, and
            guaranteed quality for all your cooking needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
              <Truck className="w-5 h-5 mr-2" />
              Order Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              <Phone className="w-5 h-5 mr-2" />
              <a href="tel:01792429367">Get Quote</a>
            </Button>
          </div>
          <div className="flex items-center space-x-6 pt-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Same Day Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Safety Certified</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroImage}
            alt="LPG Cylinders and Delivery Service"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-card border rounded-lg p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">4.9/5 Rating</p>
                <p className="text-sm text-muted-foreground">2000+ Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
