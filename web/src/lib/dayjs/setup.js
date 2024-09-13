import dayjs from "dayjs";

import updateLocale from "dayjs/plugin/updateLocale";

import "dayjs/locale/ru";

dayjs.extend(updateLocale);

dayjs.updateLocale("ru", {
  monthsShort: [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ],
});

export { dayjs };
