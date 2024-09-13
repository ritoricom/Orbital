import { useCallback, useEffect, useState } from "react";
import { match } from "css-mediaquery";

import { isNonNullable } from "@/utils/equals";
import { useMedia } from "./use-media";

export const useMediaQuery = (query) => {
  const media = useMedia();

  const getMatches = useCallback(
    () =>
      match(query, {
        width: isNonNullable(media) ? media.width : window.screen.width,
      }),
    [media, query]
  );

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    const handleChangeMedia = () => {
      setMatches(getMatches());
    };

    handleChangeMedia();

    matchMedia.addEventListener("change", handleChangeMedia);

    return () => {
      matchMedia.removeEventListener("change", handleChangeMedia);
    };
  }, [getMatches, query]);

  return matches;
};
