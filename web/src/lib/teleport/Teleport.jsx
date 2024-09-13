import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

export const Teleport = ({ children, selector }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
};

Teleport.propTypes = {
  selector: PropTypes.string.isRequired,
  children: PropTypes.node,
};
