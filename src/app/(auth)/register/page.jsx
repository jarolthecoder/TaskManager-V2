import { Button, AuthFormField } from "@/ui/components";
import styles from "../auth.module.css";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <h1>Get Started!</h1>
      <p>Create your account</p>
      <form action="" className={styles.auth_form}>
        <AuthFormField 
          label="Full Name" 
          type="text" 
          id="fullName" 
          name="fullName" 
        />
        <AuthFormField
          label="Email"
          type="email"
          id="email"
          name="email"
          fieldIcon="alternate_email"
        />
        <AuthFormField
          label="Password"
          type="password"
          id="password"
          name="password"
          fieldIcon="visibility_off"
        />
        <Button title="Create account" />
      </form>
      <p>
        Have an account? <Link href="/login">Log in</Link>
      </p>
    </>
  );
}
