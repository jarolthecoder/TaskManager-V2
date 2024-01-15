import styles from "./Menu.module.css";

export const Menu = ({ children, open, position }) => {
  if (open) {
    const { top, right } = position;
    const transform = `translate(-${right}px, ${top}px)`;

    return (
      <div
        className={styles.main}
        style={{
          position: "absolute",
          top,
          right,
          transform,
        }}
      >
        <ul>{children}</ul>
      </div>
    );
  }
};
