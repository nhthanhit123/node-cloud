"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Server, Shield, Zap, Globe, Headphones, Database, Monitor, Code, Palette, Box } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-background to-background py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            <div className="space-y-4">
              <Badge className="w-fit bg-green-600 text-white border-green-700">
                🚀 Giải Pháp Máy Chủ Chuyên Nghiệp
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                Giải Pháp Máy Chủ Tốc Độ Cao<br />
                <span className="text-foreground">Giá Rẻ Nhất</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                Cung cấp giải pháp máy chủ tốc độ cao với giá rẻ nhất thị trường, 
                công nghệ tiên tiến, bảo mật tối đa và hỗ trợ 24/7.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Bắt Dùng Thử Miễn Phí
              </Button>
              <Button size="lg" variant="outline">
                Xem Gói Dịch Vụ
              </Button>
              {/* Quick Login Button for Testing */}
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  const { login } = useAuthStore.getState();
                  login({
                    id: "1",
                    email: "test@example.com",
                    name: "Test User",
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                  });
                  router.push("/dashboard");
                }}
              >
                Quick Login (Test)
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Không cần thẻ tín dụng</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Hỗ trợ 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Hoàn tiền trong 30 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">Tính Năng Vượt Trội</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Tại Sao Chọn Chúng Tôi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cung cấp giải pháp hosting toàn diện với công nghệ tiên tiến nhất 
              để đảm bảo website của bạn luôn hoạt động ổn định và nhanh chóng.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Tốc Độ Vượt Trội</CardTitle>
                <CardDescription>
                  SSD NVMe siêu nhanh với công nghệ cache tiên tiến, đảm bảo tốc độ tải trang tối ưu.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Bảo Mật Tối Đa</CardTitle>
                <CardDescription>
                  Firewall mạnh mẽ, SSL miễn phí và backup tự động hàng ngày để bảo vệ dữ liệu của bạn.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Headphones className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Hỗ Trợ 24/7</CardTitle>
                <CardDescription>
                  Đội ngũ kỹ thuật chuyên nghiệp luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Global CDN</CardTitle>
                <CardDescription>
                  Mạng lưới CDN toàn cầu giúp website của bạn tải nhanh chóng từ mọi nơi trên thế giới.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Server className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Server Hiệu Suất Cao</CardTitle>
                <CardDescription>
                  Hạ tầng server hiện đại với Intel Xeon và RAM DDR4 đảm bảo hiệu suất ổn định.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Đảm Bảo Uptime</CardTitle>
                <CardDescription>
                  Cam kết uptime 99.9% với hệ thống monitoring và backup tự động 24/7.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">Dịch Vụ Của Chúng Tôi</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Giải Pháp Toàn Diện Cho Doanh Nghiệp
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Chúng tôi cung cấp đầy đủ các dịch vụ công nghệ từ hosting, VPS, máy chủ vật lý, 
              thiết kế web đến kho giao diện chuyên nghiệp. Nhấn vào từng dịch vụ để xem bảng giá và gói dịch vụ chi tiết.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Hosting Service */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-white" onClick={() => router.push("/hosting")}>
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Database className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Web Hosting</CardTitle>
                <CardDescription>
                  Dịch vụ hosting tốc độ cao với SSD NVMe, hỗ trợ đa dạng ngôn ngữ lập trình và framework.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>SSD NVMe siêu tốc</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>SSL miễn phí</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>Backup tự động</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                  Xem Bảng Giá
                </Button>
              </CardContent>
            </Card>

            {/* VPS Service */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-white" onClick={() => router.push("/vps")}>
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Monitor className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">VPS Server</CardTitle>
                <CardDescription>
                  Máy chủ ảo riêng với tài nguyên độc lập, toàn quyền quản lý và cấu hình theo nhu cầu.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>Root access đầy đủ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>Tài nguyên đảm bảo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>KVM/Hyper-V technology</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                  Xem Bảng Giá
                </Button>
              </CardContent>
            </Card>

            {/* Server Service */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-white" onClick={() => router.push("/server")}>
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Server className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Máy Chủ Vật Lý</CardTitle>
                <CardDescription>
                  Máy chủ vật lý hiệu suất cao đặt tại data center đạt chuẩn quốc tế.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>Hardware cao cấp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>100% tài nguyên riêng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>Hỗ trợ 24/7</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                  Xem Bảng Giá
                </Button>
              </CardContent>
            </Card>

            {/* Web Design Service */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-white" onClick={() => router.push("/web-design")}>
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Palette className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Thiết Kế Website</CardTitle>
                <CardDescription>
                  Dịch vụ thiết kế website chuyên nghiệp, responsive và tối ưu SEO cho mọi doanh nghiệp.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>Thiết kế hiện đại</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>Responsive design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>Tối ưu SEO</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                  Xem Bảng Giá
                </Button>
              </CardContent>
            </Card>

            {/* Themes/Templates Service */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-white" onClick={() => router.push("/themes")}>
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Box className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Kho Giao Diện</CardTitle>
                <CardDescription>
                  Bộ sưu tập hàng ngàn giao diện website đẹp mắt, chuyên nghiệp cho mọi ngành nghề.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>1000+ templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>Đa dạng ngành nghề</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>Dễ dàng tùy chỉnh</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                  Xem Bảng Giá
                </Button>
              </CardContent>
            </Card>

            {/* Custom Development Service */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-white" onClick={() => router.push("/services")}>
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Code className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Phát Triển Tùy Chỉnh</CardTitle>
                <CardDescription>
                  Dịch vụ lập trình và phát triển giải pháp phần mềm theo yêu cầu riêng của khách hàng.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>Team chuyên nghiệp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>Công nghệ mới nhất</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>Hỗ trợ dài hạn</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                  Xem Bảng Giá
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Bảng Giá Dịch Vụ</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Gói Dịch Vụ Phù Hợp Với Mọi Nhu Cầu
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chọn gói dịch vụ phù hợp nhất với nhu cầu của bạn. Nâng cấp hoặc hạ cấp bất cứ lúc nào.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all relative">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="my-6">
                  <span className="text-4xl font-bold">50.000₫</span>
                  <span className="text-muted-foreground">/tháng</span>
                </div>
                <CardDescription>
                  Phù hợp cho website cá nhân và blog nhỏ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">1 Website</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">5GB SSD Storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">50GB Bandwidth</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">1 Email Account</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">SSL Free</span>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Chọn Gói
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-600 shadow-xl hover:shadow-2xl transition-all relative scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-600 text-white">Phổ Biến Nhất</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="my-6">
                  <span className="text-4xl font-bold">150.000₫</span>
                  <span className="text-muted-foreground">/tháng</span>
                </div>
                <CardDescription>
                  Hoàn hảo cho doanh nghiệp vừa và nhỏ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">5 Websites</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">20GB SSD Storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">200GB Bandwidth</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">10 Email Accounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">SSL Free + CDN</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Priority Support</span>
                </div>
                <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white">
                  Chọn Gói
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all relative">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="my-6">
                  <span className="text-4xl font-bold">500.000₫</span>
                  <span className="text-muted-foreground">/tháng</span>
                </div>
                <CardDescription>
                  Dành cho doanh nghiệp lớn và website có traffic cao
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Unlimited Websites</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">100GB SSD Storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Unlimited Bandwidth</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Unlimited Email</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">SSL Wildcard + CDN</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">24/7 Phone Support</span>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Chọn Gói
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Khách Hàng Nói Gì Về Chúng Tôi</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Đánh Giá Từ Khách Hàng
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hàng ngàn khách hàng tin tưởng và sử dụng dịch vụ của chúng tôi.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Dịch vụ hosting tuyệt vời! Tốc độ nhanh, hỗ trợ nhiệt tình. 
                  Tôi đã sử dụng được 2 năm và rất hài lòng."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">NA</span>
                  </div>
                  <div>
                    <p className="font-semibold">Nguyễn Văn A</p>
                    <p className="text-sm text-muted-foreground">CEO Startup</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Giá cả hợp lý, chất lượng vượt trội. Website của tôi luôn ổn định 
                  và tải rất nhanh kể từ khi chuyển sang sử dụng dịch vụ này."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">TL</span>
                  </div>
                  <div>
                    <p className="font-semibold">Trần Thị Lan</p>
                    <p className="text-sm text-muted-foreground">Shop Owner</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Hỗ trợ kỹ thuật 24/7 rất chuyên nghiệp. Mọi vấn đề đều được giải quyết 
                  nhanh chóng. Rất recommend cho mọi người!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">LVM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Lê Văn Minh</p>
                    <p className="text-sm text-muted-foreground">Developer</p>
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
              Sẵn Sàng Để Bắt Đầu?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Tham gia ngay hàng ngàn khách hàng hài lòng và trải nghiệm dịch vụ hosting 
              chất lượng cao nhất. Bắt đầu dùng thử miễn phí 7 ngày ngay hôm nay!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Bắt Dầu Dùng Thử Miễn Phí
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Liên Hệ Tư Vấn
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Về Chúng Tôi</h3>
              <p className="text-sm text-muted-foreground">
                Chúng tôi là nhà cung cấp dịch vụ hosting hàng đầu tại Việt Nam, 
                cam kết mang đến chất lượng dịch vụ tốt nhất cho khách hàng.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Dịch Vụ</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Shared Hosting</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">VPS Hosting</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Dedicated Server</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Domain Registration</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Hỗ Trợ</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Knowledge Base</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tickets</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Live Chat</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Liên Hệ</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: support@hosting.com</li>
                <li>Hotline: 1900 1234</li>
                <li>Address: 123 Đường ABC, Quận 1, TP.HCM</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} NIFY.VN. All rights reserved. | 
              <a href="#" className="hover:text-primary transition-colors"> Privacy Policy</a> | 
              <a href="#" className="hover:text-primary transition-colors"> Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}