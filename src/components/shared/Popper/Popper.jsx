import { forwardRef } from "react";
import PropTypes from "prop-types";

export const Popper = forwardRef(
  ({ open, onClose, fullWidth = false, children }, ref) => {
    return (
      <>
        {open && (
          <div
            ref={ref}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            onClick={onClose}
            style={{ zIndex: 5, width: fullWidth ? "100%" : "auto" }}
          >
            {children}
          </div>
        )}
      </>
    );
  }
);

Popper.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  fullWidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
