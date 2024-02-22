import styles from './AuthForm.module.css';

export const AuthForm = ({title, lead, children, onSubmit}) => {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lead}>{lead}</p>
      <form onSubmit={onSubmit} className={styles.form}>
        {children}
      </form>
    </div>
  );
}
