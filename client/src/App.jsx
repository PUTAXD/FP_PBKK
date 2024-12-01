import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/categories")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((category) => (
            <li key={category.Id}>{category.Name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
