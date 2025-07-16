import { CheckCircle2 } from 'lucide-react';

const Success = () => {

  return (
    <div className='flex w-full h-[80vh] justify-center items-center'>

    <div className="max-w-xl mx-auto my-16 bg-white dark:bg-gray-900 rounded-lg shadow p-8 flex flex-col items-center">
      <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
      <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
        Order Placed Successfully!
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
        Thank you for your order. Your food is being prepared and will be delivered soon.
      </p>
      
    </div>
    </div>
  );
};

export default Success;