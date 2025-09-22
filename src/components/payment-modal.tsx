"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  Wallet, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  Lock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    type: 'hosting' | 'vps' | 'server' | 'web-design' | 'theme';
    name: string;
    price: number;
    specs?: any;
    features?: string[];
    duration?: string;
  };
}

export default function PaymentModal({ isOpen, onClose, service }: PaymentModalProps) {
  const [activeTab, setActiveTab] = useState("payment");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [billingCycle, setBillingCycle] = useState("monthly");
  
  // Form states
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    company: ""
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    accountNumber: "",
    accountName: ""
  });

  const [contactInfo, setContactInfo] = useState({
    domain: "",
    adminAccount: "",
    duration: "6",
    requirements: ""
  });

  const getPrice = () => {
    if (billingCycle === "yearly") {
      return Math.round(service.price * 10 * 0.8); // 20% discount for yearly
    }
    return service.price;
  };

  const getPeriodText = () => {
    switch (billingCycle) {
      case "quarterly":
        return "/3 tháng";
      case "yearly":
        return "/năm";
      default:
        return "/tháng";
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Thanh toán thành công",
        description: `Đơn hàng ${service.name} đã được tạo thành công!`,
      });
      onClose();
    }, 2000);
  };

  const handleContact = async () => {
    setIsProcessing(true);
    
    // Simulate contact form submission
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Gửi yêu cầu thành công",
        description: "Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ!",
      });
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {service.type === 'web-design' ? 'Đặt Thiết Kế Website' : 
                 service.type === 'theme' ? 'Mua Giao Diện' : 'Đặt Dịch Vụ'}
              </h2>
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <Badge variant="secondary">
                  {service.type === 'hosting' ? 'Hosting' :
                   service.type === 'vps' ? 'Cloud VPS' :
                   service.type === 'server' ? 'Máy Chủ Vật Lý' :
                   service.type === 'web-design' ? 'Thiết Kế Web' : 'Theme'}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose}>
              ×
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="payment">
                <CreditCard className="h-4 w-4 mr-2" />
                Thanh toán ngay
              </TabsTrigger>
              <TabsTrigger value="contact">
                <Smartphone className="h-4 w-4 mr-2" />
                Liên hệ tư vấn
              </TabsTrigger>
            </TabsList>

            {/* Payment Tab */}
            <TabsContent value="payment" className="space-y-6">
              {/* Service Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Thông tin dịch vụ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Gói dịch vụ</Label>
                      <div className="font-medium">{service.name}</div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Thời gian thuê</Label>
                      <Select value={billingCycle} onValueChange={setBillingCycle}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">1 tháng</SelectItem>
                          <SelectItem value="quarterly">3 tháng</SelectItem>
                          <SelectItem value="yearly">1 năm (Giảm 20%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Đơn giá</Label>
                      <div className="font-medium">{service.price.toLocaleString('vi-VN')}₫{getPeriodText()}</div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Thành tiền</Label>
                      <div className="text-xl font-bold text-primary">
                        {getPrice().toLocaleString('vi-VN')}₫
                      </div>
                    </div>
                  </div>
                  
                  {/* Service Specifications */}
                  {service.specs && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Thông số kỹ thuật:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(service.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Thông tin khách hàng
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Họ và tên *</Label>
                      <Input
                        id="fullName"
                        value={customerInfo.fullName}
                        onChange={(e) => setCustomerInfo({...customerInfo, fullName: e.target.value})}
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        placeholder="0901234567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Công ty</Label>
                      <Input
                        id="company"
                        value={customerInfo.company}
                        onChange={(e) => setCustomerInfo({...customerInfo, company: e.target.value})}
                        placeholder="Tên công ty (nếu có)"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      placeholder="Địa chỉ của bạn"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Phương thức thanh toán
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button
                      variant={paymentMethod === "credit_card" ? "default" : "outline"}
                      className="h-20 flex-col"
                      onClick={() => setPaymentMethod("credit_card")}
                    >
                      <CreditCard className="h-6 w-6 mb-2" />
                      <span className="text-sm">Thẻ tín dụng</span>
                    </Button>
                    <Button
                      variant={paymentMethod === "bank_transfer" ? "default" : "outline"}
                      className="h-20 flex-col"
                      onClick={() => setPaymentMethod("bank_transfer")}
                    >
                      <Building className="h-6 w-6 mb-2" />
                      <span className="text-sm">Chuyển khoản</span>
                    </Button>
                    <Button
                      variant={paymentMethod === "ewallet" ? "default" : "outline"}
                      className="h-20 flex-col"
                      onClick={() => setPaymentMethod("ewallet")}
                    >
                      <Wallet className="h-6 w-6 mb-2" />
                      <span className="text-sm">Ví điện tử</span>
                    </Button>
                  </div>

                  {/* Credit Card Form */}
                  {paymentMethod === "credit_card" && (
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Số thẻ *</Label>
                          <Input
                            id="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Tên trên thẻ *</Label>
                          <Input
                            id="cardName"
                            value={paymentInfo.cardName}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                            placeholder="NGUYEN VAN A"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Ngày hết hạn *</Label>
                          <Input
                            id="expiryDate"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer Form */}
                  {paymentMethod === "bank_transfer" && (
                    <div className="space-y-4 p-4 border rounded-lg">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Vui lòng chuyển khoản đến thông tin tài khoản dưới đây:
                        </AlertDescription>
                      </Alert>
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span>Ngân hàng:</span>
                          <span className="font-medium">Techcombank</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Số tài khoản:</span>
                          <span className="font-medium">1903 1234 5678 9012</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Chủ tài khoản:</span>
                          <span className="font-medium">CONG TY TNHH TECHHOST</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Nội dung:</span>
                          <span className="font-medium">Thanh toan {service.name}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Ngân hàng của bạn</Label>
                        <Input
                          id="bankName"
                          value={bankInfo.bankName}
                          onChange={(e) => setBankInfo({...bankInfo, bankName: e.target.value})}
                          placeholder="Tên ngân hàng"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  onClick={handlePayment}
                  disabled={isProcessing || !customerInfo.fullName || !customerInfo.email || !customerInfo.phone}
                  className="flex-1"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Thanh toán {getPrice().toLocaleString('vi-VN')}₫
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Hủy
                </Button>
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Thông tin liên hệ
                  </CardTitle>
                  <CardDescription>
                    Điền thông tin và chúng tôi sẽ liên hệ tư vấn trong vòng 24 giờ
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Họ và tên *</Label>
                      <Input
                        id="contactName"
                        value={customerInfo.fullName}
                        onChange={(e) => setCustomerInfo({...customerInfo, fullName: e.target.value})}
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Số điện thoại *</Label>
                      <Input
                        id="contactPhone"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        placeholder="0901234567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactCompany">Công ty</Label>
                      <Input
                        id="contactCompany"
                        value={customerInfo.company}
                        onChange={(e) => setCustomerInfo({...customerInfo, company: e.target.value})}
                        placeholder="Tên công ty (nếu có)"
                      />
                    </div>
                  </div>

                  {/* Service Specific Fields */}
                  {(service.type === 'web-design' || service.type === 'theme') && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="domain">Tên miền dự kiến *</Label>
                        <Input
                          id="domain"
                          value={contactInfo.domain}
                          onChange={(e) => setContactInfo({...contactInfo, domain: e.target.value})}
                          placeholder="example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adminAccount">Tài khoản quản trị</Label>
                        <Input
                          id="adminAccount"
                          value={contactInfo.adminAccount}
                          onChange={(e) => setContactInfo({...contactInfo, adminAccount: e.target.value})}
                          placeholder="admin@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Thời gian thuê (tháng)</Label>
                        <Select value={contactInfo.duration} onValueChange={(value) => setContactInfo({...contactInfo, duration: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 tháng</SelectItem>
                            <SelectItem value="6">6 tháng</SelectItem>
                            <SelectItem value="12">12 tháng</SelectItem>
                            <SelectItem value="24">24 tháng</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Yêu cầu cụ thể</Label>
                    <Textarea
                      id="requirements"
                      value={contactInfo.requirements}
                      onChange={(e) => setContactInfo({...contactInfo, requirements: e.target.value})}
                      placeholder="Mô tả chi tiết yêu cầu của bạn..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Service Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin dịch vụ quan tâm</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Dịch vụ:</span>
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loại:</span>
                      <span className="font-medium">
                        {service.type === 'hosting' ? 'Hosting' :
                         service.type === 'vps' ? 'Cloud VPS' :
                         service.type === 'server' ? 'Máy Chủ Vật Lý' :
                         service.type === 'web-design' ? 'Thiết Kế Web' : 'Theme'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Giá tham khảo:</span>
                      <span className="font-medium text-primary">
                        {service.price.toLocaleString('vi-VN')}₫/tháng
                      </span>
                    </div>
                    {service.duration && (
                      <div className="flex justify-between">
                        <span>Thời gian thực hiện:</span>
                        <span className="font-medium">{service.duration}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  onClick={handleContact}
                  disabled={isProcessing || !customerInfo.fullName || !customerInfo.email || !customerInfo.phone}
                  className="flex-1"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Smartphone className="h-4 w-4 mr-2" />
                      Gửi yêu cầu tư vấn
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Hủy
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-muted/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Thông tin của bạn được bảo mật và mã hóa</span>
          </div>
        </div>
      </div>
    </div>
  );
}