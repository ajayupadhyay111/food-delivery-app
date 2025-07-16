const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>
            Made with ❤️ by{" "}
            <a href="https://github.com/ajayupadhyay111" target="_blank" rel="noopener noreferrer">
              Ajay Upadhyay
            </a>
          </p>
        </div>
        <div className="text-xs text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} FoodApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;