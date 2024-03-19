"use client";

import { useRouter } from "next/navigation";
import { useCheckAuth } from "@/hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "@/firebase/config";
import { ThemeToggle } from "@/components/shared";
import { Card, Logo, PageLoader } from "@/components/ui";
import styles from "./auth.module.css";

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
      <div className={styles.header}>
        <Logo className={styles.auth_logo} />
        <ThemeToggle />
      </div>
      <Card className={styles.form_card} padding="medium">
        {children}
      </Card>
    </main>
  );
}
