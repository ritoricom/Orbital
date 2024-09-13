import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./RoomCardGrid.module.css";

export const RoomCardGrid = ({ className, children }) => (
  <ul className={clsx(styles.roomCardGrid, className)}>{children}</ul>
);

RoomCardGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
