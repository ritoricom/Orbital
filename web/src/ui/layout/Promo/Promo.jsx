import NextImage from "next/image";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Promo.module.css";

export const Promo = ({ img, className, children }) => (
  <div className={clsx(styles.promo, className)}>
    <NextImage
      layout="fill"
      alt="promo"
      src={img}
      className={styles.promoImg}
    />
    <div className={styles.promoOverlay}></div>
    <div className={styles.promoContainer}>{children}</div>
  </div>
);

Promo.propTypes = {
  img: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
