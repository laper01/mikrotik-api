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
  import { Link, NavLink } from "react-router-dom"
import Nav from "./Nav"

import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from "react"

export default function Header(){

    const [isLoading , SetIsLoading] = useState(false);
    const { user, getToken, logout } = useAuth();
    const token = getToken();
    const navigate = useNavigate();

    async function name() {
        console.log(token);
        SetIsLoading(true);
        try{
            const response = await axios.post(
                'api/logout',
                {},
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            logout();
            navigate('/');
        }catch(error){
            console.log(error);

        }finally{
            SetIsLoading(false)
        }
    }

    return(
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <Wifi className="h-6 w-6" />
          <span className="">WIFI UMMAT</span>
            </NavLink>
            <Nav/>
            <div className="mt-auto">
            </div>
          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
            </div>
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={name} >Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    );
}
