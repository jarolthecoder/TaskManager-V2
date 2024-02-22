"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "@/redux/features/auth";
import { registerSchema } from "@/utils/validations/authSchema";
import { AuthForm, AuthFormField } from "@/components/auth";
import { Button } from "@/components/shared";
import Link from "next/link";
import styles from "../auth.module.css";

export default function Register() {
  const dispatch = useDispatch();

  const form = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { register, handleSubmit, formState, getData } = form;
  const { errors } = formState;

  // Register user with email and password
  const onSubmit = (data) => {
    const values = data;
    const { email, password, fullName } = values;
    dispatch(
      createUserWithEmailAndPassword({ email, password, displayName: fullName })
    );
  };

  return (
    <AuthForm
      title="Create an account"
      lead="Enter your details below"
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <div className={styles.form_btn_container}>
        <Button type="submit" label="Create account" fullWidth />
      </div>
      <p className={styles.form_footer_text}>
        Have an account? <Link href="/login">Sign in</Link>
      </p>
    </AuthForm>
  );
}
