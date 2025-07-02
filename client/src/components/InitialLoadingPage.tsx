import { Loader2 } from "lucide-react";

const InitialLoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-6" />
      <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">Loading...</h2>
      <p className="text-gray-600 dark:text-gray-300">Please wait while we prepare your experience.</p>
    </div>
  );
};

export default InitialLoadingPage;