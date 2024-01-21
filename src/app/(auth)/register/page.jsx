"use client";

import { AuthFormField, AuthFormTitle } from "@/components/auth";
import { Button } from "@/components/shared";
import styles from "../auth.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/utils/validations/authSchema";
import { DevTool } from "@hookform/devtools";

export default function Register() {
  const form = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <AuthFormTitle title="Get Started!" description="Create your account" />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.auth_form}>
        <AuthFormField
          label="Full Name"
          type="text"
          id="fullName"
          name="fullName"
          fieldIcon="person"
          register={register}
          errors={errors}
        />
        <AuthFormField
          label="Email"
          type="email"
          id="email"
          name="email"
          fieldIcon="alternate_email"
          register={register}
          errors={errors}
        />
        <AuthFormField
          label="Password"
          type="password"
          id="password"
          name="password"
          fieldIcon="remove_red_eye"
          register={register}
          errors={errors}
        />
        <Button type="submit" title="Create account" fullWidth />
      </form>
      <p>
        Have an account? <Link href="/login">Log in</Link>
      </p>
      <DevTool control={form.control} />
    </>
  );
}
