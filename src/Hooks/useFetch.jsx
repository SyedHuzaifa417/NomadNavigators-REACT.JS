import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState(initialValue);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const data = await fetchFn();
      setFetchedData(data);
    } catch (error) {
      setError({ message: error.message || "Failed to fetch data." });
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    error,
    fetchedData,
    fetchData,
  };
}
