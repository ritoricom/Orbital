export const getCurrentDateWithoutTime = (): Date => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return now;
};
