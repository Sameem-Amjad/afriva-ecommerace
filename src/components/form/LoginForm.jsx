"use client";
import React, { use } from "react";
import EmailField from "../fields/EmailField";
import PasswordField from "../fields/PasswordField";
import Link from "next/link";
import CommonButton from "../buttons/CommonButton";
import { useDispatch } from "react-redux";
import { signInUser } from "@/redux/features/auth/authThunk";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DEMO_LOGINS, DEMO_MODE } from "@/utils/demo";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogin = async (e) => {
    e?.preventDefault?.();
    await login(email, password);
  };

  const login = async (loginEmail, loginPassword) => {
    if (!loginEmail || !loginPassword) {
      toast.error("Enter your email and password");
      return;
    }
    setLoading(true);
    try {
      const response = await dispatch(signInUser({ email: loginEmail, password: loginPassword }));
      if (response.error) {
        toast.error(typeof response.payload === "string" ? response.payload : "Couldn't log in");
      } else {
        toast.success("Login successful!");
        localStorage.setItem("buyers", JSON.stringify(response.payload.buyer));
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col mt-5 gap-y-4">
      {DEMO_MODE && (
        <div className="flex flex-col gap-y-2 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-900">
            Demo store: log in as a sample shopper with orders, reviews and a return already on the account, or sign up with any email.
          </p>
          {DEMO_LOGINS.map((l) => (
            <button
              key={l.email}
              type="button"
              disabled={loading}
              onClick={() => login(l.email, l.password)}
              className="rounded-full bg-black py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-60"
            >
              Log in as {l.label}
            </button>
          ))}
        </div>
      )}
      <EmailField
        label="Email"
        name="email"
        placeholder="Enter email"
        email={email}
        setEmail={(e) => setEmail(e.target.value)}
      />

      <PasswordField
        label="Password"
        name="password"
        placeholder="Enter password"
        password={password}
        setPassword={(e) => setPassword(e.target.value)}
      />

      <div className="flex w-full flex-row justify-end">
        <Link
          href="/forget-password"
          className="cursor-pointer text-xs font-medium text-black transition-opacity duration-300 ease-in hover:opacity-75"
        >
          Forgot Password?
        </Link>
      </div>

      <CommonButton
        type="submit"
        label="Log In"
        onClick={handleLogin}
        className="py-3 text-base "
        disabled={loading}
      />

      <div className="flex flex-row justify-center gap-x-2">
        <p className="text-secondaryText">
          Don’t have an account?
          <Link
            href="/signup"
            className="cursor-pointer font-medium transition-opacity duration-300 ease-in hover:opacity-75 ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
