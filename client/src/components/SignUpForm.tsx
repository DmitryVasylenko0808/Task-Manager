import React from "react";
import TextField from "./TextField";
import Button from "./Button";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../api/auth/authApi";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signUpSchema = z
  .object({
    login: z.string().min(3, "Login must have at least 3 characters"),
    password: z.string().min(8, "Password must have at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormFields = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const navigate = useNavigate();
  const { authenticate } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(signUpSchema),
  });

  const [triggerSignUp, { isLoading }] = useSignUpMutation();

  const submitHandler = (data: SignUpFormFields) => {
    triggerSignUp(data)
      .unwrap()
      .then((data) => {
        authenticate(data.token);
        navigate("/");
      })
      .catch((err) => alert(err.data.message));
  };

  return (
    <form className="w-full max-w-80" onSubmit={handleSubmit(submitHandler)}>
      <h2 className="mb-7 text-center text-lg font-bold">Sign Up</h2>
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
        <TextField
          {...register("confirmPassword")}
          label="Confirm Password"
          error={errors.confirmPassword?.message}
        />
      </div>
      <p className="mb-7 text-center">
        Have an account?{" "}
        <Link
          to="/auth/sign-in"
          className="font-bold text-tm-primary underline"
        >
          Sign In
        </Link>
      </p>
      <Button size="big" type="submit" disabled={isLoading}>
        {isLoading ? <Loader variant="button" /> : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
