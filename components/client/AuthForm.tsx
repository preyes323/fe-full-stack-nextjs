"use client";

import { register, signin } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
import Link from "next/link";
import Card from "../Card";
import Button from "../Button";
import Input from "../Input";

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "Dont' have an account?",
  header: "Welcome Back",
  subheader: "Enter your credentials to access your account",
  buttonText: "Sign In",
};

const initial = { email: "", password: "", firstName: "", lastName: "" };

export default function AuthForm({ mode }: { mode: "register" | "signin" }) {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "register") {
        await register(formState);
      } else {
        await signin(formState);
      }

      router.replace("/home");
    } catch (e) {
      if (e instanceof Error) {
        setError(`Could not ${mode} - ${e.message}`);
      } else {
        console.error("Unexpected error", e);
        throw e;
      }
    } finally {
      setIsLoading(false);
      setFormState((s) => ({
        ...initial,
        email: formState.email,
        firstName: formState.firstName,
        lastName: formState.lastName,
      }));
    }
  };

  const content = mode === "register" ? registerContent : signinContent;

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className="text-lg text-red-500/50">{error}</p>
          ) : (
            <p className="text-lg text-black/25">{content.subheader}</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          {mode === "register" && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <Input
                  required
                  disabled={isLoading}
                  placeholder="First Name"
                  value={formState.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  required
                  disabled={isLoading}
                  placeholder="Last Name"
                  value={formState.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              disabled={isLoading}
              type="email"
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              disabled={isLoading}
              value={formState.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={{ pathname: content.linkUrl }}
                  className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" disabled={isLoading} intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
