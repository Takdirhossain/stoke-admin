
import React from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    toast.promise(
      axios.post("http://localhost:8000/api/auth/login", data),
      {
        loading: "Signing in...",
        success: (res) => {
          const { token, data } = res.data;

          // Save auth data
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(data));

          // Redirect based on role
          if (data.role === 1) {
            navigate("/admin/dashboard");
          } else {
            navigate("/dashboard");
          }

          return "Login successful 🎉";
        },
        error: (err) => {
          return err?.response?.data?.error || "Login failed ❌";
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
      <div className="w-full max-w-md space-y-8 p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-lg relative z-10">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email">Client Id or Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="Enter your email or client id"
              {...register("email", { required: "Email or Client ID is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
          <p className="text-sm text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
