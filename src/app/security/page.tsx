"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthStore } from "@/store/auth";
import { 
  Shield, 
  Smartphone, 
  Mail, 
  Key, 
  Globe, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function SecurityPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [showApiKeys, setShowApiKeys] = useState(false);

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

  // Mock data
  const activeSessions = [
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'Hanoi, Vietnam',
      ip: '192.168.1.100',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'Ho Chi Minh City, Vietnam',
      ip: '192.168.1.101',
      lastActive: '1 hour ago',
      current: false
    }
  ];

  const apiKeys = [
    {
      id: '1',
      name: 'Mobile App',
      key: 'sk_live_51N2b3d4e5f6g7h8i9j0',
      created: '2024-01-15',
      lastUsed: '2024-01-20'
    }
  ];

  const handleEnable2FA = () => {
    toast({
      title: "Bảo mật hai lớp",
      description: "Vui lòng làm theo hướng dẫn để thiết lập bảo mật hai lớp.",
    });
  };

  const handleRevokeSession = (sessionId: string) => {
    toast({
      title: "Đã đăng xuất",
      description: "Phiên làm việc đã được đăng xuất thành công.",
    });
  };

  const handleGenerateApiKey = () => {
    toast({
      title: "Tạo API Key",
      description: "API key mới đã được tạo thành công.",
    });
  };

  const handleRevokeApiKey = (keyId: string) => {
    toast({
      title: "Đã thu hồi",
      description: "API key đã được thu hồi thành công.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Bảo mật</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý cài đặt bảo mật và quyền riêng tư của tài khoản
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Two Factor Authentication */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Xác thực hai lớp (2FA)</span>
                </CardTitle>
                <CardDescription>
                  Thêm một lớp bảo mật bổ sung cho tài khoản của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Xác thực hai lớp</span>
                      <Badge variant={twoFactorEnabled ? "default" : "secondary"}>
                        {twoFactorEnabled ? "Đã bật" : "Đã tắt"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {twoFactorEnabled 
                        ? "Tài khoản của bạn được bảo vệ bằng xác thực hai lớp"
                        : "Bật xác thực hai lớp để tăng cường bảo mật"
                      }
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>
                
                {!twoFactorEnabled && (
                  <Button onClick={handleEnable2FA} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Bật xác thực hai lớp
                  </Button>
                )}
                
                {twoFactorEnabled && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Xác thực hai lớp đã được bật. Sử dụng ứng dụng xác thực trên điện thoại của bạn để đăng nhập.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Phiên làm việc đang hoạt động</span>
                </CardTitle>
                <CardDescription>
                  Quản lý các phiên đăng nhập trên các thiết bị của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{session.device}</h4>
                          {session.current && (
                            <Badge variant="outline" className="text-xs">
                              Thiết bị hiện tại
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {session.location} • {session.ip}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Hoạt động {session.lastActive}
                        </p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRevokeSession(session.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Đăng xuất
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* API Keys */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Key className="h-5 w-5" />
                      <span>API Keys</span>
                    </CardTitle>
                    <CardDescription>
                      Quản lý các khóa API để truy cập chương trình
                    </CardDescription>
                  </div>
                  <Button onClick={handleGenerateApiKey}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo API Key
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{apiKey.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {showApiKeys ? apiKey.key : apiKey.key.substring(0, 20) + '...'}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowApiKeys(!showApiKeys)}
                        >
                          {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Tạo: {new Date(apiKey.created).toLocaleDateString('vi-VN')} • 
                        Sử dụng lần cuối: {new Date(apiKey.lastUsed).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRevokeApiKey(apiKey.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Thu hồi
                    </Button>
                  </div>
                ))}
                
                {apiKeys.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Key className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Chưa có API key nào</p>
                    <p className="text-sm">Tạo API key để bắt đầu tích hợp</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Status */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Tình trạng bảo mật</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Xác thực hai lớp</span>
                  <div className="flex items-center space-x-2">
                    {twoFactorEnabled ? (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">Đã bật</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-red-600">Chưa bật</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mật khẩu</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Mạnh</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Khôi phục email</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Đã thiết lập</span>
                  </div>
                </div>
                
                <Separator />
                
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Chúng tôi khuyên bạn nên bật xác thực hai lớp để bảo vệ tài khoản tốt hơn.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Thông báo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Email</span>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">SMS</span>
                  </div>
                  <Switch
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Cảnh báo đăng nhập</span>
                  </div>
                  <Switch
                    checked={loginAlerts}
                    onCheckedChange={setLoginAlerts}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}