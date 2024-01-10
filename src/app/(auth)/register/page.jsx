"use client"

import { Button, AuthFormField } from "@/ui/components";
import styles from "../auth.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/app/utils/validations/authSchema";
import { DevTool } from "@hookform/devtools";

export default function Register() {

  const form = useForm({
    resolver: yupResolver(registerSchema)
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <>
      <h1>Get Started!</h1>
      <p>Create your account</p>
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
          fieldIcon="visibility_off"
          register={register}
          errors={errors}
        />
        {/* <AuthFormField
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          fieldIcon="visibility_off"
          register={register}
          errors={errors}
        /> */}
        <Button type="submit" title="Create account" />
      </form>
      <p>
        Have an account? <Link href="/login">Log in</Link>
      </p>
      <DevTool control={form.control} />
    </>
  );
}
