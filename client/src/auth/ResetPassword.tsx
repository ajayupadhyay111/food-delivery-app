import { useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

type ResetPasswordState = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const [input, setInput] = useState<ResetPasswordState>({
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (input.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (input.password !== input.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Here you would call your API to reset the password
    setSubmitted(true);
  };

  const loading = true;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-200">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
          Reset Password
        </h2>
        {submitted ? (
          <div className="text-center text-green-600">
            Your password has been reset successfully.
            <br />
            <Link to="/login" className="text-orange-600 hover:underline">
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={input.password}
                onChange={handleChange}
                placeholder="Enter new password"
                required
                className="focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={input.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
                className="focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {loading ? (
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              >
                Reset Password
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

export default ResetPassword;
