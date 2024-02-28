"use client"

import { useRouter } from "next/navigation";
import { useCheckAuth } from "@/hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./auth.module.css";
import { FirebaseAuth } from "@/firebase/config";
import { PageLoader } from "@/components/shared";
import { ThemeProvider } from "@/context";

export default function AuthLayout({ children }) {

  const router = useRouter();
  const status = useCheckAuth();
  const [user, loading] = useAuthState(FirebaseAuth);

   if (loading) {
     return <PageLoader />;
   }


  if(user) {
    router.push("/dashboard");
    return <PageLoader />;
  }

  //  if (status === "authenticated") router.push("/dashboard");


  return (
    <ThemeProvider>
      <main className={styles.main}>
        <section className={styles.col_left}>
          <div className={styles.form_container}>{children}</div>
        </section>
        <section className={styles.col_right}>
          {/* <div className={styles.title}>
          <h2>Designed for task management</h2>
          <p>
            Boost your productivity, streamline your tasks effortlessly
            and take control of your day with ease!
          </p>
        </div> */}
        </section>
      </main>
    </ThemeProvider>
  );
}
