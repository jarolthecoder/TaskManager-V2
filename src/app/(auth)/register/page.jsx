import { Button } from "@/ui/components/Button/Button";
import styles from "../auth.module.css";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <h1>Get Started!</h1>
      <p>Create your account</p>
      <form action="" className={styles.auth_form}>
        <div className={styles.input_group}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
        </div>
        <div className={styles.input_group}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div className={styles.input_group}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className={styles.input_group}>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input type="password" id="confirm_password" />
        </div>
        <Button title="Create account" />
      </form>
      <p>
        Have an account? {" "}
        <Link href="/login">Log in</Link>
      </p>
    </>
  );
}
