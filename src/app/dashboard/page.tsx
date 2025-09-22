"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { 
  Server, 
  Cloud, 
  Monitor, 
  Palette, 
  Globe, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  Settings
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, services, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log("Dashboard: Checking authentication...", { isAuthenticated });
    // Mark component as mounted
    setIsMounted(true);
    
    // Add a small delay to ensure Zustand persistence is hydrated
    const timer = setTimeout(() => {
      console.log("Dashboard: After timeout, isAuthenticated:", isAuthenticated);
      setIsLoading(false);
      if (!isAuthenticated) {
        console.log("Dashboard: Redirecting to login...");
        router.push("/login");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  // Show loading state while checking authentication
  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Only redirect if not authenticated after loading
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  const activeServices = services.filter(service => service.status === 'active');
  const totalServices = services.length;

  const serviceIcons = {
    hosting: Server,
    vps: Cloud,
    server: Monitor,
    website: Palette
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Đang hoạt động';
      case 'expired':
        return 'Hết hạn';
      case 'suspended':
        return 'Tạm ngưng';
      default:
        return 'Không xác định';
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tổng quan</h1>
          <p className="text-muted-foreground mt-2">
            Chào mừng trở lại, {user?.name}! Đây là tổng quan về tài khoản của bạn.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng dịch vụ</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalServices}</div>
              <p className="text-xs text-muted-foreground">
                +2 so với tháng trước
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đang hoạt động</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeServices.length}</div>
              <p className="text-xs text-muted-foreground">
                Tất cả đều hoạt động tốt
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sử dụng CPU</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">
                +12% so với tuần trước
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Thời gian hoạt động</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">
                Uptime tuyệt đối
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Services */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Dịch vụ gần đây</CardTitle>
                    <CardDescription>
                      Các dịch vụ bạn đang sử dụng
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services">
                      Xem tất cả
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => {
                    const IconComponent = serviceIcons[service.type];
                    return (
                      <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{service.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Hết hạn: {new Date(service.expiresAt).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(service.status)}>
                            {getStatusText(service.status)}
                          </Badge>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/services/${service.type}/${service.id}`}>
                              <Settings className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Thao tác nhanh</CardTitle>
                <CardDescription>
                  Các chức năng thường dùng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/hosting">
                    <Server className="h-4 w-4 mr-2" />
                    Mua Hosting
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/vps">
                    <Cloud className="h-4 w-4 mr-2" />
                    Mua VPS
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/server">
                    <Monitor className="h-4 w-4 mr-2" />
                    Thuê Máy Chủ
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/web-design">
                    <Palette className="h-4 w-4 mr-2" />
                    Thiết Kế Web
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/topup">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Nạp Tiền
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700" asChild>
                  <Link href="/quick-topup">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Nạp Tiền Nhanh
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle>Tình trạng hệ thống</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Web Server</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Bình thường</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Bình thường</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Network</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Bình thường</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Server</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-yellow-600">Bảo trì</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}