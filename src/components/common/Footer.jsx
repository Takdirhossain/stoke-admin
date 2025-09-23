import React from 'react'
import { Button } from '../ui/button'
import { Phone } from 'lucide-react'
import { Separator } from '../ui/separator'

export default function Footer() {
  return (
    <footer className="bg-card border-t py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-bold">GasFlow</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Your trusted partner for premium LPG cylinders and home delivery services.
          </p>
          <div className="flex space-x-4">
            <Button size="sm" variant="outline">
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Products</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                12kg Cylinders
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                25kg Cylinders
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                35kg Cylinders
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                45kg Cylinders
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                Home Delivery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                Expert Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                Installation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                Accessories
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>📞 +91 98765 43210</li>
            <li>📧 info@gasflow.com</li>
            <li>📍 123 Gas Street, City</li>
            <li>🕒 Mon-Sat: 8AM-8PM</li>
          </ul>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-muted-foreground text-sm">© 2024 GasFlow. All rights reserved.</p>
        <div className="flex space-x-4 text-sm text-muted-foreground mt-4 md:mt-0">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Safety Guidelines
          </a>
        </div>
      </div>
    </div>
  </footer>
  )
}
