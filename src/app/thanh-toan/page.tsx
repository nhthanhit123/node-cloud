'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  CreditCard, 
  Building2, 
  Wallet, 
  Smartphone, 
  CheckCircle, 
  Clock, 
  Shield,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  ArrowRight,
  ArrowLeft,
  Lock,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface ServiceInfo {
  name: string
  price: number
  description: string
  features: string[]
  type: 'hosting' | 'vps' | 'server' | 'web-design' | 'theme'
}

export default function ThanhToanPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const serviceType = searchParams.get('dich-vu') as ServiceInfo['type'] || 'hosting'
  const serviceId = searchParams.get('id') || '1'

  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('online')
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    notes: '',
    agreeTerms: false
  })

  // Dịch vụ thông tin
  const services = {
    hosting: {
      name: 'Hosting Cao Cấp',
      price: 150000,
      description: 'Hosting tốc độ cao, ổn định với SSD',
      features: ['10GB SSD', '100GB Băng thông', 'SSL miễn phí', 'Hỗ trợ 24/7']
    },
    vps: {
      name: 'VPS Hiệu Năng Cao',
      price: 500000,
      description: 'Máy chủ ảo với tài nguyên riêng',
      features: ['2 CPU Core', '4GB RAM', '80GB SSD', '1TB Băng thông']
    },
    server: {
      name: 'Máy Chủ Vật Lý',
      price: 2500000,
      description: 'Máy chủ vật lý hiệu năng cao',
      features: ['Intel Xeon', '32GB RAM', '2x1TB SSD', '10TB Băng thông']
    },
    'web-design': {
      name: 'Thiết Kế Website',
      price: 8000000,
      description: 'Thiết kế website chuyên nghiệp',
      features: ['UI/UX Design', 'Responsive', 'SEO Optimization', '1 năm hỗ trợ']
    },
    theme: {
      name: 'Giao Diện Premium',
      price: 1200000,
      description: 'Giao diện website đẹp mắt',
      features: ['Premium Design', 'Mobile Ready', 'SEO Friendly', 'Cập nhật trọn đời']
    }
  }

  const currentService = services[serviceType] || services.hosting
  const finalPrice = billingCycle === 'yearly' ? Math.round(currentService.price * 12 * 0.8) : currentService.price

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep === 1 && (!formData.fullName || !formData.email || !formData.phone)) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.agreeTerms) {
      toast.error('Vui lòng đồng ý với điều khoản sử dụng')
      return
    }

    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.')
      router.push('/')
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { id: 1, title: 'Thông tin', icon: User },
    { id: 2, title: 'Thanh toán', icon: CreditCard },
    { id: 3, title: 'Xác nhận', icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-light text-slate-900 mb-2">Thanh Toán Dịch Vụ</h1>
            <p className="text-slate-600">Hoàn tất đăng ký dịch vụ một cách nhanh chóng và an toàn</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                currentStep >= step.id 
                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                  : 'border-slate-300 text-slate-400'
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className={`ml-3 text-sm font-medium ${
                currentStep >= step.id ? 'text-slate-900' : 'text-slate-500'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-emerald-500' : 'bg-slate-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <User className="h-5 w-5 text-emerald-600" />
                    Thông Tin Khách Hàng
                  </CardTitle>
                  <CardDescription>Vui lòng cung cấp thông tin liên hệ của bạn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                        Họ và tên <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          required
                          className="pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                        Số điện thoại <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          className="pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                          placeholder="0901234567"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-medium text-slate-700">
                        Công ty
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                          placeholder="Tên công ty"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-slate-700">
                      Địa chỉ
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="Địa chỉ của bạn"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm font-medium text-slate-700">
                      Ghi chú
                    </Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                      placeholder="Yêu cầu đặc biệt (nếu có)"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CreditCard className="h-5 w-5 text-emerald-600" />
                    Phương Thức Thanh Toán
                  </CardTitle>
                  <CardDescription>Chọn phương thức thanh toán phù hợp với bạn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div className="relative">
                      <RadioGroupItem value="online" id="online" className="peer sr-only" />
                      <Label 
                        htmlFor="online" 
                        className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 hover:border-slate-300"
                      >
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                          <CreditCard className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">Thanh toán trực tuyến</div>
                          <div className="text-sm text-slate-500">Thẻ tín dụng, thẻ ghi nợ, chuyển khoản</div>
                        </div>
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500" />
                      </Label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
                      <Label 
                        htmlFor="bank" 
                        className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 hover:border-slate-300"
                      >
                        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                          <Building2 className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">Chuyển khoản ngân hàng</div>
                          <div className="text-sm text-slate-500">Chuyển khoản trực tiếp qua ngân hàng</div>
                        </div>
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500" />
                      </Label>
                    </div>

                    <div className="relative">
                      <RadioGroupItem value="wallet" id="wallet" className="peer sr-only" />
                      <Label 
                        htmlFor="wallet" 
                        className="flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 hover:border-slate-300"
                      >
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                          <Wallet className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">Ví điện tử</div>
                          <div className="text-sm text-slate-500">MoMo, VNPay, ZaloPay</div>
                        </div>
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500" />
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-4 w-4 text-emerald-600" />
                      <span className="font-medium text-slate-900">Bảo mật & Đảm bảo</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Lock className="h-3 w-3 text-emerald-500" />
                        <span className="text-slate-600">Mã hóa SSL 256-bit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-emerald-500" />
                        <span className="text-slate-600">Hoàn tiền 30 ngày</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-emerald-500" />
                        <span className="text-slate-600">Hỗ trợ 24/7</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    Xác Nhận Đơn Hàng
                  </CardTitle>
                  <CardDescription>Kiểm tra lại thông tin và hoàn tất đặt hàng</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-medium text-slate-900 mb-3">Thông tin dịch vụ</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Dịch vụ:</span>
                        <span className="font-medium">{currentService.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Thời gian:</span>
                        <span className="font-medium">{billingCycle === 'yearly' ? '1 năm' : '1 tháng'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Phương thức thanh toán:</span>
                        <span className="font-medium">
                          {paymentMethod === 'online' ? 'Thanh toán trực tuyến' :
                           paymentMethod === 'bank' ? 'Chuyển khoản ngân hàng' : 'Ví điện tử'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-medium text-slate-900 mb-3">Thông tin khách hàng</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Họ và tên:</span>
                        <span className="font-medium">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Email:</span>
                        <span className="font-medium">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Số điện thoại:</span>
                        <span className="font-medium">{formData.phone}</span>
                      </div>
                      {formData.company && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Công ty:</span>
                          <span className="font-medium">{formData.company}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <Label htmlFor="agreeTerms" className="text-sm text-slate-600">
                      Tôi đồng ý với các điều khoản và điều kiện sử dụng
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
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
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Tiếp tục
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {loading ? 'Đang xử lý...' : 'Hoàn tất đặt hàng'}
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white sticky top-8">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Tóm Tắt Đơn Hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{currentService.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">{currentService.description}</p>
                  </div>

                  <div className="space-y-2">
                    {currentService.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-emerald-500" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Kỳ thanh toán</Label>
                      <RadioGroup
                        value={billingCycle}
                        onValueChange={setBillingCycle}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly" className="text-sm">Tháng</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yearly" id="yearly" />
                          <Label htmlFor="yearly" className="flex items-center gap-1 text-sm">
                            Năm <Badge variant="secondary" className="text-xs">Tiết kiệm 20%</Badge>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Tạm tính:</span>
                      <span className="font-medium">
                        {billingCycle === 'yearly' ? (
                          <>
                            <span className="line-through text-slate-500 text-sm">
                              {(currentService.price * 12).toLocaleString('vi-VN')}₫
                            </span>
                            <span className="ml-2 text-emerald-600">
                              {finalPrice.toLocaleString('vi-VN')}₫
                            </span>
                          </>
                        ) : (
                          `${finalPrice.toLocaleString('vi-VN')}₫`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-emerald-600">
                        {finalPrice.toLocaleString('vi-VN')}₫
                        {billingCycle === 'yearly' && <span className="text-sm font-normal text-slate-500">/năm</span>}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}