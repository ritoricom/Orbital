import { useState } from "react";

import { useDebounce } from "@/hooks";

export interface UseSearchOptions {
  onChange?: () => void;
}

export interface UseSearchReturn {
  search: string;
  debouncedSearch: string;
  setSearch: (search: string) => void;
  resetSearch: () => void;
}

export const useSearch = (options?: UseSearchOptions) => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500, {
    onChange: options?.onChange,
  });

  const resetSearch = () => {
    setSearch("");
  };

  return { search, debouncedSearch, setSearch, resetSearch };
};
