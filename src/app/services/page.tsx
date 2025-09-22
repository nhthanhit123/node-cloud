"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/auth";
import { 
  Server, 
  Cloud, 
  Monitor, 
  Palette, 
  Search,
  Filter,
  Plus,
  Settings,
  Activity,
  Calendar,
  DollarSign,
  ArrowUpRight,
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const { services, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true);
    
    // Add a small delay to ensure Zustand persistence is hydrated
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!isAuthenticated) {
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

  const serviceIcons = {
    hosting: Server,
    vps: Cloud,
    server: Monitor,
    website: Palette
  };

  const serviceNames = {
    hosting: "Hosting",
    vps: "Cloud VPS",
    server: "Máy Chủ Vật Lý",
    website: "Thiết Kế Web"
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

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         serviceNames[service.type].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || service.type === activeTab || (activeTab === "active" && service.status === "active");
    return matchesSearch && matchesTab;
  });

  const servicesByType = {
    all: filteredServices,
    hosting: filteredServices.filter(s => s.type === 'hosting'),
    vps: filteredServices.filter(s => s.type === 'vps'),
    server: filteredServices.filter(s => s.type === 'server'),
    website: filteredServices.filter(s => s.type === 'website'),
    active: filteredServices.filter(s => s.status === 'active')
  };

  const ServiceCard = ({ service }: { service: any }) => {
    const IconComponent = serviceIcons[service.type];
    
    return (
      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <IconComponent className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <CardDescription>{serviceNames[service.type]}</CardDescription>
              </div>
            </div>
            <Badge className={getStatusColor(service.status)}>
              {getStatusText(service.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Service Details */}
          <div className="space-y-2">
            {service.type === 'hosting' && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Domain:</span>
                  <span className="font-medium">{service.details.domain}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Disk Space:</span>
                  <span className="font-medium">{service.details.diskSpace}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bandwidth:</span>
                  <span className="font-medium">{service.details.bandwidth}</span>
                </div>
              </>
            )}
            
            {service.type === 'vps' && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CPU:</span>
                  <span className="font-medium">{service.details.cpu}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">RAM:</span>
                  <span className="font-medium">{service.details.ram}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Storage:</span>
                  <span className="font-medium">{service.details.storage}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IP:</span>
                  <span className="font-medium">{service.details.ip}</span>
                </div>
              </>
            )}
            
            {service.type === 'server' && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CPU:</span>
                  <span className="font-medium">{service.details.cpu}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">RAM:</span>
                  <span className="font-medium">{service.details.ram}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Storage:</span>
                  <span className="font-medium">{service.details.storage}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{service.details.location}</span>
                </div>
              </>
            )}
            
            {service.type === 'website' && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Website:</span>
                  <span className="font-medium">{service.details.website}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Package:</span>
                  <span className="font-medium">{service.details.package}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">{service.details.status}</span>
                </div>
              </>
            )}
          </div>

          {/* Dates */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Hết hạn: {new Date(service.expiresAt).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/services/${service.type}/${service.id}`}>
                  <Settings className="h-4 w-4 mr-1" />
                  Quản lý
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Activity className="h-4 w-4 mr-1" />
                Theo dõi
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dịch vụ của tôi</h1>
              <p className="text-muted-foreground mt-2">
                Quản lý tất cả các dịch vụ bạn đang sử dụng
              </p>
            </div>
            <Button className="hidden sm:flex">
              <Plus className="h-4 w-4 mr-2" />
              Thêm dịch vụ
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tổng dịch vụ</p>
                  <p className="text-2xl font-bold">{services.length}</p>
                </div>
                <Server className="h-8 w-8 text-primary/20" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Đang hoạt động</p>
                  <p className="text-2xl font-bold text-green-600">
                    {services.filter(s => s.status === 'active').length}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-green-500/20" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hết hạn</p>
                  <p className="text-2xl font-bold text-red-600">
                    {services.filter(s => s.status === 'expired').length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-red-500/20" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Chi phí/tháng</p>
                  <p className="text-2xl font-bold">
                    {services.filter(s => s.status === 'active').length * 150}K
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-primary/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="hosting">Hosting</TabsTrigger>
            <TabsTrigger value="vps">VPS</TabsTrigger>
            <TabsTrigger value="server">Máy chủ</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="active">Hoạt động</TabsTrigger>
          </TabsList>

          {Object.entries(servicesByType).map(([tab, tabServices]) => (
            <TabsContent key={tab} value={tab} className="space-y-6">
              {tabServices.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tabServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Server className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-medium mb-2">Không tìm thấy dịch vụ</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Không có dịch vụ nào phù hợp với tìm kiếm của bạn." : "Bạn chưa có dịch vụ nào trong danh mục này."}
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm dịch vụ mới
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}