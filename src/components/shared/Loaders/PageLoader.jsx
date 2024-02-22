import { BarLoader } from "react-spinners";
import styles from "./loaders.module.css";

export const PageLoader = () => {
  return (
    <div className={styles.container_full}>
      <BarLoader width={200} color="#2499EF" speedMultiplier={2} />
    </div>
  );
};
