"use client";

import { useRouter } from "next/navigation";
import { useCheckAuth } from "@/hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./auth.module.css";
import { FirebaseAuth } from "@/firebase/config";
import { Card, Logo, PageLoader, ThemeToggle } from "@/components/shared";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const status = useCheckAuth();
  const [user, loading] = useAuthState(FirebaseAuth);

  if (loading) {
    return <PageLoader />;
  }

  if (user) {
    router.push("/");
    return <PageLoader />;
  }

  //  if (status === "authenticated") router.push("/dashboard");

  return (
    <main className={styles.main}>
      {/* <Logo color={theme === "dark" ? "dark" : "light"} /> */}
      <Card className={styles.form_card} padding="medium">
        <div className={styles.form_container}>
          {children}
        </div>
      </Card>   
    </main>
  );
}
