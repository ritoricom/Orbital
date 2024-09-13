export const getNextPageParamFromPaginated =
  (pageSize) => (lastPage, pages) => {
    const { total } = lastPage;

    const len = pages.reduce((acc, page) => acc + page.items.length, 0);
    const nextPage = len === 0 ? 0 : Math.floor(len / pageSize);

    return total > len ? nextPage : undefined;
  };

export const mergePagesFromPaginated = (pages) =>
  pages.reduce((acc, paginatedRooms) => [...acc, ...paginatedRooms.items], []);
