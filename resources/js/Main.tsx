import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/Components/ui/card"
import { Alert, AlertDescription } from "@/Components/ui/alert"
import { LockIcon, MailIcon } from 'lucide-react'

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    // Handle login logic here
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                id="email"
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address"
                  }
                })}
                className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button variant="outline" className="w-full">
          Forgot password?
        </Button>
        <Alert>
          <AlertDescription>
            Don't have an account? <a href="#" className="font-medium underline">Sign up</a>
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  );
}
