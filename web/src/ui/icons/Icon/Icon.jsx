import PropTypes from "prop-types";

export const Icon = ({
  width = 20,
  height = 20,
  viewBox = "0 0 20 20",
  fill = "currentColor",
  alt,
  className,
  children,
}) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {alt && <title>{alt}</title>}
    {children}
  </svg>
);

Icon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  fill: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};
