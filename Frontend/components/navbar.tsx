"use client"

import { Shield, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8" />
            <span className="text-xl font-semibold tracking-tight">GovHelpPortal</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
          {/*  <Button variant="secondary" size="sm">
              Sign In
            </Button> */}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/20">
          <div className="px-4 py-4 space-y-3">
            <a href="#features" className="block text-sm font-medium hover:text-secondary transition-colors">
              Features
            </a>
            <a href="#about" className="block text-sm font-medium hover:text-secondary transition-colors">
              About
            </a>
            <a href="#contact" className="block text-sm font-medium hover:text-secondary transition-colors">
              Contact
            </a>
            <Button variant="secondary" size="sm" className="w-full">
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
