"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/validations/authSchema";
import { AuthForm, AuthFormField } from "@/components/auth";
import { Button } from "@/components/ui";
import { useDispatch } from "react-redux";
import {
  startGoogleSignIn,
  startLoginWithEmailAndPassword,
} from "@/redux/features/auth";
import { mockUserData } from "@/api/mockUserData";
import Link from "next/link";
import Image from "next/image";
import styles from "../auth.module.css";
import googleIcon from "../../../../public/google.png";

const { email, password } = mockUserData;

export default function Login() {
  const dispatch = useDispatch();

  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState, getValues } = form;
  const { errors } = formState;

  // Login user with email and password
  const onSubmit = (data) => {
    const userCredentials = getValues();
    dispatch(startLoginWithEmailAndPassword(userCredentials));
  };

  // Login user with Google
  const handleGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthForm
      title="Signin to your account"
      lead="Welcome back! Enter your details below"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        <div className={styles.or_signin_text}>
          <h5>OR</h5>
        </div>
        <Button
          fullWidth
          label="Signin with Google"
          onClick={handleGoogleSignIn}
          variant="outlined"
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
      <p className={styles.form_footer_text}>
        Don't have an account? <Link href="/register">Sign up</Link>
      </p>
    </AuthForm>
  );
}
