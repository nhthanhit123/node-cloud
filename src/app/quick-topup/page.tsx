"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  CheckCircle, 
  Gift,
  ArrowRight,
  Shield,
  Zap,
  Banknote,
  SmartphoneNfc,
  Building2,
  TrendingUp,
  Star,
  Loader2,
  Copy
} from "lucide-react";
import { toast } from "sonner";

export default function QuickTopupPage() {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [isProcessing, setIsProcessing] = useState(false);

  const quickAmounts = [
    { amount: 100000, bonus: 0, label: "100K" },
    { amount: 200000, bonus: 0, label: "200K" },
    { amount: 500000, bonus: 50000, label: "500K", popular: true },
    { amount: 1000000, bonus: 100000, label: "1M" },
    { amount: 2000000, bonus: 250000, label: "2M", popular: true },
    { amount: 5000000, bonus: 750000, label: "5M" }
  ];

  const paymentMethods = [
    { id: "bank", name: "Chuyển khoản", icon: Building2, color: "text-blue-600" },
    { id: "momo", name: "MoMo", icon: Smartphone, color: "text-pink-600" },
    { id: "vnpay", name: "VNPay", icon: CreditCard, color: "text-blue-500" },
    { id: "zalopay", name: "ZaloPay", icon: Smartphone, color: "text-blue-400" }
  ];

  const getBonusAmount = (amount: number) => {
    const preset = quickAmounts.find(p => p.amount === amount);
    return preset ? preset.bonus : 0;
  };

  const getTotalAmount = () => {
    const amount = selectedAmount === "custom" ? parseInt(customAmount) || 0 : parseInt(selectedAmount) || 0;
    const bonus = getBonusAmount(amount);
    return amount + bonus;
  };

  const handleQuickTopup = async () => {
    if (!selectedAmount) {
      toast.error("Vui lòng chọn số tiền nạp");
      return;
    }

    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Nạp tiền thành công!");
      setSelectedAmount("");
      setCustomAmount("");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-slate-900 mb-1">Nạp Tiền Nhanh</h1>
              <p className="text-slate-600 text-sm">Chọn số tiền và phương thức thanh toán</p>
            </div>
            <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">
              ← Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Main Card */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Amount Selection */}
            <div className="mb-8">
              <Label className="text-sm font-medium text-slate-700 mb-4 block">
                Chọn số tiền nạp
              </Label>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                {quickAmounts.map((item) => (
                  <button
                    key={item.amount}
                    onClick={() => {
                      setSelectedAmount(item.amount.toString());
                      setCustomAmount("");
                    }}
                    className={`relative group p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                      selectedAmount === item.amount.toString()
                        ? 'border-emerald-500 bg-emerald-50 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {item.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-emerald-500 hover:bg-emerald-600 text-xs">
                        Phổ biến
                      </Badge>
                    )}
                    <div className="text-center">
                      <div className="text-xl font-bold text-slate-900 mb-1">
                        {item.label}
                      </div>
                      {item.bonus > 0 && (
                        <div className="text-xs text-emerald-600 font-medium">
                          +{item.bonus.toLocaleString('vi-VN')}₫
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <RadioGroupItem value="custom" id="custom" checked={selectedAmount === "custom"} />
                <Label htmlFor="custom" className="font-medium text-slate-700 text-sm">
                  Nhập số tiền khác
                </Label>
              </div>
              
              {selectedAmount === "custom" && (
                <div className="relative max-w-xs">
                  <Input
                    type="number"
                    placeholder="Nhập số tiền"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    min="10000"
                    max="100000000"
                    className="pl-4 pr-16 h-12 text-lg border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
                    ₫
                  </span>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <Label className="text-sm font-medium text-slate-700 mb-4 block">
                Phương thức thanh toán
              </Label>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="relative">
                    <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                    <Label
                      htmlFor={method.id}
                      className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 hover:border-slate-300 bg-white"
                    >
                      <method.icon className={`h-6 w-6 ${method.color}`} />
                      <span className="font-medium text-slate-900">{method.name}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Summary */}
            {selectedAmount && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">
                    {getTotalAmount().toLocaleString('vi-VN')}₫
                  </div>
                  <div className="text-slate-600 text-sm">Tổng số tiền sẽ nhận</div>
                </div>
                
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
                </div>
              </div>
            )}

            {/* Action Button */}
            <Button
              onClick={handleQuickTopup}
              disabled={!selectedAmount || isProcessing}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-lg font-medium"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  Nạp tiền ngay
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </Button>

            {/* Security Info */}
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-emerald-500" />
                <span>Bảo mật SSL</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-emerald-500" />
                <span>Xử lý nhanh</span>
              </div>
              <div className="flex items-center gap-1">
                <Gift className="h-3 w-3 text-emerald-500" />
                <span>Khuyến mãi hấp dẫn</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promotion Banner */}
        <Card className="mt-6 border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Gift className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Khuyến Mãi Đặc Biệt</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Nạp 500K → Tặng 50K</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Nạp 2TR → Tặng 250K</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Nạp 5TR → Tặng 750K</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}