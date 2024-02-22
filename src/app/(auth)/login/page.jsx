"use client"

import styles from "../auth.module.css";
import googleIcon from "../../../../public/google.png";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/validations/authSchema";
import { AuthFormField, AuthFormTitle } from "@/components/auth";
import { Button } from "@/components/shared";
import { useDispatch } from "react-redux";
import { startGoogleSignIn, startLoginWithEmailAndPassword } from "@/redux/features/auth";
import { mockUserData } from "@/api/mockUserData";

const {email, password} = mockUserData;

export default function Login() {

  const dispatch = useDispatch();

  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit, formState, getValues } = form;
  const { errors } = formState;

  // Login user with email and password
  const onSubmit = (data) => {
    const userCredentials = getValues();
    const {email, password} = userCredentials;
    dispatch(startLoginWithEmailAndPassword(userCredentials));
  }

  // Login user with Google
  const handleGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <>
      <AuthFormTitle
        title="Welcome to TaskManager"
        description="Enter your credentials to continue"
      />
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
          fieldIcon="remove_red_eye"
          register={register}
          errors={errors}
        />
        <div className={styles.form_btn_container}>
          <Button type="submit" label="Sign in" fullWidth />
          <Button
            fullWidth
            label="Sign in with Google"
            onClick={handleGoogleSignIn}
            startIcon={
              <Image
                src={googleIcon}
                alt="Google icon"
                width={25}
                height={25}
                quality={100}
              />
            }
          />
        </div>
      </form>
      <p>
        Don't have an account? <Link href="/register">Sign up</Link>
      </p>
      {/* <DevTool control={form.control} /> */}
    </>
  );
}
