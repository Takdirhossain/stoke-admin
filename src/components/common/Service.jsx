import React from 'react'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle  } from '../ui/card'
import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Truck, Users, CheckCircle, Clock, MapPin, Shield } from 'lucide-react'

export default function Service() {
  return (
    <section id="services" className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <Badge className="mb-4">Our Services</Badge>
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Complete Gas Solutions</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          From delivery to accessories, we provide comprehensive LPG services with expert support.
        </p>
      </div>

      <Tabs defaultValue="delivery" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="delivery">Home Delivery</TabsTrigger>
          <TabsTrigger value="support">Expert Support</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>

        <TabsContent value="delivery" className="mt-8">
          <Card>
            <CardHeader className="text-center">
              <Truck className="w-16 h-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Fast & Reliable Delivery</CardTitle>
              <CardDescription>Get your LPG cylinders delivered safely to your doorstep</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Same Day Delivery</h4>
                <p className="text-sm text-muted-foreground">Order before 2 PM for same day delivery</p>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Wide Coverage</h4>
                <p className="text-sm text-muted-foreground">Serving 50+ locations across the city</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Safe Handling</h4>
                <p className="text-sm text-muted-foreground">Trained professionals ensure safe delivery</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="mt-8">
          <Card>
            <CardHeader className="text-center">
              <Users className="w-16 h-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Expert Team Support</CardTitle>
              <CardDescription>Professional guidance for all your LPG needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold">Safety Consultation</h4>
                  <p className="text-muted-foreground">Expert advice on safe LPG usage and storage</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold">Installation Support</h4>
                  <p className="text-muted-foreground">Professional installation of gas connections</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold">9AM-9PM/7 Customer Care</h4>
                  <p className="text-muted-foreground">Round-the-clock support for emergencies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessories" className="mt-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Gas Accessories & Equipment</CardTitle>
              <CardDescription>Complete range of gas stoves and safety equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Gas Stoves", price: "From ₹2,500", image: "gas stove modern kitchen appliance" },
                  { name: "Regulators", price: "From ₹350", image: "LPG gas regulator safety equipment" },
                  { name: "Gas Pipes", price: "From ₹150", image: "flexible gas pipe connection" },
                  { name: "Safety Equipment", price: "From ₹200", image: "gas leak detector safety device" },
                ].map((accessory) => (
                  <div
                    key={accessory.name}
                    className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <img
                      src={`/abstract-geometric-shapes.png?height=120&width=120&query=${accessory.image}`}
                      alt={accessory.name}
                      className="w-20 h-20 mx-auto mb-3 object-contain"
                    />
                    <h4 className="font-semibold mb-1">{accessory.name}</h4>
                    <p className="text-primary font-medium">{accessory.price}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </section>
  )
}
