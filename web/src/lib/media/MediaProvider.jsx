import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { MediaContext } from "./context";

export const MediaProvider = ({ media, children }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? (
    children
  ) : (
    <MediaContext.Provider value={media}>{children}</MediaContext.Provider>
  );
};

MediaProvider.propTypes = {
  media: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
