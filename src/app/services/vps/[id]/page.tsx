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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthStore } from "@/store/auth";
import { 
  Cloud, 
  Activity, 
  Monitor, 
  RefreshCw, 
  Power, 
  Pause,
  Play,
  Settings,
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
  Terminal,
  Network,
  HardDrive,
  Cpu,
  MemoryStickIcon,
  Shield,
  Globe,
  Database,
  BarChart3,
  Zap,
  Download,
  Plus
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function VPSServicePage({ params }: { params: { id: string } }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [vpsStatus, setVpsStatus] = useState("running");

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

  // Mock VPS data
  const vps = {
    id: params.id,
    name: "VPS Pro Package",
    status: "active",
    expiresAt: "2025-02-01",
    details: {
      cpu: "2 Cores",
      ram: "4GB",
      storage: "80GB SSD",
      os: "Ubuntu 22.04",
      ip: "192.168.1.100",
      bandwidth: "2TB",
      location: "Hanoi, Vietnam"
    },
    usage: {
      cpu: 25,
      ram: 65,
      storage: 45,
      network: { in: 15, out: 25 }
    },
    credentials: {
      ip: "192.168.1.100",
      username: "root",
      password: "vps_password123",
      sshPort: 22,
      vncUrl: "https://vnc.example.com:5901",
      vncPassword: "vnc_pass123"
    },
    network: {
      incoming: 150,
      outgoing: 250,
      total: 2048
    }
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Đã sao chép",
      description: `${label} đã được sao chép vào clipboard.`,
    });
  };

  const handleVPSAction = (action: string) => {
    setVpsStatus(action === "restart" ? "restarting" : action);
    toast({
      title: "Thao tác thành công",
      description: `VPS đang ${action === "power" ? "bật" : action === "pause" ? "tạm dừng" : "khởi động lại"}...`,
    });
    
    // Simulate action completion
    setTimeout(() => {
      setVpsStatus(action === "pause" ? "stopped" : "running");
    }, 3000);
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: "Thao tác thành công",
      description: `${action} đã được thực hiện.`,
    });
  };

  const UsageBar = ({ used, total, unit, label, icon: Icon }: { used: number; total: number; unit?: string; label: string; icon: any }) => {
    const percentage = (used / total) * 100;
    const getColor = () => {
      if (percentage >= 90) return "bg-red-500";
      if (percentage >= 70) return "bg-yellow-500";
      return "bg-green-500";
    };

    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </div>
          <span>{used}{unit || '%'} / {total}{unit || '%'}</span>
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'stopped':
        return 'bg-red-100 text-red-800';
      case 'restarting':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running':
        return 'Đang chạy';
      case 'stopped':
        return 'Đã dừng';
      case 'restarting':
        return 'Đang khởi động lại';
      default:
        return 'Không xác định';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{vps.name}</h1>
                <Badge className={getStatusColor(vpsStatus)}>
                  {getStatusText(vpsStatus)}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                IP: {vps.details.ip} • OS: {vps.details.os} • Hết hạn: {new Date(vps.expiresAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <a href={vps.credentials.vncUrl} target="_blank" rel="noopener noreferrer">
                  <Monitor className="h-4 w-4 mr-2" />
                  VNC
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
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="console">Console</TabsTrigger>
                <TabsTrigger value="network">Mạng</TabsTrigger>
                <TabsTrigger value="credentials">Thông tin</TabsTrigger>
                <TabsTrigger value="settings">Cài đặt</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Resource Usage */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span> sử dụng tài nguyên</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <UsageBar
                      used={vps.usage.cpu}
                      total={100}
                      label="CPU"
                      icon={Cpu}
                    />
                    <UsageBar
                      used={vps.usage.ram}
                      total={100}
                      label="RAM"
                      icon={MemoryStickIcon}
                    />
                    <UsageBar
                      used={vps.usage.storage}
                      total={100}
                      label="Storage"
                      icon={HardDrive}
                    />
                  </CardContent>
                </Card>

                {/* VPS Control */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Điều khiển VPS</CardTitle>
                    <CardDescription>
                      Quản lý trạng thái và các thao tác cơ bản
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button 
                        className="h-20 flex-col"
                        onClick={() => handleVPSAction("power")}
                        disabled={vpsStatus === "running"}
                      >
                        <Power className="h-6 w-6 mb-2" />
                        <span className="text-sm">Bật</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => handleVPSAction("pause")}
                        disabled={vpsStatus === "stopped"}
                      >
                        <Pause className="h-6 w-6 mb-2" />
                        <span className="text-sm">Tạm dừng</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => handleVPSAction("restart")}
                        disabled={vpsStatus === "restarting"}
                      >
                        <RefreshCw className="h-6 w-6 mb-2" />
                        <span className="text-sm">Khởi động lại</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        asChild
                      >
                        <a href={vps.credentials.vncUrl} target="_blank" rel="noopener noreferrer">
                          <Monitor className="h-6 w-6 mb-2" />
                          <span className="text-sm">VNC</span>
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Thao tác nhanh</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => handleQuickAction("Reinstall OS")}
                      >
                        <RefreshCw className="h-6 w-6 mb-2" />
                        <span className="text-sm">Cài lại OS</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => handleQuickAction("Backup")}
                      >
                        <Database className="h-6 w-6 mb-2" />
                        <span className="text-sm">Backup</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => handleQuickAction("Snapshot")}
                      >
                        <Zap className="h-6 w-6 mb-2" />
                        <span className="text-sm">Snapshot</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => handleQuickAction("Firewall")}
                      >
                        <Shield className="h-6 w-6 mb-2" />
                        <span className="text-sm">Firewall</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* VPS Details */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Chi tiết VPS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Cpu className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">CPU:</span>
                          <span className="font-medium">{vps.details.cpu}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MemoryStickIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">RAM:</span>
                          <span className="font-medium">{vps.details.ram}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <HardDrive className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Storage:</span>
                          <span className="font-medium">{vps.details.storage}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">OS:</span>
                          <span className="font-medium">{vps.details.os}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Network className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Location:</span>
                          <span className="font-medium">{vps.details.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Bandwidth:</span>
                          <span className="font-medium">{vps.details.bandwidth}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Console Tab */}
              <TabsContent value="console" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Terminal className="h-5 w-5" />
                      <span>Web Console</span>
                    </CardTitle>
                    <CardDescription>
                      Truy cập terminal trực tiếp từ trình duyệt
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
                      <div className="mb-2">Welcome to Ubuntu 22.04 LTS (GNU/Linux 5.15.0-52-generic x86_64)</div>
                      <div className="mb-2">Last login: Mon Jan 15 10:30:00 2024 from 192.168.1.1</div>
                      <div className="mb-2">root@vps:~# </div>
                      <div className="animate-pulse">_</div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Clear
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Log
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>SSH Access</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <Terminal className="h-4 w-4" />
                      <AlertDescription>
                        Bạn cũng có thể kết nối qua SSH client với các thông tin sau:
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SSH Command:</span>
                        <code className="bg-muted px-2 py-1 rounded text-sm">
                          ssh root@{vps.credentials.ip} -p {vps.credentials.sshPort}
                        </code>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(`ssh root@${vps.credentials.ip} -p ${vps.credentials.sshPort}`, "SSH Command")}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy SSH Command
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Network Tab */}
              <TabsContent value="network" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Network className="h-5 w-5" />
                      <span>Network Statistics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Incoming Traffic</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Current:</span>
                            <span>{vps.network.incoming} Mbps</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${(vps.network.incoming / 1000) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">Outgoing Traffic</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Current:</span>
                            <span>{vps.network.outgoing} Mbps</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-green-500"
                              style={{ width: `${(vps.network.outgoing / 1000) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Monthly Bandwidth</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Used: {vps.network.incoming + vps.network.outgoing} GB</span>
                          <span>Total: {vps.network.total} GB</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-purple-500"
                            style={{ width: `${((vps.network.incoming + vps.network.outgoing) / vps.network.total) * 100}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {(((vps.network.incoming + vps.network.outgoing) / vps.network.total) * 100).toFixed(1)}% of monthly bandwidth used
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Network Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>IP Address</Label>
                        <Input value={vps.credentials.ip} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label>SSH Port</Label>
                        <Input value={vps.credentials.sshPort.toString()} readOnly />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handleQuickAction("Configure Firewall")}>
                        <Shield className="h-4 w-4 mr-2" />
                        Configure Firewall
                      </Button>
                      <Button variant="outline" onClick={() => handleQuickAction("Add IP")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Additional IP
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Credentials Tab */}
              <TabsContent value="credentials" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Terminal className="h-5 w-5" />
                      <span>SSH Credentials</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>IP Address</Label>
                      <div className="flex space-x-2">
                        <Input value={vps.credentials.ip} readOnly />
                        <Button 
                          variant="outline" 
                          onClick={() => handleCopyToClipboard(vps.credentials.ip, "IP Address")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Username</Label>
                      <div className="flex space-x-2">
                        <Input value={vps.credentials.username} readOnly />
                        <Button 
                          variant="outline" 
                          onClick={() => handleCopyToClipboard(vps.credentials.username, "Username")}
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
                          value={vps.credentials.password}
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
                          onClick={() => handleCopyToClipboard(vps.credentials.password, "Password")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" onClick={() => handleQuickAction("Reset Password")}>
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Monitor className="h-5 w-5" />
                      <span>VNC Access</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>VNC URL</Label>
                      <div className="flex space-x-2">
                        <Input value={vps.credentials.vncUrl} readOnly />
                        <Button 
                          variant="outline" 
                          onClick={() => handleCopyToClipboard(vps.credentials.vncUrl, "VNC URL")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" asChild>
                          <a href={vps.credentials.vncUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>VNC Password</Label>
                      <div className="flex space-x-2">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={vps.credentials.vncPassword}
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
                          onClick={() => handleCopyToClipboard(vps.credentials.vncPassword, "VNC Password")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hostname">Hostname</Label>
                      <Input id="hostname" value="vps-001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nameserver">Nameservers</Label>
                      <Input id="nameserver" value="8.8.8.8, 8.8.4.4" />
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
                        <p className="text-sm text-muted-foreground">Weekly backups on Sunday</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Manual Backup</p>
                        <p className="text-sm text-muted-foreground">Last backup: 3 days ago</p>
                      </div>
                      <Button size="sm">
                        <Database className="h-4 w-4 mr-2" />
                        Backup Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction("Reinstall OS")}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reinstall Operating System
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction("Resize Disk")}>
                      <HardDrive className="h-4 w-4 mr-2" />
                      Resize Disk
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction("Upgrade Resources")}>
                      <Zap className="h-4 w-4 mr-2" />
                      Upgrade Resources
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* VPS Status */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Trạng thái</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">VPS</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      vpsStatus === 'running' ? 'bg-green-500' : 
                      vpsStatus === 'stopped' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-sm">{getStatusText(vpsStatus)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Network</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Firewall</span>
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
                  <a href={vps.credentials.vncUrl} target="_blank" rel="noopener noreferrer">
                    <Monitor className="h-4 w-4 mr-2" />
                    VNC Console
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction("Web Console")}>
                  <Terminal className="h-4 w-4 mr-2" />
                  Web Console
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleQuickAction("Statistics")}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Statistics
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/services/vps/${vps.id}/support`}>
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