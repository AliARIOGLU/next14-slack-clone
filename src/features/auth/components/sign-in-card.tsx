import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";

interface SignInCardProps {
  setAuthState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setAuthState }: SignInCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <Input
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={false}>
            Continue
          </Button>
          <Separator />
          <div className="flex flex-col gap-y-2.5">
            <Button
              disabled={false}
              variant="outline"
              onClick={() => {}}
              size="lg"
              className="w-full relative"
            >
              <FcGoogle className="absolute size-5 top-2.5 left-2.5" />
              Continue with Google
            </Button>
            <Button
              disabled={false}
              variant="outline"
              onClick={() => {}}
              size="lg"
              className="w-full relative"
            >
              <FaGithub className="absolute size-5 top-2.5 left-2.5" />
              Continue with Github
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => setAuthState("signUp")}
              className="text-sky-700 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
