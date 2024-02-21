import { Logo } from '@/components/shared';
import styles from './AuthFormTitle.module.css'

export const AuthFormTitle = ({title, description}) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </>
  );
}
