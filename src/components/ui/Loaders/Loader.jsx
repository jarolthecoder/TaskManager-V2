import { PuffLoader } from "react-spinners";
import styles from "./Loaders.module.css";

export const Loader = () => {
  return (
    <div className={styles.container}>
      <PuffLoader width={200} color="#2499EF" />
    </div>
  );
};
