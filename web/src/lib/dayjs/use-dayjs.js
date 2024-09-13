import { useRouter } from "next/router";

import { dayjs } from "./setup";

export const useDayjs = () => {
  const { locale } = useRouter();

  // TODO: Add "useEffect"
  dayjs.locale(locale);

  return dayjs;
};
