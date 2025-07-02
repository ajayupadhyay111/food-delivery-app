import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/zustand/useUserStore";
import { Loader2 } from "lucide-react";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { verifyEmail, isVerified, loading } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (code.length !== 6) {
      setError("Please enter a valid 6 digit code.");
      return;
    }
    // Here you would call your API to verify the code
    try {
      await verifyEmail(code);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-200">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
          Verify Your Email
        </h2>

        {isVerified ? (
          <div className="text-center text-green-600">
            Your email is verified successfully.
            <br />
            <Link to="/" className="text-orange-600 hover:underline">
              Go to Home
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-4 text-center">
              Enter the 6 digit code sent to your email
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Verification Code
                </label>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6 digit code"
                  required
                  className="focus:ring-orange-500 focus:border-orange-500 tracking-widest text-center"
                  maxLength={6}
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {loading ? (
                <Button
                  disabled
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  <Loader2 className="animate-spin size-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  Verify Email
                </Button>
              )}
            </form>
            <p className="mt-6 text-center text-sm text-gray-500">
              <Link to="/login" className="text-orange-600 hover:underline">
                Back to Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
