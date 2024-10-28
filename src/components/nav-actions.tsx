

// import * as React from "react"
// import { LucideIcon, MoreHorizontal, Star } from 'lucide-react'

// import { Button } from './ui/button'
// import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
// import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'


// const NavActions =({
//     actions,
//   }: {
//     actions: {
//       label: string
//       icon: LucideIcon
//     }[][]
//   }) =>{
//     const [isOpen, setIsOpen] = React.useState(false)
  
//     React.useEffect(() => {
//       setIsOpen(true)
//     }, [])
  
//     return (
//       <div className="flex items-center gap-2 text-sm">
//         <div className="hidden font-medium text-muted-foreground md:inline-block">
//           Edit Oct 08
//         </div>
//         <Button variant="ghost" size="icon" className="h-7 w-7">
//           <Star />
//         </Button>
//         <Popover open={isOpen} onOpenChange={setIsOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-7 w-7 data-[state=open]:bg-accent"
//             >
//               <MoreHorizontal />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent
//             className="w-56 overflow-hidden rounded-lg p-0"
//             align="end"
//           >
//             <Sidebar collapsible="none" className="bg-transparent">
//               <SidebarContent>
//                 {actions.map((group, index) => (
//                   <SidebarGroup key={index} className="border-b last:border-none">
//                     <SidebarGroupContent className="gap-0">
//                       <SidebarMenu>
//                         {group.map((item, index) => (
//                           <SidebarMenuItem key={index}>
//                             <SidebarMenuButton>
//                               <item.icon /> <span>{item.label}</span>
//                             </SidebarMenuButton>
//                           </SidebarMenuItem>
//                         ))}
//                       </SidebarMenu>
//                     </SidebarGroupContent>
//                   </SidebarGroup>
//                 ))}
//               </SidebarContent>
//             </Sidebar>
//           </PopoverContent>
//         </Popover>
//       </div>
//     )
//   }
  

// export default NavActions

"use client"

import * as React from "react"
import { LucideIcon, MoreHorizontal, Star } from 'lucide-react'

import { Button } from './ui/button'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'


const NavActions = ({
    actions,
  }: {
    actions: {
      label: string
      icon: LucideIcon
    }[][]
  }) => {
    const [isOpen, setIsOpen] = React.useState(false)
  
    React.useEffect(() => {
      setIsOpen(true)
    }, [])
  
    return (
      <div className="flex items-center gap-2 text-sm">
        <div className="hidden font-medium text-muted-foreground md:inline-block">
          Edit Oct 08
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Star />
        </Button>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 data-[state=open]:bg-accent"
            >
              <MoreHorizontal />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-56 overflow-hidden rounded-lg p-0"
            align="end"
          >
            <Sidebar collapsible="none" className="bg-transparent">
              <SidebarContent>
                {actions.map((group, index) => (
                  <SidebarGroup key={index} className="border-b last:border-none">
                    <SidebarGroupContent className="gap-0">
                      <SidebarMenu>
                        {group.map((item, index) => (
                          <SidebarMenuItem key={index}>
                            <SidebarMenuButton>
                              <item.icon /> <span>{item.label}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
              </SidebarContent>
            </Sidebar>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
  

export default NavActions
