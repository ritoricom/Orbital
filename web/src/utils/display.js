export const displayPhone = (phone) =>
  `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 5)} ${phone.slice(
    5,
    7
  )} ${phone.slice(7, 10)}`;

export const displayDate = (dayJs, date, format = "DD.MM.YY HH:mm") =>
  dayJs(date).format(format);
