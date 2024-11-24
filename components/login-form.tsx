import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login, signup } from "@/app/login/actions";

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm bg-white border border-gray-300 rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-black">Login</CardTitle>
        <CardDescription className="text-gray-600">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>  
          <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-black">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="border border-gray-300 rounded-lg p-3 text-black focus:ring-[#D73F09] focus:border-[#D73F09]"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password" className="text-black">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm text-[#D73F09] underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full bg-[#D73F09] text-white rounded-lg py-3 hover:bg-[#B53008] transition-all duration-200"
                  />
                </div>
                <Button type="submit" formAction={login} className="w-full">
                  Log In
                </Button>
                <Button 
                  type="submit" 
                  formAction={signup} 
                  variant="outline" 
                  className="w-full text-black border-[#D73F09] border-2 rounded-lg py-3 hover:bg-[#D73F09] hover:text-white transition-all duration-200"
                >
                  Sign Up
                </Button>
              </div>
          </form>
      </CardContent>
    </Card>
  )
}
