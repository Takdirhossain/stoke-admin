import React from 'react'
import { Badge } from '../ui/badge'
import { Card, CardContent,CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import twelbkg from '@/assets/home/12 KG LPG CYLINDER.png'
import twentfivekg from '@/assets/home/25 KG LPG  CYLINDER.png'
import thirtyfivekg from '@/assets/home/35 KG LPG  CYLINDER.png'
import fourtyfivekg from '@/assets/home/45 KG LPG  CYLINDER.png'
export default function Product() {
  return (
       
        <section id="products" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Products</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">LPG Cylinders for Every Need</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our range of certified LPG cylinders. Available for both wholesale and retail customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { size: "12kg", price: "1500TK", description: "Perfect for small families", popular: false, image: twelbkg },
              { size: "25kg", price: "2850TK", description: "Most popular choice", popular: false, image: twentfivekg },
              { size: "35kg", price: "2700TK", description: "Great for large families", popular: true, image: thirtyfivekg },
              { size: "45kg", price: "5000TK", description: "Commercial use", popular: false, image: fourtyfivekg },
            ].map((cylinder) => (
              <Card key={cylinder.size} className="relative hover:shadow-lg transition-shadow">
                {cylinder.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
                )}
                <CardHeader className="text-center">
                  <img
                    src={cylinder?.image}
                    alt={`${cylinder.size} LPG Cylinder`}
                    className="w-32 h-32 mx-auto mb-4 object-contain"
                  />
                  <CardTitle className="text-2xl font-bold">{cylinder.size}</CardTitle>
                  <CardDescription>{cylinder.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{cylinder.price}</div>
                  <p className="text-sm text-muted-foreground">+ Delivery charges</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={cylinder.popular ? "default" : "outline"}>
                  <a href="tel:01792429367">Order Now</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
  )
}
