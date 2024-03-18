"use client";

import { useRouter } from "next/navigation";
import { useCheckAuth } from "@/hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseAuth } from "@/firebase/config";
import { ThemeToggle } from "@/components/shared";
import { Card, Logo, PageLoader} from "@/components/ui";
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
      <div className={styles.col_left}>
        <div className={styles.col_header}>
          <Logo className={styles.auth_logo} />
        </div>
        <div className={styles.form_container}>{children}</div>
      </div>

      <div className={styles.col_right}>
        <div className={styles.col_header}>
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}
