import PropTypes from "prop-types";

export const RenderWhen = ({ condition, fallback, children }) => {
  return condition ? children : fallback || null;
};

RenderWhen.propTypes = {
  condition: PropTypes.bool.isRequired,
  fallback: PropTypes.node,
  children: PropTypes.node.isRequired,
};