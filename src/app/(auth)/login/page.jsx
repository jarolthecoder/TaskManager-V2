import { Button, AuthFormField } from "@/ui/components";
import styles from "../auth.module.css";
import googleIcon from "../../../../public/google.png";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  return (
    <>
      <h1>Welcome Back!</h1>
      <p>Enter your credentials to continue</p>
      <form action="" className={styles.auth_form}>
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
        <div className={styles.form_btn_container}>
          <Button title="Sign in" />
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
    </>
  );
}
