"use client"

import { Button, AuthFormField } from "@/ui/components";
import styles from "../auth.module.css";
import googleIcon from "../../../../public/google.png";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {

  const form = useForm({
    resolver: yupResolver(schema)
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <>
      <h1>Welcome Back!</h1>
      <p>Enter your credentials to continue</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.auth_form}>
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
        <div className={styles.form_btn_container}>
          <Button type="submit" title="Sign in" />
          <Button
            title={
              <>
                Sign in with Google
                <Image
                  src={googleIcon}
                  alt="Google icon"
                  width={25}
                  height={25}
                  quality={100}
                  style={{ marginLeft: "0.5rem" }}
                />
              </>
            }
          />
        </div>
      </form>
      <p>
        Don't have an account? <Link href="/register">Sign up</Link>
      </p>
      <DevTool control={form.control} />
    </>
  );
}
