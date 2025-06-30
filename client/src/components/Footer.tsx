const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Food App Logo" className="h-8 w-8" />
          <span className="font-bold text-lg text-orange-600 dark:text-orange-400">FoodApp</span>
        </div>
        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-300">
          <a href="/" className="hover:text-orange-600">Home</a>
          <a href="/menu" className="hover:text-orange-600">Menu</a>
          <a href="/orders" className="hover:text-orange-600">Orders</a>
          <a href="/contact" className="hover:text-orange-600">Contact</a>
        </div>
        {/* Copyright */}
        <div className="text-xs text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} FoodApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;