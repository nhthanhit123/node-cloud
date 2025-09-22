"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Star, Server, Shield, Zap, Globe, Headphones, Database, Cpu, Activity, Network, Settings, Thermometer, Wifi } from "lucide-react";

export default function ServerPage() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("hanoi");
  const [contractTerm, setContractTerm] = useState("monthly");

  const serverConfigs = [
    {
      name: "Entry Level Server",
      price: { monthly: 2500000, quarterly: 7000000, yearly: 25000000 },
      popular: false,
      specs: {
        cpu: "Intel Xeon E3-1230 v6",
        cores: "4 Cores / 8 Threads",
        ram: "16GB DDR4 ECC",
        storage: "2x 1TB SATA RAID 1",
        network: "100Mbps Unlimited",
        ip: "1 IPv4 + /64 IPv6"
      },
      features: [
        "Intel Xeon Processor",
        "ECC RAM",
        "Hardware RAID",
        "IPMI/KVM Access",
        "Remote Reboot",
        "Basic DDoS Protection",
        "99.9% Uptime SLA",
        "Replacements Parts",
        "24/7 Monitoring"
      ],
      useCases: ["Small business", "Development server", "Backup server", "Application hosting"]
    },
    {
      name: "Standard Server",
      price: { monthly: 4500000, quarterly: 12500000, yearly: 45000000 },
      popular: true,
      specs: {
        cpu: "Intel Xeon Silver 4210R",
        cores: "10 Cores / 20 Threads",
        ram: "32GB DDR4 ECC",
        storage: "2x 480GB SSD RAID 1",
        network: "1Gbps Unlimited",
        ip: "1 IPv4 + /64 IPv6"
      },
      features: [
        "Intel Xeon Silver Processor",
        "ECC RAM",
        "Hardware RAID",
        "IPMI/KVM Access",
        "Remote Reboot",
        "Advanced DDoS Protection",
        "99.9% Uptime SLA",
        "Replacements Parts",
        "24/7 Monitoring",
        "Hardware Firewall",
        "Load Balancer Option"
      ],
      useCases: ["Medium business", "Database server", "Web hosting", "Virtualization"]
    },
    {
      name: "High Performance Server",
      price: { monthly: 8500000, quarterly: 23500000, yearly: 85000000 },
      popular: false,
      specs: {
        cpu: "Intel Xeon Gold 6248R",
        cores: "24 Cores / 48 Threads",
        ram: "64GB DDR4 ECC",
        storage: "4x 960GB SSD RAID 10",
        network: "1Gbps Unlimited",
        ip: "2 IPv4 + /64 IPv6"
      },
      features: [
        "Intel Xeon Gold Processor",
        "ECC RAM",
        "Hardware RAID",
        "IPMI/KVM Access",
        "Remote Reboot",
        "Premium DDoS Protection",
        "99.95% Uptime SLA",
        "Replacements Parts",
        "24/7 Monitoring",
        "Hardware Firewall",
        "Load Balancer",
        "CDN Integration",
        "Backup Service"
      ],
      useCases: ["Large enterprise", "High traffic sites", "Big data", "Machine learning"]
    },
    {
      name: "Enterprise Server",
      price: { monthly: 15000000, quarterly: 42000000, yearly: 150000000 },
      popular: false,
      specs: {
        cpu: "Dual Intel Xeon Gold 6248R",
        cores: "48 Cores / 96 Threads",
        ram: "128GB DDR4 ECC",
        storage: "8x 1.92TB SSD RAID 10",
        network: "10Gbps Unlimited",
        ip: "4 IPv4 + /64 IPv6"
      },
      features: [
        "Dual Intel Xeon Gold Processor",
        "ECC RAM",
        "Hardware RAID",
        "IPMI/KVM Access",
        "Remote Reboot",
        "Enterprise DDoS Protection",
        "99.99% Uptime SLA",
        "Replacements Parts",
        "24/7 Monitoring",
        "Hardware Firewall",
        "Load Balancer",
        "CDN Integration",
        "Backup Service",
        "Dedicated Support",
        "Custom Configuration"
      ],
      useCases: ["Enterprise applications", "Cloud infrastructure", "High-frequency trading", "Scientific computing"]
    }
  ];

  const datacenterLocations = [
    { id: "hanoi", name: "Hà Nội", flag: "🇻🇳", tier: "Tier 3", cooling: "Precision Cooling", power: "N+1 Redundancy" },
    { id: "hcmc", name: "TP.HCM", flag: "🇻🇳", tier: "Tier 3", cooling: "Precision Cooling", power: "N+1 Redundancy" },
    { id: "danang", name: "Đà Nẵng", flag: "🇻🇳", tier: "Tier 3", cooling: "Precision Cooling", power: "N+1 Redundancy" }
  ];

  const serverFeatures = [
    {
      icon: Server,
      title: "Hardware Chất Lượng Cao",
      description: "Server brand mới từ Dell, HP, Supermicro với components chính hãng, warranty 3 năm"
    },
    {
      icon: Shield,
      title: "Bảo Mật Tối Đa",
      description: "Datacenter an ninh 24/7, biometric access, camera surveillance, bảo mật đa lớp"
    },
    {
      icon: Zap,
      title: "Hiệu Suất Vượt Trội",
      description: "CPU thế hệ mới, SSD NVMe, RAM ECC, network tốc độ cao đảm bảo hiệu suất tối ưu"
    },
    {
      icon: Thermometer,
      title: "Hệ Thống Làm Mát",
      description: "Precision cooling system, temperature control, humidity monitoring 24/7"
    },
    {
      icon: Activity,
      title: "99.9% Uptime",
      description: "Cam kết uptime 99.9% với hệ thống power redundancy, backup generator, UPS"
    },
    {
      icon: Headphones,
      title: "Hỗ Trợ Chuyên Nghiệp",
      description: "Đội ngũ kỹ thuật 24/7, hỗ trợ remote, onsite maintenance, hardware replacement"
    }
  ];

  const additionalServices = [
    { name: "Hardware Firewall", price: "500,000₫/tháng", description: "Cisco ASA firewall protection" },
    { name: "Load Balancer", price: "800,000₫/tháng", description: "F5 BIG-IP load balancing" },
    { name: "Backup Service", price: "300,000₫/tháng", description: "Daily offsite backup" },
    { name: "DDoS Protection", price: "1,000,000₫/tháng", description: "Advanced DDoS mitigation" },
    { name: "Managed Services", price: "2,000,000₫/tháng", description: "Full server management" },
    { name: "CDN Integration", price: "400,000₫/tháng", description: "Global content delivery" }
  ];

  const getPrice = (server: any) => {
    switch (contractTerm) {
      case "quarterly":
        return server.price.quarterly;
      case "yearly":
        return server.price.yearly;
      default:
        return server.price.monthly;
    }
  };

  const getPeriodText = () => {
    switch (contractTerm) {
      case "quarterly":
        return "/3 tháng";
      case "yearly":
        return "/năm";
      default:
        return "/tháng";
    }
  };

  const getSavings = (server: any) => {
    const monthlyTotal = server.price.monthly * 12;
    const yearlyPrice = server.price.yearly;
    const savings = monthlyTotal - yearlyPrice;
    return Math.round((savings / monthlyTotal) * 100);
  };

  const handleOrderNow = (server: any) => {
    const params = new URLSearchParams({
      'dich-vu': 'server',
      'id': server.name.toLowerCase().replace(/\s+/g, '-')
    })
    router.push(`/thanh-toan?${params.toString()}`)
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Máy Chủ Vật Lý Chuyên Nghiệp</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
              Cho Thuê Máy Chủ Vật Lý<br />
              <span className="text-foreground">Hiệu Suất Cao - Bảo Mật Tuyệt Đối</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Dịch vụ cho thuê máy chủ vật lý với hardware chất lượng cao, đặt tại datacenter Tier 3, 
              hỗ trợ 24/7 và cam kết uptime 99.9%. Phù hợp cho doanh nghiệp cần hiệu suất và bảo mật tối đa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Yêu Cầu Báo Giá
              </Button>
              <Button size="lg" variant="outline">
                Xem Datacenter
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
              Ưu Điểm Máy Chủ Vật Lý
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tại sao chọn máy chủ vật lý của chúng tôi
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

      {/* Datacenter Locations */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Địa Điểm Datacenter
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Các datacenter đạt chuẩn Tier 3 tại Việt Nam
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {datacenterLocations.map((location) => (
              <Card 
                key={location.id}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  selectedLocation === location.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedLocation(location.id)}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{location.flag}</div>
                    <h3 className="text-xl font-semibold mb-1">{location.name}</h3>
                    <Badge className="mb-3">{location.tier}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Làm mát:</span>
                      <span>{location.cooling}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nguồn điện:</span>
                      <span>{location.power}</span>
                    </div>
                  </div>
                  {selectedLocation === location.id && (
                    <div className="mt-4 text-center">
                      <Button size="sm" className="w-full">Đã chọn</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Server Configurations */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Cấu Hình Máy Chủ
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Chọn cấu hình phù hợp với nhu cầu của bạn
            </p>
            
            {/* Contract Term Toggle */}
            <div className="inline-flex items-center bg-background rounded-lg p-1 border">
              <Button
                variant={contractTerm === "monthly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setContractTerm("monthly")}
                className="text-sm"
              >
                1 tháng
              </Button>
              <Button
                variant={contractTerm === "quarterly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setContractTerm("quarterly")}
                className="text-sm"
              >
                3 tháng
              </Button>
              <Button
                variant={contractTerm === "yearly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setContractTerm("yearly")}
                className="text-sm"
              >
                1 năm{" "}
                <Badge className="ml-2 bg-green-500 text-white">Tiết kiệm 20%</Badge>
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {serverConfigs.map((server, index) => (
              <Card 
                key={index} 
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                  server.popular ? 'border-2 border-primary' : ''
                }`}
              >
                {server.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-2">
                      <Star className="w-4 h-4 mr-1" />
                      Phổ Biến Nhất
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl">{server.name}</CardTitle>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        {getPrice(server).toLocaleString('vi-VN')}₫
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {getPeriodText()}
                      </div>
                      {contractTerm === "yearly" && (
                        <div className="text-xs text-green-600">
                          Tiết kiệm {getSavings(server)}%
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Technical Specs */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div>
                      <div className="text-xs text-muted-foreground">CPU</div>
                      <div className="text-sm font-medium">{server.specs.cpu}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Cores</div>
                      <div className="text-sm font-medium">{server.specs.cores}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">RAM</div>
                      <div className="text-sm font-medium">{server.specs.ram}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Storage</div>
                      <div className="text-sm font-medium">{server.specs.storage}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Network</div>
                      <div className="text-sm font-medium">{server.specs.network}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">IP Address</div>
                      <div className="text-sm font-medium">{server.specs.ip}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Use Cases:</h4>
                    <div className="flex flex-wrap gap-1">
                      {server.useCases.map((useCase, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {useCase}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <div className="space-y-1">
                      {server.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className={`flex-1 ${
                        server.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''
                      }`}
                      variant={server.popular ? "default" : "outline"}
                      onClick={() => handleOrderNow(server)}
                    >
                      Yêu Cầu Báo Giá
                    </Button>
                    <Button variant="outline" size="icon">
                      <Wifi className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Dịch Vụ Bổ Sung
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Các dịch vụ bổ sung để tối ưu hóa hệ thống của bạn
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {additionalServices.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                  <div className="text-lg font-bold text-primary mb-4">{service.price}</div>
                  <Button variant="outline" size="sm" className="w-full">
                    Thêm Dịch Vụ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Datacenter Specifications */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Tiêu Chuẩn Datacenter
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chi tiết cơ sở vật chất và hạ tầng datacenter
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-primary" />
                  Hệ Thống Làm Mát & Điện
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Làm mát</div>
                    <div className="font-semibold">Precision Air Conditioning</div>
                    <div className="text-sm text-muted-foreground">Nhiệt độ duy trì 22±2°C</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Độ ẩm</div>
                    <div className="font-semibold">45±5% RH</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Nguồn điện</div>
                    <div className="font-semibold">N+1 Redundancy</div>
                    <div className="text-sm text-muted-foreground">2N cho critical systems</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">UPS</div>
                    <div className="font-semibold">15 minutes runtime</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Generator</div>
                    <div className="font-semibold">72 hours fuel capacity</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  An Ninh & Bảo Mật
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">An ninh vật lý</div>
                    <div className="font-semibold">24/7 Security Guards</div>
                    <div className="text-sm text-muted-foreground">Biometric access control</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Camera surveillance</div>
                    <div className="font-semibold">CCTV 24/7 recording</div>
                    <div className="text-sm text-muted-foreground">90 days retention</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Fire protection</div>
                    <div className="font-semibold">VESDA Early Warning</div>
                    <div className="text-sm text-muted-foreground">FM-200 Gas Suppression</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Access control</div>
                    <div className="font-semibold">Multi-factor authentication</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Compliance</div>
                    <div className="font-semibold">ISO 27001, SOC 2 Type II</div>
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
              Hơn 500 máy chủ vật lý đang hoạt động tại các datacenter của chúng tôi. 
              Liên hệ ngay để nhận tư vấn và báo giá chi tiết!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Yêu Cầu Báo Giá Ngay
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Headphones className="mr-2 h-4 w-4" />
                Tư Vấn Kỹ Thuật
              </Button>
            </div>
          </div>
        </div>
      </section>

      </div>
  );
}