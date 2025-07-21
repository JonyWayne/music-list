import { useEffect } from "react";
import "./App.css";
import { client } from "./shared/api/client";
import { useQuery } from "@tanstack/react-query";
import { Playlists } from "./Playlists";

function App() {
  useEffect(() => {
    client
      .GET("/playlists")
      .then((response) => {
        const data = response?.data?.data;
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const query = useQuery({
    queryKey: ["playlists"],
    queryFn: () => client.GET("/playlists"),
  });

  return (
    <>
      <h2>Hello, Test Pages</h2>
      <Playlists data={query.data?.data?.data} />
    </>
  );
}

export default App;
