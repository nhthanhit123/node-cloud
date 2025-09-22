"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Star, Cloud, Server, Shield, Zap, Globe, Headphones, Database, Cpu, Activity, Network, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VPSPage() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("vietnam");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const vpsPlans = [
    {
      name: "VPS Starter",
      price: { monthly: 150000, yearly: 1500000 },
      popular: false,
      specs: {
        cpu: "1 Core",
        ram: "1GB RAM",
        storage: "25GB SSD",
        bandwidth: "1TB Bandwidth",
        ip: "1 IPv4"
      },
      features: [
        "Intel Xeon CPU",
        "SSD NVMe Storage",
        "1Gbps Network Port",
        "Full Root Access",
        "KVM / Virtualizor",
        "Free Reinstall",
        "Basic DDoS Protection",
        "99.9% Uptime SLA"
      ],
      useCases: ["Website nhỏ", "Ứng dụng test", "Personal projects"]
    },
    {
      name: "VPS Business",
      price: { monthly: 350000, yearly: 3500000 },
      popular: true,
      specs: {
        cpu: "2 Cores",
        ram: "4GB RAM",
        storage: "60GB SSD",
        bandwidth: "2TB Bandwidth",
        ip: "1 IPv4"
      },
      features: [
        "Intel Xeon CPU",
        "SSD NVMe Storage",
        "1Gbps Network Port",
        "Full Root Access",
        "KVM / Virtualizor",
        "Free Reinstall",
        "Advanced DDoS Protection",
        "99.9% Uptime SLA",
        "Free Backup",
        "Snapshot Feature"
      ],
      useCases: ["Business website", "E-commerce", "CRM system"]
    },
    {
      name: "VPS Professional",
      price: { monthly: 700000, yearly: 7000000 },
      popular: false,
      specs: {
        cpu: "4 Cores",
        ram: "8GB RAM",
        storage: "120GB SSD",
        bandwidth: "3TB Bandwidth",
        ip: "1 IPv4"
      },
      features: [
        "Intel Xeon CPU",
        "SSD NVMe Storage",
        "1Gbps Network Port",
        "Full Root Access",
        "KVM / Virtualizor",
        "Free Reinstall",
        "Premium DDoS Protection",
        "99.95% Uptime SLA",
        "Daily Backup",
        "Snapshot Feature",
        "Load Balancer",
        "CDN Integration"
      ],
      useCases: ["High traffic sites", "SaaS applications", "Development servers"]
    },
    {
      name: "VPS Enterprise",
      price: { monthly: 1500000, yearly: 15000000 },
      popular: false,
      specs: {
        cpu: "8 Cores",
        ram: "16GB RAM",
        storage: "240GB SSD",
        bandwidth: "5TB Bandwidth",
        ip: "1 IPv4 + 1 IPv6"
      },
      features: [
        "Intel Xeon CPU",
        "SSD NVMe Storage",
        "1Gbps Network Port",
        "Full Root Access",
        "KVM / Virtualizor",
        "Free Reinstall",
        "Enterprise DDoS Protection",
        "99.99% Uptime SLA",
        "Real-time Backup",
        "Unlimited Snapshots",
        "Load Balancer",
        "CDN Integration",
        "Dedicated Support",
        "Custom OS Installation"
      ],
      useCases: ["Enterprise applications", "Large databases", "High-performance computing"]
    }
  ];

  const locations = [
    { id: "vietnam", name: "Việt Nam", flag: "🇻🇳", ping: "5ms" },
    { id: "singapore", name: "Singapore", flag: "🇸🇬", ping: "25ms" },
    { id: "japan", name: "Japan", flag: "🇯🇵", ping: "45ms" },
    { id: "usa", name: "USA", flag: "🇺🇸", ping: "150ms" }
  ];

  const operatingSystems = [
    { name: "Ubuntu", versions: ["20.04", "22.04", "23.10"], icon: "🐧" },
    { name: "CentOS", versions: ["7", "8", "9"], icon: "🔴" },
    { name: "Debian", versions: ["10", "11", "12"], icon: "🌀" },
    { name: "Windows", versions: ["2019", "2022"], icon: "🪟" },
    { name: "Fedora", versions: ["38", "39"], icon: "🎩" }
  ];

  const vpsFeatures = [
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Hạ tầng cloud hiện đại với khả năng mở rộng linh hoạt, tự động hóa và giám sát 24/7"
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Bảo mật đa lớp với firewall, DDoS protection, regular security updates và monitoring"
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "SSD NVMe siêu tốc, CPU thế hệ mới, RAM DDR4 đảm bảo hiệu suất tối ưu"
    },
    {
      icon: Settings,
      title: "Full Control",
      description: "Full root access, control panel, API access, khả năng tùy biến hoàn toàn"
    },
    {
      icon: Activity,
      title: "99.9% Uptime",
      description: "Cam kết uptime 99.9% với hệ thống backup và disaster recovery chuyên nghiệp"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Hỗ trợ kỹ thuật 24/7 bởi đội ngũ chuyên gia có kinh nghiệm"
    }
  ];

  const getPrice = (plan: any) => {
    return billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly;
  };

  const getPeriodText = () => {
    return billingCycle === "monthly" ? "/tháng" : "/năm";
  };

  const getSavings = (plan: any) => {
    const monthlyTotal = plan.price.monthly * 12;
    const savings = monthlyTotal - plan.price.yearly;
    return Math.round((savings / monthlyTotal) * 100);
  };

  const handleOrderNow = (plan: any) => {
    const params = new URLSearchParams({
      'dich-vu': 'vps',
      'id': plan.name.toLowerCase().replace(/\s+/g, '-')
    })
    router.push(`/thanh-toan?${params.toString()}`)
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Cloud VPS Cao Cấp</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
              Cloud VPS Tốc Độ Cao<br />
              <span className="text-foreground">Mở Rộng Linh Hoạt</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Dịch vụ VPS đám mây với công nghệ ảo hóa KVM, SSD NVMe siêu tốc, 
              bảo mật cao và khả năng mở rộng tức thì. Phù hợp cho mọi nhu cầu từ cá nhân đến doanh nghiệp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Bắt Dầu Ngay
              </Button>
              <Button size="lg" variant="outline">
                Dùng Thử Miễn Phí 7 Ngày
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
              Tại Sao Chọn VPS Của Chúng Tôi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Công nghệ VPS tiên tiến nhất với hiệu suất vượt trội và độ tin cậy cao
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vpsFeatures.map((feature, index) => (
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

      {/* Server Locations */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Địa Điểm Server Toàn Cầu
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chọn địa điểm server gần nhất với khách hàng của bạn để đạt được tốc độ truy cập tối ưu
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {locations.map((location) => (
              <Card 
                key={location.id}
                className={`border-0 shadow-lg cursor-pointer transition-all duration-300 ${
                  selectedLocation === location.id ? 'ring-2 ring-primary' : 'hover:shadow-xl'
                }`}
                onClick={() => setSelectedLocation(location.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">{location.flag}</div>
                  <h3 className="font-semibold mb-1">{location.name}</h3>
                  <p className="text-sm text-muted-foreground">Ping: {location.ping}</p>
                  {selectedLocation === location.id && (
                    <Badge className="mt-2">Đã chọn</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Bảng Giá Cloud VPS
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Chọn gói VPS phù hợp với nhu cầu của bạn
            </p>
            
            {/* Billing Cycle Toggle */}
            <div className="inline-flex items-center bg-background rounded-lg p-1 border">
              <Button
                variant={billingCycle === "monthly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setBillingCycle("monthly")}
                className="text-sm"
              >
                Trả theo tháng
              </Button>
              <Button
                variant={billingCycle === "yearly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setBillingCycle("yearly")}
                className="text-sm"
              >
                Trả theo năm{" "}
                <Badge className="ml-2 bg-green-500 text-white">Tiết kiệm 20%</Badge>
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {vpsPlans.map((plan, index) => (
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
                  
                  {/* Specs */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">CPU:</span>
                      <span className="font-medium">{plan.specs.cpu}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">RAM:</span>
                      <span className="font-medium">{plan.specs.ram}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Storage:</span>
                      <span className="font-medium">{plan.specs.storage}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bandwidth:</span>
                      <span className="font-medium">{plan.specs.bandwidth}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">IP:</span>
                      <span className="font-medium">{plan.specs.ip}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">
                        {getPrice(plan).toLocaleString('vi-VN')}₫
                      </span>
                      <span className="text-muted-foreground ml-1">
                        {getPeriodText()}
                      </span>
                    </div>
                    {billingCycle === "yearly" && (
                      <div className="text-sm text-green-600 mt-1">
                        Tiết kiệm {getSavings(plan)}%
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    {plan.useCases.map((useCase, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground">
                        {useCase}
                      </div>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full mt-4 ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                        : 'variant-outline'
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleOrderNow(plan)}
                  >
                    Đặt Mua Ngay
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Systems */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Hệ Điều Hành Hỗ Trợ
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi hỗ trợ nhiều hệ điều hành phổ biến nhất, sẵn sàng cài đặt chỉ với 1 click
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {operatingSystems.map((os, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{os.icon}</div>
                  <h3 className="font-semibold mb-2">{os.name}</h3>
                  <div className="space-y-1">
                    {os.versions.map((version, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground">
                        {version}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Chọn {os.name}
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
              Chi tiết cấu hình hệ thống VPS của chúng tôi
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Cấu Hình Node
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Processor</div>
                    <div className="font-semibold">Intel Xeon Silver 4210R</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Cores/Node</div>
                    <div className="font-semibold">40 Cores / 80 Threads</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">RAM/Node</div>
                    <div className="font-semibold">256GB DDR4 ECC</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Storage/Node</div>
                    <div className="font-semibold">4TB SSD NVMe</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Network</div>
                    <div className="font-semibold">10Gbps Uplink</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Virtualization</div>
                    <div className="font-semibold">KVM / Linux VPS</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-primary" />
                  Mạng & Bảo Mật
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Network Provider</div>
                    <div className="font-semibold">Viettel, VNPT, FPT</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">DDoS Protection</div>
                    <div className="font-semibold">Arbor Networks, 500Gbps+</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Firewall</div>
                    <div className="font-semibold">Cisco ASA, Fortinet</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Monitoring</div>
                    <div className="font-semibold">Zabbix, Prometheus</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Backup System</div>
                    <div className="font-semibold">Veeam, R1Soft</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Control Panel</div>
                    <div className="font-semibold">Virtualizor, SolusVM</div>
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
              Sẵn Sàng Nâng Cấp Hạ Tầng?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Hơn 5,000 VPS đang hoạt động trên hệ thống của chúng tôi. 
              Tham gia ngay hôm nay và trải nghiệm sức mạnh của Cloud VPS!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Đặt VPS Ngay
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Liên Hệ Tư Vấn
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}