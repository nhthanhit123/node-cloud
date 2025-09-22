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
import { Separator } from "@/components/ui/separator";
import { CreditCard, Smartphone, QrCode, Building, User, Mail, Phone, MapPin, Shield, Clock, Server, Globe } from "lucide-react";

export default function HostingPaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [billingCycle, setBillingCycle] = useState("yearly");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [domainOption, setDomainOption] = useState("new");
  const [promoCode, setPromoCode] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Vietnam",
    domainName: "",
    existingDomain: ""
  });

  const hostingPlans = {
    starter: { name: "Starter", monthly: 50000, yearly: 500000 },
    professional: { name: "Professional", monthly: 150000, yearly: 1500000 },
    business: { name: "Business", monthly: 300000, yearly: 3000000 },
    enterprise: { name: "Enterprise", monthly: 500000, yearly: 5000000 }
  };

  const domainPrice = 250000; // Domain registration price per year
  const setupFee = 0; // No setup fee

  const calculateTotal = () => {
    const plan = hostingPlans[selectedPlan as keyof typeof hostingPlans];
    const planPrice = billingCycle === "monthly" ? plan.monthly : plan.yearly;
    let total = planPrice;
    
    if (domainOption === "new") {
      total += domainPrice;
    }
    
    total += setupFee;
    
    // Apply promo code discount (10% for demo)
    if (promoCode.toUpperCase() === "TECHHOST10") {
      total = total * 0.9;
    }
    
    return total;
  };

  const getPlanPrice = () => {
    const plan = hostingPlans[selectedPlan as keyof typeof hostingPlans];
    return billingCycle === "monthly" ? plan.monthly : plan.yearly;
  };

  const getBillingText = () => {
    return billingCycle === "monthly" ? "/tháng" : "/năm";
  };

  const bankInfo = {
    bankName: "Ngân hàng TMCP Công Thương Việt Nam (Vietcombank)",
    accountNumber: "0011001234567",
    accountName: "CÔNG TY TNHH TECHHOST",
    branch: "Chi nhánh Hà Nội"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Thanh Toán Dịch Vụ Hosting</h1>
              <p className="text-green-100">Hoàn tất đặt hàng dịch vụ hosting của bạn</p>
            </div>
            <Link href="/hosting" className="text-white hover:text-green-200">
              ← Quay lại chọn gói
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plan Selection */}
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Server className="h-5 w-5 text-green-600" />
                  Chọn Gói Dịch Vụ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid grid-cols-2 gap-4">
                  {Object.entries(hostingPlans).map(([key, plan]) => (
                    <div key={key} className="relative">
                      <RadioGroupItem
                        value={key}
                        id={key}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={key}
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-green-200 bg-white p-4 hover:bg-green-50 hover:text-green-800 peer-data-[state=checked]:border-green-600 peer-data-[state=checked]:bg-green-50 [&:has([data-state=checked])]:border-green-600 cursor-pointer"
                      >
                        <div className="mb-2">
                          <div className="font-semibold">{plan.name}</div>
                          <div className="text-sm text-green-600">
                            {plan.monthly.toLocaleString('vi-VN')}₫/tháng
                          </div>
                        </div>
                        {key === "professional" && (
                          <Badge className="absolute -top-2 -right-2 bg-green-600 text-white">Phổ biến</Badge>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex gap-4">
                  <Button
                    variant={billingCycle === "monthly" ? "default" : "outline"}
                    onClick={() => setBillingCycle("monthly")}
                    className="flex-1"
                  >
                    Trả theo tháng
                  </Button>
                  <Button
                    variant={billingCycle === "yearly" ? "default" : "outline"}
                    onClick={() => setBillingCycle("yearly")}
                    className="flex-1"
                  >
                    Trả theo năm{" "}
                    <Badge className="ml-2 bg-green-500 text-white">Tiết kiệm 20%</Badge>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Domain Configuration */}
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Globe className="h-5 w-5 text-green-600" />
                  Cấu Hình Domain
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={domainOption} onValueChange={setDomainOption}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new">Đăng ký domain mới</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="existing" id="existing" />
                    <Label htmlFor="existing">Sử dụng domain có sẵn</Label>
                  </div>
                </RadioGroup>

                {domainOption === "new" && (
                  <div className="space-y-2">
                    <Label htmlFor="domainName">Tên domain bạn muốn đăng ký</Label>
                    <Input
                      id="domainName"
                      placeholder="example.com"
                      value={formData.domainName}
                      onChange={(e) => setFormData({...formData, domainName: e.target.value})}
                      className="border-green-200 focus:border-green-500"
                    />
                    <p className="text-sm text-green-600">
                      Phí đăng ký domain: {domainPrice.toLocaleString('vi-VN')}₫/năm
                    </p>
                  </div>
                )}

                {domainOption === "existing" && (
                  <div className="space-y-2">
                    <Label htmlFor="existingDomain">Domain của bạn</Label>
                    <Input
                      id="existingDomain"
                      placeholder="your-domain.com"
                      value={formData.existingDomain}
                      onChange={(e) => setFormData({...formData, existingDomain: e.target.value})}
                      className="border-green-200 focus:border-green-500"
                    />
                    <p className="text-sm text-green-600">
                      Bạn sẽ nhận hướng dẫn chuyển nameserver sau khi thanh toán
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <User className="h-5 w-5 text-green-600" />
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
                      className="border-green-200 focus:border-green-500"
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
                      className="border-green-200 focus:border-green-500"
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
                      className="border-green-200 focus:border-green-500"
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
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    placeholder="123 Đường ABC, Quận 1"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="border-green-200 focus:border-green-500"
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
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Quốc gia</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  Phương Thức Thanh Toán
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-4 border border-green-200 rounded-lg cursor-pointer hover:bg-green-50">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                        <Building className="h-4 w-4 text-green-600" />
                        Chuyển khoản ngân hàng
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border border-green-200 rounded-lg cursor-pointer hover:bg-green-50">
                      <RadioGroupItem value="momo" id="momo" />
                      <Label htmlFor="momo" className="flex items-center gap-2 cursor-pointer">
                        <Smartphone className="h-4 w-4 text-green-600" />
                        Ví MoMo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border border-green-200 rounded-lg cursor-pointer hover:bg-green-50">
                      <RadioGroupItem value="vnpay" id="vnpay" />
                      <Label htmlFor="vnpay" className="flex items-center gap-2 cursor-pointer">
                        <QrCode className="h-4 w-4 text-green-600" />
                        VNPay QR Code
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === "bank" && (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2 text-green-800">Thông tin tài khoản:</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Ngân hàng:</strong> {bankInfo.bankName}</p>
                        <p><strong>Số tài khoản:</strong> {bankInfo.accountNumber}</p>
                        <p><strong>Chủ tài khoản:</strong> {bankInfo.accountName}</p>
                        <p><strong>Chi nhánh:</strong> {bankInfo.branch}</p>
                      </div>
                      <p className="text-xs text-green-600 mt-2">
                        Nội dung chuyển khoản: HOSTING_{formData.email || "EMAIL"}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-800">Mã Giảm Giá</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Nhập mã giảm giá"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="border-green-200 focus:border-green-500"
                  />
                  <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">Áp dụng</Button>
                </div>
                {promoCode.toUpperCase() === "TECHHOST10" && (
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
                <Link href="/terms" className="text-green-600 hover:underline">
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link href="/privacy" className="text-green-600 hover:underline">
                  Chính sách bảo mật
                </Link>{" "}
                của TechHost
              </Label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 border-green-200 shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-800">Tóm Tắt Đơn Hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Gói hosting:</span>
                    <span className="font-semibold text-green-600">
                      {hostingPlans[selectedPlan as keyof typeof hostingPlans].name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thời hạn:</span>
                    <span>{billingCycle === "monthly" ? "1 tháng" : "1 năm"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giá gói:</span>
                    <span className="text-green-600">
                      {getPlanPrice().toLocaleString('vi-VN')}₫{getBillingText()}
                    </span>
                  </div>
                  
                  {domainOption === "new" && (
                    <div className="flex justify-between">
                      <span>Đăng ký domain:</span>
                      <span>{domainPrice.toLocaleString('vi-VN')}₫/năm</span>
                    </div>
                  )}
                  
                  {setupFee > 0 && (
                    <div className="flex justify-between">
                      <span>Phí thiết lập:</span>
                      <span>{setupFee.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}
                  
                  {promoCode.toUpperCase() === "TECHHOST10" && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span>-10%</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-green-600">
                      {calculateTotal().toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white" 
                  size="lg"
                  disabled={!agreeTerms || isProcessing}
                  onClick={() => {
                    setIsProcessing(true);
                    // Simulate payment processing
                    setTimeout(() => {
                      setIsProcessing(false);
                      alert('Thanh toán thành công! Dịch vụ sẽ được kích hoạt trong vài phút.');
                    }, 3000);
                  }}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang xử lý...</span>
                    </div>
                  ) : (
                    'Xác Nhận Thanh Toán'
                  )}
                </Button>

                <div className="text-xs text-green-600 space-y-1">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-green-600" />
                    <span>Bảo mật thanh toán 100%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-green-600" />
                    <span>Kích hoạt dịch vụ trong 5-30 phút</span>
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