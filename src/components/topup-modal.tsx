"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Smartphone, 
  QrCode, 
  Building, 
  Copy, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Wallet, 
  Gift,
  ArrowRight,
  ArrowLeft,
  Shield,
  Zap,
  Lock,
  Banknote,
  SmartphoneNfc,
  CreditCard as CardIcon,
  Building2,
  PiggyBank,
  TrendingUp,
  Star,
  X,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

interface TopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function TopupModal({ isOpen, onClose, onSuccess }: TopupModalProps) {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [selectedBank, setSelectedBank] = useState("vietcombank");
  const [copied, setCopied] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [
    { amount: 100000, bonus: 0, popular: false },
    { amount: 200000, bonus: 0, popular: false },
    { amount: 500000, bonus: 50000, popular: true },
    { amount: 1000000, bonus: 100000, popular: false },
    { amount: 2000000, bonus: 250000, popular: true },
    { amount: 5000000, bonus: 750000, popular: false }
  ];

  const banks = [
    {
      id: "vietcombank",
      name: "Vietcombank",
      accountNumber: "0011001234567",
      accountName: "CÔNG TY TNHH TECHHOST",
      branch: "Chi nhánh Hà Nội",
      color: "bg-blue-600"
    },
    {
      id: "techcombank",
      name: "Techcombank",
      accountNumber: "19012345678901",
      accountName: "CÔNG TY TNHH TECHHOST",
      branch: "Chi nhánh Hồ Chí Minh",
      color: "bg-green-600"
    },
    {
      id: "vietinbank",
      name: "VietinBank",
      accountNumber: "1234567890123",
      accountName: "CÔNG TY TNHH TECHHOST",
      branch: "Chi nhánh Đà Nẵng",
      color: "bg-red-600"
    },
    {
      id: "bidv",
      name: "BIDV",
      accountNumber: "9876543210987",
      accountName: "CÔNG TY TNHH TECHHOST",
      branch: "Chi nhánh Cần Thơ",
      color: "bg-yellow-600"
    }
  ];

  const ewallets = [
    { id: "momo", name: "MoMo", icon: "📱", color: "bg-pink-500", min: 10000, max: 50000000 },
    { id: "vnpay", name: "VNPay", icon: "💳", color: "bg-blue-500", min: 10000, max: 100000000 },
    { id: "zalopay", name: "ZaloPay", icon: "📱", color: "bg-blue-400", min: 10000, max: 20000000 }
  ];

  const getSelectedBank = () => {
    return banks.find(bank => bank.id === selectedBank);
  };

  const getBonusAmount = (amount: number) => {
    const preset = presetAmounts.find(p => p.amount === amount);
    return preset ? preset.bonus : 0;
  };

  const getTotalAmount = () => {
    const amount = selectedAmount === "custom" ? parseInt(customAmount) || 0 : parseInt(selectedAmount) || 0;
    const bonus = getBonusAmount(amount);
    return amount + bonus;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const nextStep = () => {
    if (currentStep === 1 && !selectedAmount) {
      toast.error("Vui lòng chọn số tiền nạp");
      return;
    }
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Nạp tiền thành công!");
      onSuccess?.();
      onClose();
      // Reset form
      setCurrentStep(1);
      setSelectedAmount("");
      setCustomAmount("");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    { id: 1, title: "Chọn số tiền", icon: Banknote },
    { id: 2, title: "Thanh toán", icon: CreditCard },
    { id: 3, title: "Hoàn tất", icon: CheckCircle }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Nạp Tiền Tài Khoản</h2>
              <p className="text-emerald-100">Nạp tiền nhanh chóng và an toàn</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white px-6 py-4 border-b">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'pr-8' : ''}`}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.id 
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' 
                      : 'border-slate-300 text-slate-400 bg-white'
                  }`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className={`mt-1 text-xs font-medium ${
                    currentStep >= step.id ? 'text-slate-900' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ${
                    currentStep > step.id ? 'bg-emerald-500' : 'bg-slate-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Amount Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Chọn số tiền nạp</h3>
                    
                    {/* Quick Amount Selection */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {presetAmounts.map((item) => (
                        <button
                          key={item.amount}
                          onClick={() => {
                            setSelectedAmount(item.amount.toString());
                            setCustomAmount("");
                          }}
                          className={`relative group p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                            selectedAmount === item.amount.toString()
                              ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          {item.popular && (
                            <Badge className="absolute -top-2 -right-2 bg-emerald-500 hover:bg-emerald-600 text-xs">
                              Phổ biến
                            </Badge>
                          )}
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-900">
                              {(item.amount / 1000).toFixed(0)}K
                            </div>
                            <div className="text-xs text-slate-500">
                              {item.amount.toLocaleString('vi-VN')}₫
                            </div>
                            {item.bonus > 0 && (
                              <div className="mt-1 text-xs text-emerald-600 font-medium">
                                +{(item.bonus / 1000).toFixed(0)}K
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="custom" id="custom" checked={selectedAmount === "custom"} />
                        <Label htmlFor="custom" className="font-medium text-slate-700">
                          Nhập số tiền khác
                        </Label>
                      </div>
                      {selectedAmount === "custom" && (
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="Nhập số tiền"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            min="10000"
                            max="100000000"
                            className="pl-4 pr-16 h-11 text-lg border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
                            ₫
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Promotion Banner */}
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Gift className="h-5 w-5" />
                        <h4 className="font-semibold">Khuyến Mãi Đặc Biệt</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          <span>Nạp 500K → Tặng 50K</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          <span>Nạp 2TR → Tặng 250K</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          <span>Nạp 5TR → Tặng 750K</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          <span>Áp dụng mọi phương thức</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Phương thức thanh toán</h3>
                    
                    <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="bank" className="flex items-center gap-2 text-xs">
                          <Building2 className="h-4 w-4" />
                          Ngân hàng
                        </TabsTrigger>
                        <TabsTrigger value="ewallet" className="flex items-center gap-2 text-xs">
                          <Smartphone className="h-4 w-4" />
                          Ví điện tử
                        </TabsTrigger>
                        <TabsTrigger value="card" className="flex items-center gap-2 text-xs">
                          <CardIcon className="h-4 w-4" />
                          Thẻ
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="bank" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {banks.map((bank) => (
                            <div
                              key={bank.id}
                              onClick={() => setSelectedBank(bank.id)}
                              className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                                selectedBank === bank.id
                                  ? 'border-emerald-500 bg-emerald-50'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 ${bank.color} rounded flex items-center justify-center text-white text-sm font-bold`}>
                                  {bank.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-slate-900 text-sm">{bank.name}</div>
                                  <div className="text-xs text-slate-500">{bank.branch}</div>
                                </div>
                                <div className={`w-4 h-4 rounded-full border-2 ${
                                  selectedBank === bank.id
                                    ? 'border-emerald-500 bg-emerald-500'
                                    : 'border-slate-300'
                                }`} />
                              </div>
                            </div>
                          ))}
                        </div>

                        {selectedBank && (
                          <Card className="bg-slate-50 border-slate-200">
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-3 text-slate-900 text-sm">Thông tin chuyển khoản</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center">
                                  <span className="text-slate-600">Ngân hàng:</span>
                                  <span className="font-medium">{getSelectedBank()?.name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-slate-600">Số tài khoản:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono font-medium text-xs">{getSelectedBank()?.accountNumber}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyToClipboard(getSelectedBank()?.accountNumber || "", "account")}
                                      className="h-5 w-5 p-0"
                                    >
                                      {copied === "account" ? <CheckCircle className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                                    </Button>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-slate-600">Chủ tài khoản:</span>
                                  <span className="font-medium text-xs">{getSelectedBank()?.accountName}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                  <span className="text-slate-600">Số tiền:</span>
                                  <span className="font-bold text-emerald-600">
                                    {(selectedAmount === "custom" ? parseInt(customAmount) || 0 : parseInt(selectedAmount) || 0).toLocaleString('vi-VN')}₫
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-slate-600">Nội dung:</span>
                                  <span className="font-mono text-emerald-600 text-xs">
                                    NAP {getSelectedBank()?.accountNumber}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>

                      <TabsContent value="ewallet" className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                          {ewallets.map((wallet) => (
                            <div
                              key={wallet.id}
                              className="p-3 rounded-lg border-2 border-slate-200 hover:border-slate-300 bg-white hover:shadow-sm transition-all duration-200 cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 ${wallet.color} rounded-lg flex items-center justify-center text-xl`}>
                                  {wallet.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-slate-900 text-sm">{wallet.name}</div>
                                  <div className="text-xs text-slate-500">
                                    Min: {wallet.min.toLocaleString('vi-VN')}₫ - Max: {wallet.max.toLocaleString('vi-VN')}₫
                                  </div>
                                </div>
                                <Button variant="outline" size="sm" className="text-xs h-8">
                                  Chọn
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="card" className="space-y-4">
                        <Card className="bg-slate-50 border-slate-200">
                          <CardContent className="p-4 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <Label className="text-xs font-medium text-slate-700">Số thẻ</Label>
                                <Input placeholder="1234 5678 9012 3456" className="border-slate-200 h-9 text-sm" />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs font-medium text-slate-700">Hết hạn</Label>
                                <Input placeholder="MM/YY" className="border-slate-200 h-9 text-sm" />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <Label className="text-xs font-medium text-slate-700">CVV</Label>
                                <Input placeholder="123" className="border-slate-200 h-9 text-sm" />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs font-medium text-slate-700">Tên chủ thẻ</Label>
                                <Input placeholder="NGUYEN VAN A" className="border-slate-200 h-9 text-sm" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Xác nhận nạp tiền</h3>
                    
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 mb-4">
                      <div className="text-center mb-3">
                        <div className="text-2xl font-bold text-emerald-600 mb-1">
                          {getTotalAmount().toLocaleString('vi-VN')}₫
                        </div>
                        <div className="text-slate-600 text-sm">Tổng số tiền sẽ nhận</div>
                      </div>
                      <Separator className="my-3" />
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Số tiền nạp:</span>
                          <span className="font-medium">
                            {(selectedAmount === "custom" ? parseInt(customAmount) || 0 : parseInt(selectedAmount) || 0).toLocaleString('vi-VN')}₫
                          </span>
                        </div>
                        {getBonusAmount(selectedAmount === "custom" ? parseInt(customAmount) || 0 : parseInt(selectedAmount) || 0) > 0 && (
                          <div className="flex justify-between text-emerald-600">
                            <span>Khuyến mãi:</span>
                            <span className="font-medium">
                              +{getBonusAmount(selectedAmount === "custom" ? parseInt(customAmount) || 0 : parseInt(selectedAmount) || 0).toLocaleString('vi-VN')}₫
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Phương thức:</span>
                          <span className="font-medium">
                            {paymentMethod === "bank" ? `Chuyển khoản ${getSelectedBank()?.name}` :
                             paymentMethod === "ewallet" ? "Ví điện tử" : "Thẻ tín dụng"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium text-slate-900 text-sm">Bảo mật & Đảm bảo</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-600">
                        <div className="flex items-center gap-1">
                          <Lock className="h-3 w-3 text-emerald-500" />
                          <span>Mã hóa SSL</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-emerald-500" />
                          <span>Xử lý 5 phút</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-emerald-500" />
                          <span>Hỗ trợ 24/7</span>
                        </div>
                      </div>
                    </div>

                    {paymentMethod === "bank" && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="text-xs text-blue-800">
                            Sau khi chuyển khoản, hệ thống sẽ tự động cộng tiền vào tài khoản của bạn trong vòng 5-10 phút.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
                
                {currentStep < 3 ? (
                  <Button
                    onClick={nextStep}
                    disabled={!selectedAmount}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Tiếp tục
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        Xác nhận nạp tiền
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Tóm Tắt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Số tiền nạp:</span>
                      <span className="font-medium">
                        {(selectedAmount === "custom" ? parseInt(customAmount) || 0 : parseInt(selectedAmount) || 0).toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                    
                    {getBonusAmount(selectedAmount === "custom" ? parseInt(customAmount) || 0 : parseInt(selectedAmount) || 0) > 0 && (
                      <div className="flex justify-between items-center text-emerald-600 text-sm">
                        <span>Khuyến mãi:</span>
                        <span className="font-medium">
                          +{getBonusAmount(selectedAmount === "custom" ? parseInt(customAmount) || 0 : parseInt(selectedAmount) || 0).toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center font-bold">
                      <span>Tổng nhận:</span>
                      <span className="text-emerald-600">
                        {getTotalAmount().toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  </div>

                  {selectedAmount && (
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-3 w-3 text-emerald-600" />
                        <span className="font-medium text-emerald-900 text-xs">Tiết kiệm</span>
                      </div>
                      <div className="text-lg font-bold text-emerald-600">
                        {getBonusAmount(selectedAmount === "custom" ? parseInt(customAmount) || 0 : parseInt(selectedAmount) || 0).toLocaleString('vi-VN')}₫
                      </div>
                      <div className="text-xs text-emerald-700">
                        so với nạp không khuyến mãi
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-slate-500 space-y-1">
                    <div>• Tối thiểu: 10,000₫</div>
                    <div>• Tối đa: 100,000,000₫</div>
                    <div>• Phí giao dịch: 0₫</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}