import Image from "next/image";
import logoImg from "../../../../public/task-manager-v2-logo.png";
import PropTypes from "prop-types";
import styles from "./Logo.module.css";
import classNames from "classnames";

export const Logo = ({ displayText = true, color = "light", className }) => {
  const logoClasses = classNames(
    styles.main,
    !displayText && styles.flex_center,
    color === "dark" && styles.dark,
    className
  );
  return (
    <div className={logoClasses}>
      <Image
        src={logoImg}
        alt="TaskManager"
        width={40}
        height={40}
        quality={100}
      />
      {displayText && <h1>TaskManager</h1>}
    </div>
  );
};

Logo.propTypes = {
  displayName: PropTypes.bool,
};
