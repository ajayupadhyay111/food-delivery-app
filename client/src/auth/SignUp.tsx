import { useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { userSignUpSchema, type UserSignupState } from "@/schema/userSchema";

const SignUp = () => {
  const [input, setInput] = useState<UserSignupState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });
  const [errors, setErrors] = useState<Partial<UserSignupState>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // form validation check starts using zod
    const result = userSignUpSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<UserSignupState>);
      return;
    }
    // login api implementation
    console.log(input);
  };

  const loading = true;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-200">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
          Create your Food App account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              value={input.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="focus:ring-orange-500 focus:border-orange-500"
            />
            {errors && <span className="text-red-500">{errors.fullname}</span>}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="focus:ring-orange-500 focus:border-orange-500"
            />
            {errors && <span className="text-red-500">{errors.email}</span>}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="focus:ring-orange-500 focus:border-orange-500"
            />
            {errors && <span className="text-red-500">{errors.password}</span>}
          </div>
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact Number
            </label>
            <Input
              id="contact"
              name="contact"
              type="number"
              value={input.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
              required
              className="focus:ring-orange-500 focus:border-orange-500"
            />
            {errors && <span className="text-red-500">{errors.contact}</span>}
          </div>
          {loading ? (
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              Signup
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
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
