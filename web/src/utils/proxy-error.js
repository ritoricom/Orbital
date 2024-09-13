export const proxyError = (err) => {
  switch (err.status) {
    case 404:
      return {
        notFound: true,
      };
    case 500:
    default:
      throw err;
  }
};
