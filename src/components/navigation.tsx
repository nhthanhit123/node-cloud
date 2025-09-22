"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth";
import { Menu, Server, Cloud, Monitor, Palette, Store, CreditCard, User, LogIn, Phone, Settings, LogOut, Home, Shield, Key, Globe } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  const navigationItems = [
    { name: "Hosting", href: "/hosting", icon: Server },
    { name: "Cloud VPS", href: "/vps", icon: Cloud },
    { name: "Máy Chủ Vật Lý", href: "/server", icon: Monitor },
    { name: "Thiết Kế Web", href: "/web-design", icon: Palette },
    { name: "Kho Giao Diện", href: "/themes", icon: Store },
    { name: "Nạp Tiền", href: "/topup", icon: CreditCard },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Server className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              TechHost
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth & Contact */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <Home className="mr-2 h-4 w-4" />
                        <span>Tổng quan</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Hồ sơ</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/services">
                        <Globe className="mr-2 h-4 w-4" />
                        <span>Dịch vụ của tôi</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/security">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Bảo mật</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/change-password">
                        <Key className="mr-2 h-4 w-4" />
                        <span>Đổi mật khẩu</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Cài đặt</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Đăng xuất</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login" className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Đăng Nhập</span>
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">
                    <User className="h-4 w-4 mr-2" />
                    Đăng Ký
                  </Link>
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact" className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1900 1234</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <item.icon className="h-5 w-5 text-primary" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="border-t pt-6 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user?.avatar} alt={user?.name} />
                            <AvatarFallback>
                              {user?.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <p className="font-medium">{user?.name}</p>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                          <Home className="h-4 w-4 mr-2" />
                          Tổng quan
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/profile" onClick={() => setIsOpen(false)}>
                          <User className="h-4 w-4 mr-2" />
                          Hồ sơ
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/services" onClick={() => setIsOpen(false)}>
                          <Globe className="h-4 w-4 mr-2" />
                          Dịch vụ của tôi
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/security" onClick={() => setIsOpen(false)}>
                          <Shield className="h-4 w-4 mr-2" />
                          Bảo mật
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/change-password" onClick={() => setIsOpen(false)}>
                          <Key className="h-4 w-4 mr-2" />
                          Đổi mật khẩu
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/settings" onClick={() => setIsOpen(false)}>
                          <Settings className="h-4 w-4 mr-2" />
                          Cài đặt
                        </Link>
                      </Button>
                      <Button variant="destructive" className="w-full justify-start" onClick={() => { handleLogout(); setIsOpen(false); }}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Đăng xuất
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <LogIn className="h-4 w-4 mr-2" />
                          Đăng Nhập
                        </Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link href="/register" onClick={() => setIsOpen(false)}>
                          <User className="h-4 w-4 mr-2" />
                          Đăng Ký
                        </Link>
                      </Button>
                    </>
                  )}
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      <Phone className="h-4 w-4 mr-2" />
                      1900 1234
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}