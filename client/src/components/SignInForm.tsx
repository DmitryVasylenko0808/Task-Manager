import React from "react";
import TextField from "./TextField";
import Button from "./Button";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../api/auth/authApi";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signInSchema = z.object({
  login: z.string().min(1, "Login is required"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormFields = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const navigate = useNavigate();
  const { authenticate } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFields>({
    resolver: zodResolver(signInSchema),
  });

  const [triggerSignIn, { isLoading }] = useSignInMutation();

  const submitHandler = (data: SignInFormFields) => {
    triggerSignIn(data)
      .unwrap()
      .then((data) => {
        authenticate(data.token);
        navigate("/");
      })
      .catch((err) => alert(err.data.message));
  };

  return (
    <form className="w-full max-w-80" onSubmit={handleSubmit(submitHandler)}>
      <h2 className="mb-7 text-center text-lg font-bold">Sign In</h2>
      <div className="mb-7 flex flex-col gap-3">
        <TextField
          {...register("login")}
          label="Login"
          error={errors.login?.message}
        />
        <TextField
          {...register("password")}
          label="Password"
          error={errors.password?.message}
        />
      </div>
      <p className="mb-7 text-center">
        Don't have an account?{" "}
        <Link
          to="/auth/sign-up"
          className="font-bold text-tm-primary underline"
        >
          Sign Up
        </Link>
      </p>
      <Button variant="primary" size="big" type="submit" disabled={isLoading}>
        {isLoading ? <Loader variant="button" /> : "Sign In"}
      </Button>
    </form>
  );
};

export default SignInForm;
