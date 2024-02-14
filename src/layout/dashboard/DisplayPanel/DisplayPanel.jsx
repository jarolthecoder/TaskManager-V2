import { Card } from "@/components/shared";
import styles from "./DisplayPanel.module.css";

export const DisplayPanel = ({ children }) => {
  return (
    <>
      <article className={styles.main}>
        {children}
        {/* <footer className={styles.footer}>
          <Card className={styles.footer_content}>
            <p>2024 &copy; TaskManager</p>
            <p>Designed and Developed by Jarol Riera</p>
          </Card>
        </footer> */}
      </article>
    </>
  );
}
