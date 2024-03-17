import styles from './AuthForm.module.css';

export const AuthForm = ({title, lead, children, onSubmit}) => {
  return (
    <section className={styles.main}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lead}>{lead}</p>
      <form onSubmit={onSubmit} className={styles.form}>
        {children}
      </form>
    </section>
  );
}
