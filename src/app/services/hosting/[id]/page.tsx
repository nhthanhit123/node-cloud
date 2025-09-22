"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthStore } from "@/store/auth";
import { 
  Server, 
  Globe, 
  Database, 
  Mail, 
  Lock, 
  Settings, 
  Activity,
  Upload,
  Download,
  RefreshCw,
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  HardDrive,
  Wifi,
  Users
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function HostingServicePage({ params }: { params: { id: string } }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showFtpPassword, setShowFtpPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

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

  // Mock service data
  const service = {
    id: params.id,
    name: "Professional Hosting Package",
    domain: "example.com",
    status: "active",
    expiresAt: "2025-01-15",
    details: {
      diskSpace: "20GB",
      bandwidth: "200GB",
      databases: 10,
      emailAccounts: 10,
      subdomains: 5,
      parkedDomains: 5,
      ftpAccounts: 3
    },
    usage: {
      disk: { used: 8.5, total: 20, unit: "GB" },
      bandwidth: { used: 45, total: 200, unit: "GB" },
      databases: { used: 3, total: 10 },
      email: { used: 5, total: 10 }
    },
    credentials: {
      cpanelUrl: "https://cpanel.example.com",
      cpanelUsername: "example_user",
      cpanelPassword: "password123",
      ftpHost: "ftp.example.com",
      ftpUsername: "example_ftp",
      ftpPassword: "ftp_password123"
    }
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Đã sao chép",
      description: `${label} đã được sao chép vào clipboard.`,
    });
  };

  const handleResetPassword = () => {
    toast({
      title: "Đặt lại mật khẩu",
      description: "Mật khẩu mới đã được gửi đến email của bạn.",
    });
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: "Thao tác thành công",
      description: `${action} đã được thực hiện.`,
    });
  };

  const UsageBar = ({ used, total, unit, label }: { used: number; total: number; unit: string; label: string }) => {
    const percentage = (used / total) * 100;
    const getColor = () => {
      if (percentage >= 90) return "bg-red-500";
      if (percentage >= 70) return "bg-yellow-500";
      return "bg-green-500";
    };

    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>{label}</span>
          <span>{used}{unit} / {total}{unit}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getColor()} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-xs text-muted-foreground">
          {percentage.toFixed(1)}% đã sử dụng
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{service.name}</h1>
                <Badge className="bg-green-100 text-green-800">
                  {service.status === "active" ? "Đang hoạt động" : service.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Domain: {service.domain} • Hết hạn: {new Date(service.expiresAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <a href={service.credentials.cpanelUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  cPanel
                </a>
              </Button>
              <Button>
                <RefreshCw className="h-4 w-4 mr-2" />
                Gia hạn
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="credentials">Thông tin đăng nhập</TabsTrigger>
                <TabsTrigger value="features">Tính năng</TabsTrigger>
                <TabsTrigger value="settings">Cài đặt</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Usage Statistics */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Thống kê sử dụng</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <UsageBar
                      used={service.usage.disk.used}
                      total={service.usage.disk.total}
                      unit={service.usage.disk.unit}
                      label="Dung lượng đĩa"
                    />
                    <UsageBar
                      used={service.usage.bandwidth.used}
                      total={service.usage.bandwidth.total}
                      unit={service.usage.bandwidth.unit}
                      label="Băng thông"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Cơ sở dữ liệu</span>
                          <span>{service.usage.databases.used}/{service.usage.databases.total}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${(service.usage.databases.used / service.usage.databases.total) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Email</span>
                          <span>{service.usage.email.used}/{service.usage.email.total}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${(service.usage.email.used / service.usage.email.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Thao tác nhanh</CardTitle>
                    <CardDescription>
                      Các chức năng quản lý hosting thường dùng
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => handleQuickAction("File Manager")}
                      >
                        <Upload className="h-6 w-6 mb-2" />
                        <span className="text-sm">File Manager</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => handleQuickAction("PhpMyAdmin")}
                      >
                        <Database className="h-6 w-6 mb-2" />
                        <span className="text-sm">PhpMyAdmin</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => handleQuickAction("Backup")}
                      >
                        <Download className="h-6 w-6 mb-2" />
                        <span className="text-sm">Backup</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => handleQuickAction("SSL")}
                      >
                        <Lock className="h-6 w-6 mb-2" />
                        <span className="text-sm">SSL</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Details */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Chi tiết dịch vụ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <HardDrive className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Dung lượng:</span>
                          <span className="font-medium">{service.details.diskSpace}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Wifi className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Băng thông:</span>
                          <span className="font-medium">{service.details.bandwidth}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Database:</span>
                          <span className="font-medium">{service.details.databases}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Email:</span>
                          <span className="font-medium">{service.details.emailAccounts}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Subdomain:</span>
                          <span className="font-medium">{service.details.subdomains}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">FTP:</span>
                          <span className="font-medium">{service.details.ftpAccounts}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Credentials Tab */}
              <TabsContent value="credentials" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>cPanel Credentials</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>cPanel URL</Label>
                      <div className="flex space-x-2">
                        <Input value={service.credentials.cpanelUrl} readOnly />
                        <Button 
                          variant="outline" 
                          onClick={() => handleCopyToClipboard(service.credentials.cpanelUrl, "cPanel URL")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" asChild>
                          <a href={service.credentials.cpanelUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Username</Label>
                      <div className="flex space-x-2">
                        <Input value={service.credentials.cpanelUsername} readOnly />
                        <Button 
                          variant="outline" 
                          onClick={() => handleCopyToClipboard(service.credentials.cpanelUsername, "cPanel Username")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <div className="flex space-x-2">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={service.credentials.cpanelPassword}
                          readOnly
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleCopyToClipboard(service.credentials.cpanelPassword, "cPanel Password")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" onClick={handleResetPassword}>
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Upload className="h-5 w-5" />
                      <span>FTP Credentials</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>FTP Host</Label>
                      <div className="flex space-x-2">
                        <Input value={service.credentials.ftpHost} readOnly />
                        <Button 
                          variant="outline" 
                          onClick={() => handleCopyToClipboard(service.credentials.ftpHost, "FTP Host")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>FTP Username</Label>
                      <div className="flex space-x-2">
                        <Input value={service.credentials.ftpUsername} readOnly />
                        <Button 
                          variant="outline" 
                          onClick={() => handleCopyToClipboard(service.credentials.ftpUsername, "FTP Username")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>FTP Password</Label>
                      <div className="flex space-x-2">
                        <Input
                          type={showFtpPassword ? "text" : "password"}
                          value={service.credentials.ftpPassword}
                          readOnly
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => setShowFtpPassword(!showFtpPassword)}
                        >
                          {showFtpPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleCopyToClipboard(service.credentials.ftpPassword, "FTP Password")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Features Tab */}
              <TabsContent value="features" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Database className="h-5 w-5" />
                        <span>Database Management</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Database className="h-4 w-4 mr-2" />
                        PhpMyAdmin
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Remote MySQL
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Database Backup
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Mail className="h-5 w-5" />
                        <span>Email Management</span>
                    </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Accounts
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Forwarders
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Autoresponders
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Globe className="h-5 w-5" />
                        <span>Domain Management</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Globe className="h-4 w-4 mr-2" />
                        Subdomains
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Parked Domains
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Redirects
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lock className="h-5 w-5" />
                        <span>Security</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Lock className="h-4 w-4 mr-2" />
                        SSL/TLS
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        ModSecurity
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Eye className="h-4 w-4 mr-2" />
                        IP Blocker
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="domain">Primary Domain</Label>
                      <Input id="domain" value={service.domain} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phpVersion">PHP Version</Label>
                      <select id="phpVersion" className="w-full p-2 border rounded-md">
                        <option value="8.1">PHP 8.1</option>
                        <option value="8.0">PHP 8.0</option>
                        <option value="7.4">PHP 7.4</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Backup Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Automatic Backups</p>
                        <p className="text-sm text-muted-foreground">Daily backups at 2:00 AM</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Manual Backup</p>
                        <p className="text-sm text-muted-foreground">Last backup: 2 days ago</p>
                      </div>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Backup Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service Status */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Trạng thái</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Service</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Web Server</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Running</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Liên kết nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={service.credentials.cpanelUrl} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    cPanel
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={`${service.credentials.cpanelUrl}/phpmyadmin`} target="_blank" rel="noopener noreferrer">
                    <Database className="h-4 w-4 mr-2" />
                    PhpMyAdmin
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={`http://${service.domain}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Website
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/services/hosting/${service.id}/support`}>
                    <Settings className="h-4 w-4 mr-2" />
                    Support
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}