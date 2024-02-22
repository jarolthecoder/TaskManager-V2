"use client"

import { useRouter } from "next/navigation";
import { useCheckAuth } from "@/hooks";
import styles from "./auth.module.css";

export default function AuthLayout({ children }) {

  const router = useRouter();
  const status = useCheckAuth();

  if (status === "authenticated") router.push("/dashboard");

  return (
    <main className={styles.main}>
      <section className={styles.col_left}>
        <div className={styles.form_container}>
          {children}
        </div>
      </section>
      <section className={styles.col_right}>
        <div className={styles.title}>
          <h2>Designed for task management</h2>
          <p>
            Boost your productivity, streamline your tasks effortlessly
            and take control of your day with ease!
          </p>
        </div>
      </section>
    </main>
  );
}
