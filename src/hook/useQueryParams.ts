import { useLocation } from "react-router-dom";
export const useQueryParams = () => {
  const location = useLocation();
  const getQueryParam = (name: string): string | null => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(name);
  };
  return getQueryParam;
};
