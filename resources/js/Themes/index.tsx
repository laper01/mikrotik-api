
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Wifi
} from "lucide-react"

import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Input } from "@/Components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import { Link } from "react-router-dom"
import React from "react"
import Header from "./Header"
import Nav from "./Nav"

interface MyComponentProps {
    children?: React.ReactNode;
    title:  string;
}

export default function Theme({children, title}:MyComponentProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Wifi className="h-6 w-6" />
              <span className="">WIFI UMMAT</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              {/* <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span> */}
            </Button>
          </div>
          <div className="flex-1">
            <Nav/>
          </div>
          <div className="mt-auto p-4">
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Header/>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
          </div>
            {children}
        </main>
      </div>
    </div>
  )
}
