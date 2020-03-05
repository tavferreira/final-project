import { useState, useEffect } from "react";

export const useCallback = ({ search }) => {
  const queryCode = new URLSearchParams(search).get("code");
  console.log("useCallback: " + queryCode)
  const [state, setState] = useState({
    data: undefined,
    error: undefined,
    loading: false
  });

  useEffect(() => {
    async function getData(code) {
      try {
        setState(oldState => ({
          ...oldState,
          loading: true
        }));
        const response = await fetch("http://localhost:8080/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code })
        });

        const data = await response.json();

        if (response.status === 200) {
          console.log("200")
          return setState(oldState => ({
            ...oldState,
            loading: false,
            data
          }));
        }
        console.log("Not 200")
        return setState(oldState => ({
          ...oldState,
          loading: false,
          error: data.message
        }));
      } catch (error) {
        console.log("error")
        return setState(oldState => ({
          ...oldState,
          loading: false,
          error: error.toString()
        }));
      }
    }

    if (queryCode) {
      getData(queryCode);
    }
  }, [queryCode]);
  return { ...state };
};
