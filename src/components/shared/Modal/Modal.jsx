
import { Card, IconButton, RenderWhen } from "..";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

export const Modal = ({
  open = false,
  showHeader = true,
  title,
  onClose,
  children,
}) => {
  return (
    <RenderWhen condition={open}>
      <div className={styles.main}>
        <div className={styles.modal_content}>
          <Card>
            <RenderWhen condition={showHeader}>
              <div className={styles.modal_header}>
                <h2>{title}</h2>
                <IconButton onClick={onClose}>
                  <span className="material-icons">close</span>
                </IconButton>
              </div>
            </RenderWhen>
            {children}
          </Card>
        </div>
      </div>
    </RenderWhen>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  showHeader: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
};