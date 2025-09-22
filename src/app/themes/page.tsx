"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Star, Palette, Download, Eye, Heart, Filter, Search, Smartphone, Globe, ShoppingCart, Zap } from "lucide-react";

export default function ThemesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [showFavorites, setShowFavorites] = useState(false);

  const themes = [
    {
      id: 1,
      name: "Business Pro",
      category: "business",
      price: 1200000,
      originalPrice: 2000000,
      rating: 4.8,
      downloads: 1520,
      isPopular: true,
      isNew: false,
      isOnSale: true,
      description: "Theme chuyên nghiệp cho doanh nghiệp, đầy đủ tính năng",
      features: ["Responsive Design", "SEO Optimized", "Contact Form", "Blog System", "Portfolio"],
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      demoUrl: "#",
      isFavorite: false
    },
    {
      id: 2,
      name: "ShopMaster",
      category: "ecommerce",
      price: 2500000,
      originalPrice: 3500000,
      rating: 4.9,
      downloads: 2340,
      isPopular: true,
      isNew: false,
      isOnSale: true,
      description: "Theme thương mại điện tử đầy đủ tính năng",
      features: ["Shopping Cart", "Payment Gateway", "Inventory", "User Accounts", "Admin Panel"],
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      demoUrl: "#",
      isFavorite: true
    },
    {
      id: 3,
      name: "Creative Portfolio",
      category: "portfolio",
      price: 800000,
      originalPrice: 1200000,
      rating: 4.7,
      downloads: 890,
      isPopular: false,
      isNew: true,
      isOnSale: true,
      description: "Theme portfolio sáng tạo cho designer và freelancer",
      features: ["Gallery", "Project Showcase", "Contact Form", "Blog", "Animation"],
      technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
      demoUrl: "#",
      isFavorite: false
    },
    {
      id: 4,
      name: "Restaurant Deluxe",
      category: "restaurant",
      price: 1500000,
      originalPrice: 2000000,
      rating: 4.6,
      downloads: 650,
      isPopular: false,
      isNew: false,
      isOnSale: true,
      description: "Theme nhà hàng với hệ thống đặt bàn trực tuyến",
      features: ["Menu System", "Reservation", "Gallery", "Reviews", "Location Map"],
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP"],
      demoUrl: "#",
      isFavorite: false
    },
    {
      id: 5,
      name: "News Portal",
      category: "news",
      price: 1800000,
      originalPrice: 2500000,
      rating: 4.8,
      downloads: 1200,
      isPopular: true,
      isNew: false,
      isOnSale: true,
      description: "Theme báo chí, tin tức chuyên nghiệp",
      features: ["Article System", "Categories", "Comments", "Newsletter", "Ads Management"],
      technologies: ["React", "Node.js", "MongoDB"],
      demoUrl: "#",
      isFavorite: true
    },
    {
      id: 6,
      name: "Lifestyle Blog",
      category: "blog",
      price: 600000,
      originalPrice: 1000000,
      rating: 4.5,
      downloads: 980,
      isPopular: false,
      isNew: true,
      isOnSale: true,
      description: "Theme blog cá nhân đẹp mắt, dễ sử dụng",
      features: ["Blog System", "Categories", "Comments", "Social Media", "Newsletter"],
      technologies: ["HTML5", "CSS3", "JavaScript"],
      demoUrl: "#",
      isFavorite: false
    },
    {
      id: 7,
      name: "Real Estate Pro",
      category: "real-estate",
      price: 3000000,
      originalPrice: 4000000,
      rating: 4.9,
      downloads: 450,
      isPopular: false,
      isNew: true,
      isOnSale: true,
      description: "Theme bất động sản đầy đủ tính năng",
      features: ["Property Listings", "Search & Filter", "Agent Profiles", "Contact Forms", "Map Integration"],
      technologies: ["React", "Node.js", "MongoDB", "Google Maps"],
      demoUrl: "#",
      isFavorite: false
    },
    {
      id: 8,
      name: "Education Hub",
      category: "education",
      price: 2000000,
      originalPrice: 2800000,
      rating: 4.7,
      downloads: 780,
      isPopular: false,
      isNew: false,
      isOnSale: true,
      description: "Theme giáo dục, học trực tuyến",
      features: ["Course System", "Student Dashboard", "Payment", "Certificates", "Progress Tracking"],
      technologies: ["React", "Node.js", "MongoDB"],
      demoUrl: "#",
      isFavorite: true
    }
  ];

  const categories = [
    { id: "all", name: "Tất cả", count: themes.length },
    { id: "business", name: "Business", count: themes.filter(t => t.category === "business").length },
    { id: "ecommerce", name: "E-commerce", count: themes.filter(t => t.category === "ecommerce").length },
    { id: "portfolio", name: "Portfolio", count: themes.filter(t => t.category === "portfolio").length },
    { id: "restaurant", name: "Restaurant", count: themes.filter(t => t.category === "restaurant").length },
    { id: "news", name: "News", count: themes.filter(t => t.category === "news").length },
    { id: "blog", name: "Blog", count: themes.filter(t => t.category === "blog").length },
    { id: "real-estate", name: "Bất động sản", count: themes.filter(t => t.category === "real-estate").length },
    { id: "education", name: "Giáo dục", count: themes.filter(t => t.category === "education").length }
  ];

  const filterThemes = () => {
    let filtered = themes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(theme => 
        theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        theme.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(theme => theme.category === selectedCategory);
    }

    // Filter by price
    if (selectedPrice !== "all") {
      filtered = filtered.filter(theme => {
        switch (selectedPrice) {
          case "free":
            return theme.price === 0;
          case "under-1m":
            return theme.price < 1000000;
          case "1m-2m":
            return theme.price >= 1000000 && theme.price <= 2000000;
          case "over-2m":
            return theme.price > 2000000;
          default:
            return true;
        }
      });
    }

    // Filter by favorites
    if (showFavorites) {
      filtered = filtered.filter(theme => theme.isFavorite);
    }

    // Sort themes
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredThemes = filterThemes();

  const toggleFavorite = (themeId: number) => {
    // In a real app, this would update the favorite status in the backend
    console.log(`Toggle favorite for theme ${themeId}`);
  };

  const handleBuyNow = (theme: any) => {
    const params = new URLSearchParams({
      'dich-vu': 'theme',
      'id': theme.name.toLowerCase().replace(/\s+/g, '-')
    })
    router.push(`/thanh-toan?${params.toString()}`)
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Kho Giao Diện Website</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
              Khám Phá 100+ Theme Chất Lượng<br />
              <span className="text-foreground">Cho Mọi Nhu Cầu Website</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Bộ sưu tập theme website đẹp mắt, responsive, đầy đủ tính năng. 
              Tối ưu SEO, dễ tùy chỉnh và hỗ trợ kỹ thuật trọn đời.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Xem Tất Cả Theme
              </Button>
              <Button size="lg" variant="outline">
                Theme Miễn Phí
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Bộ Lọc
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search">Tìm kiếm</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="search"
                      placeholder="Nhập tên theme..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <Label>Danh mục</Label>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-muted transition-colors ${
                          selectedCategory === category.id ? 'bg-primary/10 text-primary' : ''
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <span className="text-sm">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <Label>Khoảng giá</Label>
                  <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khoảng giá" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="free">Miễn phí</SelectItem>
                      <SelectItem value="under-1m">Dưới 1 triệu</SelectItem>
                      <SelectItem value="1m-2m">1 - 2 triệu</SelectItem>
                      <SelectItem value="over-2m">Trên 2 triệu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <Label>Sắp xếp</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sắp xếp theo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Phổ biến nhất</SelectItem>
                      <SelectItem value="rating">Đánh giá cao</SelectItem>
                      <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                      <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
                      <SelectItem value="newest">Mới nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Favorites */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="favorites"
                    checked={showFavorites}
                    onChange={(e) => setShowFavorites(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="favorites" className="text-sm">
                    Chỉ hiển thị yêu thích
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Themes Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedCategory === "all" ? "Tất cả theme" : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-muted-foreground">
                  Tìm thấy {filteredThemes.length} theme
                </p>
              </div>
            </div>

            {/* Themes Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredThemes.map((theme) => (
                <Card key={theme.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  {/* Theme Preview */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe className="h-16 w-16 text-primary/50" />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {theme.isPopular && (
                        <Badge className="bg-orange-500 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Phổ biến
                        </Badge>
                      )}
                      {theme.isNew && (
                        <Badge className="bg-green-500 text-white">Mới</Badge>
                      )}
                      {theme.isOnSale && (
                        <Badge className="bg-red-500 text-white">Giảm giá</Badge>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(theme.id)}
                      className="absolute top-2 right-2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                    >
                      <Heart 
                        className={`h-4 w-4 ${theme.isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                      />
                    </button>

                    {/* Quick Actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={theme.demoUrl}>
                            <Eye className="h-4 w-4 mr-1" />
                            Xem demo
                          </Link>
                        </Button>
                        <Button size="sm">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Mua ngay
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{theme.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {theme.description}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(theme.id)}
                        className="p-1 hover:bg-muted rounded transition-colors"
                      >
                        <Heart 
                          className={`h-4 w-4 ${theme.isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                        />
                      </button>
                    </div>

                    {/* Rating and Downloads */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{theme.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{theme.downloads.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {theme.features.slice(0, 3).map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {theme.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{theme.features.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        {theme.isOnSale && theme.originalPrice > theme.price && (
                          <span className="text-sm text-muted-foreground line-through mr-2">
                            {theme.originalPrice.toLocaleString('vi-VN')}₫
                          </span>
                        )}
                        <span className="text-xl font-bold text-primary">
                          {theme.price === 0 ? "Miễn phí" : `${theme.price.toLocaleString('vi-VN')}₫`}
                        </span>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {theme.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={theme.demoUrl}>
                          <Eye className="h-4 w-4 mr-1" />
                          Demo
                        </Link>
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => handleBuyNow(theme)}>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Mua ngay
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredThemes.length === 0 && (
              <div className="text-center py-12">
                <Palette className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Không tìm thấy theme</h3>
                <p className="text-muted-foreground">
                  Không có theme nào phù hợp với tiêu chí tìm kiếm của bạn.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Tại Sao Chọn Theme Của Chúng Tôi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến những theme chất lượng cao nhất
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Tốc Độ Nhanh</CardTitle>
                <CardDescription className="text-base">
                  Code được tối ưu, loading time dưới 3 giây
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Responsive</CardTitle>
                <CardDescription className="text-base">
                  Hoàn hảo trên mọi thiết bị di động
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">SEO Friendly</CardTitle>
                <CardDescription className="text-base">
                  Tối ưu hóa cho công cụ tìm kiếm
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Dễ Tùy Chỉnh</CardTitle>
                <CardDescription className="text-base">
                  Documentation chi tiết, dễ sử dụng
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Cần Theme Tùy Chỉnh?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Chúng tôi cung cấp dịch vụ thiết kế theme riêng theo yêu cầu. 
              Liên hệ ngay để được tư vấn và nhận báo giá chi tiết!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Yêu Cầu Theme Riêng
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Palette className="mr-2 h-4 w-4" />
                Xem Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      </div>
  );
}