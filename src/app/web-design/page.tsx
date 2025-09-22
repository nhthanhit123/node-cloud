"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Star, Palette, Code, Smartphone, Globe, Zap, Shield, Headphones, Database, Cpu, Activity, Target, Users, Award } from "lucide-react";

export default function WebDesignPage() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState("business");
  const [showPortfolio, setShowPortfolio] = useState("all");

  const webPackages = [
    {
      name: "Basic Website",
      price: 5000000,
      duration: "7-10 ngày",
      popular: false,
      features: [
        "Thiết kế 5-7 trang",
        "Template có sẵn",
        "Responsive design",
        "Basic SEO",
        "Contact form",
        "Google Analytics",
        "1 năm hosting miễn phí",
        "Domain miễn phí 1 năm",
        "Basic support"
      ],
      includes: [
        "Home page",
        "About us",
        "Services/Products",
        "Contact page",
        "Blog/News (nếu có)"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      suitableFor: ["Cá nhân", "Startup", "Doanh nghiệp nhỏ"]
    },
    {
      name: "Business Website",
      price: 12000000,
      duration: "10-15 ngày",
      popular: true,
      features: [
        "Thiết kế 10-15 trang",
        "Custom design",
        "Responsive design",
        "Advanced SEO",
        "Contact form + Database",
        "Google Analytics",
        "Social media integration",
        "1 năm hosting miễn phí",
        "Domain miễn phí 1 năm",
        "Priority support",
        "Content management",
        "Basic animation"
      ],
      includes: [
        "Home page",
        "About us",
        "Services/Products",
        "Contact page",
        "Blog/News system",
        "Gallery/Portfolio",
        "Testimonials",
        "FAQ page"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB"],
      suitableFor: ["Doanh nghiệp vừa", "Công ty", "Thương hiệu"]
    },
    {
      name: "E-commerce Website",
      price: 25000000,
      duration: "15-20 ngày",
      popular: false,
      features: [
        "Thiết kế không giới hạn trang",
        "Custom design",
        "Responsive design",
        "E-commerce SEO",
        "Shopping cart system",
        "Payment integration",
        "Inventory management",
        "Order management",
        "Customer management",
        "1 năm hosting miễn phí",
        "Domain miễn phí 1 năm",
        "24/7 support",
        "Advanced features",
        "Security features"
      ],
      includes: [
        "Home page",
        "Product catalog",
        "Shopping cart",
        "Checkout process",
        "User accounts",
        "Order tracking",
        "Payment gateway",
        "Admin dashboard",
        "Reports & analytics"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB", "Stripe API"],
      suitableFor: ["Shop online", "Cửa hàng", "Thương mại điện tử"]
    },
    {
      name: "Enterprise Solution",
      price: 50000000,
      duration: "20-30 ngày",
      popular: false,
      features: [
        "Thiết kế không giới hạn",
        "Custom design",
        "Responsive design",
        "Enterprise SEO",
        "Advanced systems",
        "Multiple integrations",
        "Custom development",
        "Advanced security",
        "Performance optimization",
        "1 năm hosting miễn phí",
        "Domain miễn phí 1 năm",
        "Dedicated support",
        "Custom features",
        "API development",
        "Maintenance package"
      ],
      includes: [
        "Custom requirements",
        "Advanced systems",
        "Multiple platforms",
        "Integration services",
        "Custom dashboard",
        "Advanced analytics",
        "API development",
        "Security systems",
        "Performance monitoring"
      ],
      technologies: ["Custom Stack", "Cloud Solutions", "Enterprise Frameworks", "Advanced Security"],
      suitableFor: ["Tập đoàn", "Doanh nghiệp lớn", "Hệ thống phức tạp"]
    }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: "Công Ty Cổ Phần ABC",
      category: "business",
      image: "/api/placeholder/400/300",
      description: "Website giới thiệu công ty với thiết kế hiện đại, chuyên nghiệp",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "#"
    },
    {
      id: 2,
      title: "Shop Thời Trang XYZ",
      category: "ecommerce",
      image: "/api/placeholder/400/300",
      description: "Website thương mại điện tử với hệ thống quản lý đơn hàng",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#"
    },
    {
      id: 3,
      title: "Nhà Hàng Fine Dining",
      category: "restaurant",
      image: "/api/placeholder/400/300",
      description: "Website nhà hàng với hệ thống đặt bàn trực tuyến",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP"],
      link: "#"
    },
    {
      id: 4,
      title: "Công Ty Tech Startup",
      category: "business",
      image: "/api/placeholder/400/300",
      description: "Website startup công nghệ với thiết kế sáng tạo",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "#"
    },
    {
      id: 5,
      title: "Cửa Hàng Điện Máy",
      category: "ecommerce",
      image: "/api/placeholder/400/300",
      description: "Website bán lẻ điện máy với inventory management",
      technologies: ["React", "Node.js", "MongoDB", "Payment API"],
      link: "#"
    },
    {
      id: 6,
      title: "Spa & Wellness Center",
      category: "lifestyle",
      image: "/api/placeholder/400/300",
      description: "Website spa với hệ thống đặt lịch trực tuyến",
      technologies: ["HTML5", "CSS3", "JavaScript", "Booking System"],
      link: "#"
    }
  ];

  const designProcess = [
    {
      step: 1,
      title: "Tư Vấn & Phân Tích",
      description: "Lắng nghe yêu cầu, phân tích nhu cầu và đề xuất giải pháp phù hợp",
      icon: Users,
      duration: "1-2 ngày"
    },
    {
      step: 2,
      title: "Thiết Kế Ý Tưởng",
      description: "Phác thảo wireframe, thiết kế UI/UX và lấy feedback từ khách hàng",
      icon: Palette,
      duration: "2-3 ngày"
    },
    {
      step: 3,
      title: "Phát Triển",
      description: "Code website, tích hợp các tính năng và test functionality",
      icon: Code,
      duration: "5-15 ngày"
    },
    {
      step: 4,
      title: "Testing & Optimize",
      description: "Kiểm tra lỗi, tối ưu performance và đảm bảo trải nghiệm người dùng",
      icon: Shield,
      duration: "1-2 ngày"
    },
    {
      step: 5,
      title: "Triển Khai & Bàn Giao",
      description: "Deploy website, training và bàn giao cho khách hàng",
      icon: Globe,
      duration: "1 ngày"
    },
    {
      step: 6,
      title: "Hỗ Trợ & Bảo Trì",
      description: "Hỗ trợ kỹ thuật và bảo trì website sau khi bàn giao",
      icon: Headphones,
      duration: "Liên tục"
    }
  ];

  const additionalServices = [
    { name: "SEO Optimization", price: "5,000,000₫", description: "Tối ưu hóa website cho công cụ tìm kiếm" },
    { name: "Content Writing", price: "500,000₫/bài", description: "Viết nội dung chất lượng cho website" },
    { name: "Logo Design", price: "3,000,000₫", description: "Thiết kế logo chuyên nghiệp" },
    { name: "Brand Identity", price: "10,000,000₫", description: "Xây dựng bộ nhận diện thương hiệu" },
    { name: "Maintenance", price: "1,000,000₫/tháng", description: "Bảo trì và cập nhật website định kỳ" },
    { name: "Hosting Upgrade", price: "Liên hệ", description: "Gói hosting cao cấp hơn" }
  ];

  const filteredPortfolio = showPortfolio === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === showPortfolio);

  const handleOrderNow = (pkg: any) => {
    const params = new URLSearchParams({
      'dich-vu': 'web-design',
      'id': pkg.name.toLowerCase().replace(/\s+/g, '-')
    })
    router.push(`/thanh-toan?${params.toString()}`)
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Dịch Vụ Thiết Kế Website Chuyên Nghiệp</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
              Thiết Kế Website Đẳng Cấp<br />
              <span className="text-foreground">Giúp Doanh Nghiệp Tăng Trưởng</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Chúng tôi cung cấp dịch vụ thiết kế website chuyên nghiệp với công nghệ hiện đại, 
              UI/UX tối ưu và đầy đủ tính năng. Giúp doanh nghiệp của bạn nổi bật trên không gian mạng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Nhận Báo Giá Ngay
              </Button>
              <Button size="lg" variant="outline">
                Xem Portfolio
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
              Tại Sao Chọn Dịch Vụ Của Chúng Tôi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến giải pháp website tốt nhất cho doanh nghiệp của bạn
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Thiết Kế Đẹp Mắt</CardTitle>
                <CardDescription className="text-base">
                  UI/UX hiện đại, responsive trên mọi thiết bị
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Công Nghệ Hiện Đại</CardTitle>
                <CardDescription className="text-base">
                  Sử dụng framework mới nhất, code chuẩn SEO
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Tốc Độ Tối Ưu</CardTitle>
                <CardDescription className="text-base">
                  Tối ưu performance, loading time dưới 3 giây
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Hỗ Trợ 24/7</CardTitle>
                <CardDescription className="text-base">
                  Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Gói Dịch Vụ Thiết Kế Website
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chọn gói phù hợp nhất với nhu cầu và ngân sách của bạn
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {webPackages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                  pkg.popular ? 'border-2 border-primary scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-2">
                      <Star className="w-4 h-4 mr-1" />
                      Phổ Biến Nhất
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                      <div className="text-3xl font-bold text-primary mb-1">
                        {pkg.price.toLocaleString('vi-VN')}₫
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Thời gian: {pkg.duration}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {pkg.suitableFor.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Tính năng chính:</h4>
                    <div className="space-y-1">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Bao gồm:</h4>
                    <div className="space-y-1">
                      {pkg.includes.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Công nghệ:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pkg.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full mt-4 ${
                      pkg.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''
                    }`}
                    variant={pkg.popular ? "default" : "outline"}
                    onClick={() => handleOrderNow(pkg)}
                  >
                    Chọn Gói {pkg.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Quy Trình Thiết Kế Website
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quy trình chuyên nghiệp đảm bảo chất lượng và đúng tiến độ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designProcess.map((process, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <process.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-sm text-primary font-semibold mb-2">
                    Bước {process.step}
                  </div>
                  <CardTitle className="text-xl">{process.title}</CardTitle>
                  <CardDescription className="text-base">
                    {process.description}
                  </CardDescription>
                  <Badge variant="outline" className="mt-2">
                    {process.duration}
                  </Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Dự Án Đã Thực Hiện
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Một số website tiêu biểu chúng tôi đã thiết kế và phát triển
            </p>
            
            <Tabs value={showPortfolio} onValueChange={setShowPortfolio} className="w-fit mx-auto">
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
                <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
                <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item) => (
              <Card key={item.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="h-16 w-16 text-primary/50" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Button variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      Xem Chi Tiết
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Xem Website
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Dịch Vụ Bổ Sung
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Các dịch vụ bổ sung để nâng cao hiệu quả website của bạn
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

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Sẵn Sàng Có Website Chuyên Nghiệp?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Hơn 500 website đã được chúng tôi thiết kế và phát triển. 
              Hãy để chúng tôi giúp bạn xây dựng website ấn tượng và hiệu quả!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Nhận Báo Giá Ngay
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Users className="mr-2 h-4 w-4" />
                Tư Vấn Miễn Phí
              </Button>
            </div>
          </div>
        </div>
      </section>

      </div>
  );
}