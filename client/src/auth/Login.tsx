import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { userLoginSchema, type UserLoginState } from "@/schema/userSchema";
import { useUserStore } from "@/zustand/useUserStore";

const Login = () => {
  const [input, setInput] = useState<UserLoginState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<UserLoginState>>({});
  const navigate = useNavigate();
  const { login, loading } = useUserStore();
  const ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // form validation check starts using zod
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<UserLoginState>);
      return;
    }
    // login api implementation
    try {
      await login(input);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-200">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
          Sign in to Food App
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={ChangeEventHandler}
              placeholder="Enter your email"
              className="focus:ring-orange-500 focus:border-orange-500"
              required
            />
            {errors && <span className="text-red-500">{errors.email}</span>}
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={ChangeEventHandler}
              placeholder="Enter your password"
              className="focus:ring-orange-500 focus:border-orange-500"
              required
            />
            {errors && <span className="text-red-500">{errors.password}</span>}
            <Link
              to="/forgot-password"
              className="text-orange-500 hover:underline"
            >
              Forgot password
            </Link>
          </div>
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
              Login
            </Button>
          )}
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
