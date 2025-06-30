import { useState, type FormEvent, type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would call your API to send reset link
    setSubmitted(true);
  };

  const loading = true;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-200">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
          Forgot Password
        </h2>
        {submitted ? (
          <div className="text-center text-green-600">
            If an account with that email exists, a password reset link has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Enter your email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            {loading ? (
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              Send Reset Link
            </Button>
          ) : (
            <Button
              disabled
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              <Loader2 className="animate-spin size-4" />
            </Button>
          )}
          </form>
        )}
        <p className="mt-6 text-center text-sm text-gray-500">
          <Link to="/login" className="text-orange-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;