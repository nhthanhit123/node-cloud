"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Smartphone, QrCode, Building, User, Mail, Phone, MapPin, Shield, Clock, Palette, Code, Globe, Zap, CheckCircle, AlertCircle } from "lucide-react";

export default function WebPaymentPage() {
  const [selectedPackage, setSelectedPackage] = useState("business");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [billingCycle, setBillingCycle] = useState("onetime");
  const [domainOption, setDomainOption] = useState("included");
  const [hostingOption, setHostingOption] = useState("included");
  const [promoCode, setPromoCode] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    country: "Vietnam",
    projectDescription: "",
    referenceWebsites: ""
  });

  const webPackages = {
    basic: { 
      name: "Basic Website", 
      price: 5000000, 
      duration: "7-10 ngày",
      includes: ["Thiết kế 5-7 trang", "Template có sẵn", "Basic SEO", "1 năm hosting", "Domain miễn phí"]
    },
    business: { 
      name: "Business Website", 
      price: 12000000, 
      duration: "10-15 ngày",
      includes: ["Thiết kế 10-15 trang", "Custom design", "Advanced SEO", "1 năm hosting", "Domain miễn phí", "Content management"]
    },
    ecommerce: { 
      name: "E-commerce Website", 
      price: 25000000, 
      duration: "15-20 ngày",
      includes: ["Thiết kế không giới hạn", "Shopping cart", "Payment integration", "1 năm hosting", "Domain miễn phí", "Admin panel"]
    },
    enterprise: { 
      name: "Enterprise Solution", 
      price: 50000000, 
      duration: "20-30 ngày",
      includes: ["Thiết kế tùy chỉnh", "Advanced systems", "Multiple integrations", "1 năm hosting", "Domain miễn phí", "Custom features"]
    }
  };

  const additionalServices = [
    { id: "seo", name: "SEO Optimization", price: 5000000, description: "Tối ưu hóa website cho công cụ tìm kiếm" },
    { id: "content", name: "Content Writing", price: 2000000, description: "Viết nội dung chất lượng (10 bài)" },
    { id: "logo", name: "Logo Design", price: 3000000, description: "Thiết kế logo chuyên nghiệp" },
    { id: "branding", name: "Brand Identity", price: 10000000, description: "Xây dựng bộ nhận diện thương hiệu" },
    { id: "maintenance", name: "Maintenance Package", price: 1000000, description: "Bảo trì website hàng tháng" },
    { id: "analytics", name: "Advanced Analytics", price: 3000000, description: "Cài đặt Google Analytics nâng cao" }
  ];

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const domainPrice = domainOption === "new" ? 250000 : 0;
  const hostingPrice = hostingOption === "upgrade" ? 2000000 : 0;
  const setupFee = 0;

  const calculateTotal = () => {
    let total = webPackages[selectedPackage as keyof typeof webPackages].price;
    
    // Add additional services
    selectedServices.forEach(serviceId => {
      const service = additionalServices.find(s => s.id === serviceId);
      if (service) total += service.price;
    });
    
    // Add domain and hosting costs
    total += domainPrice + hostingPrice + setupFee;
    
    // Apply promo code discount (10% for demo)
    if (promoCode.toUpperCase() === "WEBDESIGN10") {
      total = total * 0.9;
    }
    
    return total;
  };

  const getPackagePrice = () => {
    return webPackages[selectedPackage as keyof typeof webPackages].price;
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const bankInfo = {
    bankName: "Ngân hàng TMCP Công Thương Việt Nam (Vietcombank)",
    accountNumber: "0011001234567",
    accountName: "CÔNG TY TNHH TECHHOST",
    branch: "Chi nhánh Hà Nội"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Thanh Toán Dịch Vụ Thiết Kế Website</h1>
              <p className="text-muted-foreground">Hoàn tất đặt hàng dịch vụ thiết kế website của bạn</p>
            </div>
            <Link href="/web-design" className="text-primary hover:underline">
              ← Quay lại chọn gói
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Chọn Gói Thiết Kế
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage} className="grid grid-cols-2 gap-4">
                  {Object.entries(webPackages).map(([key, pkg]) => (
                    <div key={key} className="relative">
                      <RadioGroupItem
                        value={key}
                        id={key}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={key}
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <div className="mb-2">
                          <div className="font-semibold">{pkg.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {pkg.price.toLocaleString('vi-VN')}₫
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {pkg.duration}
                          </div>
                        </div>
                        {key === "business" && (
                          <Badge className="absolute -top-2 -right-2">Phổ biến</Badge>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Gói {webPackages[selectedPackage as keyof typeof webPackages].name} bao gồm:</h4>
                  <ul className="space-y-1">
                    {webPackages[selectedPackage as keyof typeof webPackages].includes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Additional Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Dịch Vụ Bổ Sung
                </CardTitle>
                <CardDescription>
                  Chọn thêm dịch vụ để nâng cao hiệu quả website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {additionalServices.map((service) => (
                    <div key={service.id} className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={service.id}
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => toggleService(service.id)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={service.id} className="font-medium cursor-pointer">
                            {service.name}
                          </Label>
                          <p className="text-sm text-muted-foreground mb-2">
                            {service.description}
                          </p>
                          <div className="text-primary font-semibold">
                            {service.price.toLocaleString('vi-VN')}₫
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Domain & Hosting */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Domain & Hosting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Domain:</Label>
                  <RadioGroup value={domainOption} onValueChange={setDomainOption}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="included" id="domain-included" />
                      <Label htmlFor="domain-included">Sử dụng domain miễn phí (đã bao gồm trong gói)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="domain-new" />
                      <Label htmlFor="domain-new">Đăng ký domain mới (+250,000₫/năm)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="existing" id="domain-existing" />
                      <Label htmlFor="domain-existing">Sử dụng domain có sẵn</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Hosting:</Label>
                  <RadioGroup value={hostingOption} onValueChange={setHostingOption}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="included" id="hosting-included" />
                      <Label htmlFor="hosting-included">Sử dụng hosting miễn phí (đã bao gồm trong gói)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upgrade" id="hosting-upgrade" />
                      <Label htmlFor="hosting-upgrade">Nâng cấp hosting cao cấp (+2,000,000₫/năm)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Project Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Thông Tin Dự Án
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectDescription">Mô tả dự án *</Label>
                  <textarea
                    id="projectDescription"
                    placeholder="Mô tả chi tiết về website bạn muốn thiết kế..."
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                    className="w-full min-h-[100px] p-3 border rounded-md resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referenceWebsites">Website tham khảo (nếu có)</Label>
                  <Input
                    id="referenceWebsites"
                    placeholder="https://example1.com, https://example2.com"
                    value={formData.referenceWebsites}
                    onChange={(e) => setFormData({...formData, referenceWebsites: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Thông Tin Khách Hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Họ *</Label>
                    <Input
                      id="firstName"
                      placeholder="Nguyễn"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Tên *</Label>
                    <Input
                      id="lastName"
                      placeholder="Văn A"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0901234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Công ty</Label>
                  <Input
                    id="company"
                    placeholder="Tên công ty"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    placeholder="123 Đường ABC, Quận 1"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Thành phố</Label>
                    <Input
                      id="city"
                      placeholder="Hà Nội"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Quốc gia</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Phương Thức Thanh Toán
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                        <Building className="h-4 w-4" />
                        Chuyển khoản ngân hàng
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="momo" id="momo" />
                      <Label htmlFor="momo" className="flex items-center gap-2 cursor-pointer">
                        <Smartphone className="h-4 w-4" />
                        Ví MoMo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="vnpay" id="vnpay" />
                      <Label htmlFor="vnpay" className="flex items-center gap-2 cursor-pointer">
                        <QrCode className="h-4 w-4" />
                        VNPay QR Code
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === "bank" && (
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Thông tin tài khoản:</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Ngân hàng:</strong> {bankInfo.bankName}</p>
                        <p><strong>Số tài khoản:</strong> {bankInfo.accountNumber}</p>
                        <p><strong>Chủ tài khoản:</strong> {bankInfo.accountName}</p>
                        <p><strong>Chi nhánh:</strong> {bankInfo.branch}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Nội dung chuyển khoản: WEBDESIGN_{formData.email || "EMAIL"}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle>Mã Giảm Giá</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Nhập mã giảm giá"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline">Áp dụng</Button>
                </div>
                {promoCode.toUpperCase() === "WEBDESIGN10" && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ Áp dụng thành công: Giảm 10% tổng hóa đơn
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                Tôi đồng ý với{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Chính sách bảo mật
                </Link>{" "}
                của TechHost. Tôi hiểu rằng thời gian hoàn thành dự án có thể thay đổi tùy thuộc vào độ phức tạp.
              </Label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Tóm Tắt Đơn Hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Gói thiết kế:</span>
                    <span className="font-semibold">
                      {webPackages[selectedPackage as keyof typeof webPackages].name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thời gian hoàn thành:</span>
                    <span>{webPackages[selectedPackage as keyof typeof webPackages].duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giá gói:</span>
                    <span>
                      {getPackagePrice().toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                  
                  {selectedServices.length > 0 && (
                    <>
                      <Separator />
                      <div className="font-semibold">Dịch vụ bổ sung:</div>
                      {selectedServices.map(serviceId => {
                        const service = additionalServices.find(s => s.id === serviceId);
                        return service ? (
                          <div key={serviceId} className="flex justify-between text-sm">
                            <span>{service.name}</span>
                            <span>{service.price.toLocaleString('vi-VN')}₫</span>
                          </div>
                        ) : null;
                      })}
                    </>
                  )}
                  
                  {domainPrice > 0 && (
                    <div className="flex justify-between">
                      <span>Đăng ký domain:</span>
                      <span>{domainPrice.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}
                  
                  {hostingPrice > 0 && (
                    <div className="flex justify-between">
                      <span>Nâng cấp hosting:</span>
                      <span>{hostingPrice.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}
                  
                  {setupFee > 0 && (
                    <div className="flex justify-between">
                      <span>Phí thiết lập:</span>
                      <span>{setupFee.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}
                  
                  {promoCode.toUpperCase() === "WEBDESIGN10" && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span>-10%</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-primary">
                      {calculateTotal().toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Lưu ý:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• 50% thanh toán trước khi bắt đầu dự án</li>
                        <li>• 50% còn lại thanh toán khi hoàn thành</li>
                        <li>• Thời gian hoàn thành có thể thay đổi</li>
                        <li>• Bảo hành 12 tháng sau khi bàn giao</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={!agreeTerms || !formData.projectDescription}
                >
                  Xác Nhận Đặt Hàng
                </Button>

                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>Bảo mật thông tin 100%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Bắt đầu dự án trong 24-48 giờ</span>
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