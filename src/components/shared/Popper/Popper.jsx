
import { forwardRef } from "react";
import PropTypes from 'prop-types';

export const Popper = forwardRef(({ open, children }, ref) => {
  return <>{open && <div ref={ref}>{children}</div>}</>;
});

Popper.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}