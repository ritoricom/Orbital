import { useRouter } from "next/router";
import { useMemo } from "react";

export const useCity = () => {
  const { asPath } = useRouter();

  const city = useMemo(() => {
    switch (true) {
      case asPath.startsWith("/spb"):
        return "spb";
      case asPath.startsWith("/obn"):
        return "obn";
      case asPath.startsWith("/nvz"):
        return "nvz";
      default:
        return null;
    }
  }, [asPath]);

  const isSpb = city === "spb";
  const isObn = city === "obn";
  const isNvz = city === "nvz";

  return { city, isSpb, isObn, isNvz };
};
