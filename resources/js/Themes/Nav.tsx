import {
    Bell,
    CircleUser,
    FileUp,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    UserPen,
    Users,
  } from "lucide-react"

  import { Badge } from "@/Components/ui/badge"
  import {NavLink } from "react-router-dom"


export default function Nav(){
    return(
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <NavLink
          to="/ubah-password"
        //   className="
          className={({ isActive }) => isActive ?
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-primary hover:text-primary"
          :
           "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"}
        >
          <UserPen className="h-4 w-4" />
          Ubah Password
        </NavLink>

        <NavLink
          to="/export-user"
          className={({ isActive }) => isActive ?
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-primary hover:text-primary"
          :
           "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"}
        >
          <FileUp className="h-4 w-4" />
          Export user
        </NavLink>


      </nav>
    );
}
