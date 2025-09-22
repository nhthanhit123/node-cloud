"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Star, Server, Shield, Zap, Globe, Headphones, Database, Cpu, Mail } from "lucide-react";

export default function HostingPage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  const hostingPlans = [
    {
      name: "Starter",
      price: { monthly: 50000, yearly: 500000 },
      popular: false,
      features: [
        "1 Website",
        "5GB SSD Storage",
        "50GB Bandwidth",
        "1 Email Account",
        "SSL Free",
        "Backup hàng tuần",
        "Subdomain không giới hạn",
        "Database MySQL: 1"
      ],
      highlightedFeatures: ["Phù hợp website cá nhân", "Blog nhỏ", "Dự án thử nghiệm"]
    },
    {
      name: "Professional",
      price: { monthly: 150000, yearly: 1500000 },
      popular: true,
      features: [
        "5 Websites",
        "20GB SSD Storage",
        "200GB Bandwidth",
        "10 Email Accounts",
        "SSL Free + CDN",
        "Backup hàng ngày",
        "Subdomain không giới hạn",
        "Database MySQL: 5",
        "Priority Support",
        "Free Domain 1 năm"
      ],
      highlightedFeatures: ["Doanh nghiệp nhỏ", "Website thương mại", "Tối ưu SEO"]
    },
    {
      name: "Business",
      price: { monthly: 300000, yearly: 3000000 },
      popular: false,
      features: [
        "15 Websites",
        "50GB SSD Storage",
        "500GB Bandwidth",
        "25 Email Accounts",
        "SSL Wildcard + CDN",
        "Backup hàng ngày + Offsite",
        "Subdomain không giới hạn",
        "Database MySQL: 15",
        "Priority Support 24/7",
        "Free Domain 1 năm",
        "Dedicated IP"
      ],
      highlightedFeatures: ["Công ty vừa", "Website lớn", "Cần tài nguyên cao"]
    },
    {
      name: "Enterprise",
      price: { monthly: 500000, yearly: 5000000 },
      popular: false,
      features: [
        "Unlimited Websites",
        "100GB SSD Storage",
        "Unlimited Bandwidth",
        "Unlimited Email",
        "SSL Wildcard + CDN",
        "Backup real-time",
        "Subdomain không giới hạn",
        "Database MySQL: Unlimited",
        "24/7 Phone Support",
        "Free Domain 1 năm",
        "Dedicated IP",
        "Server Optimization",
        "Free SSL Certificate"
      ],
      highlightedFeatures: ["Doanh nghiệp lớn", "Traffic cao", "Yêu cầu bảo mật cao"]
    }
  ];

  const serverFeatures = [
    {
      icon: Server,
      title: "Server Hiệu Suất Cao",
      description: "Intel Xeon Processor thế hệ mới nhất, RAM DDR4 ECC, SSD NVMe siêu tốc"
    },
    {
      icon: Shield,
      title: "Bảo Mật Đa Lớp",
      description: "Firewall thế hệ mới, DDoS Protection, Malware Scanner, SSL miễn phí"
    },
    {
      icon: Zap,
      title: "Tốc Độ Vượt Trội",
      description: "SSD NVMe 10x nhanh hơn SSD thông thường, HTTP/3, Brotli Compression"
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Mạng lưới CDN toàn cầu với 50+ POPs, đảm bảo tốc độ truy cập tối ưu"
    },
    {
      icon: Headphones,
      title: "Hỗ Trợ 24/7",
      description: "Đội ngũ kỹ thuật chuyên nghiệp, hỗ trợ qua chat, ticket, điện thoại"
    },
    {
      icon: Database,
      title: "Backup Tự Động",
      description: "Hệ thống backup tự động hàng ngày, khôi phục dữ liệu chỉ với 1 click"
    }
  ];

  const getPrice = (plan: any) => {
    return selectedPeriod === "monthly" ? plan.price.monthly : plan.price.yearly;
  };

  const getPeriodText = () => {
    return selectedPeriod === "monthly" ? "/tháng" : "/năm";
  };

  const getSavings = (plan: any) => {
    const monthlyTotal = plan.price.monthly * 12;
    const savings = monthlyTotal - plan.price.yearly;
    return Math.round((savings / monthlyTotal) * 100);
  };

  const handleOrderNow = (plan: any) => {
    const params = new URLSearchParams({
      'dich-vu': 'hosting',
      'id': plan.name.toLowerCase()
    })
    router.push(`/thanh-toan?${params.toString()}`)
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Dịch Vụ Hosting Chuyên Nghiệp</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
              Hosting Tốc Độ Cao<br />
              <span className="text-foreground">Giá Rẻ Nhất Thị Trường</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Dịch vụ hosting chất lượng cao với công nghệ SSD NVMe tiên tiến, 
              bảo mật tối đa và hỗ trợ 24/7. Cam kết uptime 99.9% hoặc hoàn tiền.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Bắt Dầu Dùng Thử Miễn Phí
              </Button>
              <Button size="lg" variant="outline">
                Xem Demo Server
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Tại Sao Chọn Hosting Của Chúng Tôi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi đầu tư vào hạ tầng hiện đại nhất để mang đến trải nghiệm hosting tốt nhất cho bạn
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serverFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Bảng Giá Dịch Vụ Hosting
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Chọn gói dịch vụ phù hợp nhất với nhu cầu của bạn
            </p>
            
            {/* Period Toggle */}
            <div className="inline-flex items-center bg-background rounded-lg p-1 border">
              <Button
                variant={selectedPeriod === "monthly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod("monthly")}
                className="text-sm"
              >
                Trả theo tháng
              </Button>
              <Button
                variant={selectedPeriod === "yearly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod("yearly")}
                className="text-sm"
              >
                Trả theo năm{" "}
                <Badge className="ml-2 bg-green-500 text-white">Tiết kiệm 20%</Badge>
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {hostingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                  plan.popular ? 'border-2 border-primary scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-2">
                      <Star className="w-4 h-4 mr-1" />
                      Phổ Biến Nhất
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">
                        {getPrice(plan).toLocaleString('vi-VN')}₫
                      </span>
                      <span className="text-muted-foreground ml-1">
                        {getPeriodText()}
                      </span>
                    </div>
                    {selectedPeriod === "yearly" && (
                      <div className="text-sm text-green-600 mt-1">
                        Tiết kiệm {getSavings(plan)}%
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    {plan.highlightedFeatures.map((feature, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground">
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full mt-6 ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                        : 'variant-outline'
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleOrderNow(plan)}
                  >
                    Chọn Gói {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Thông Số Kỹ Thuật
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chi tiết cấu hình hệ thống hosting của chúng tôi
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Cấu Hình Server
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Processor</div>
                    <div className="font-semibold">Intel Xeon E5-2697A v4</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Cores</div>
                    <div className="font-semibold">16 Cores / 32 Threads</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">RAM</div>
                    <div className="font-semibold">128GB DDR4 ECC</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Storage</div>
                    <div className="font-semibold">SSD NVMe 2TB</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Network</div>
                    <div className="font-semibold">1Gbps Port</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">RAID</div>
                    <div className="font-semibold">RAID 10</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Phần Mềm & Hệ Thống
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Control Panel</div>
                    <div className="font-semibold">cPanel / DirectAdmin</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">PHP Versions</div>
                    <div className="font-semibold">PHP 5.6 - 8.3</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Database</div>
                    <div className="font-semibold">MySQL 8.0, MariaDB 10.6</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Web Server</div>
                    <div className="font-semibold">LiteSpeed, Nginx</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Cache</div>
                    <div className="font-semibold">Redis, Memcached</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Backup</div>
                    <div className="font-semibold">JetBackup, R1Soft</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Sẵn Sàng Nâng Cấp Website Của Bạn?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Hơn 10,000 khách hàng tin tưởng và sử dụng dịch vụ hosting của chúng tôi. 
              Tham gia ngay hôm nay và trải nghiệm sự khác biệt!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Đặt Hàng Ngay
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Mail className="mr-2 h-4 w-4" />
                Liên Hệ Tư Vấn
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}