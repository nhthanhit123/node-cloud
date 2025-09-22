

export default function Footer() {
    return (
      <footer className="bg-gray-700 py-12 lg:py-16">
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
    );
}