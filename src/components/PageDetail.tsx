import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Page } from "../types.ts";

function PageDetail() {
  // Extract the "url" parameter from the route (e.g., /page/home -> url = "home")
  const { url } = useParams<{ url: string }>();

  // State to store the page details fetched from the API
  const [page, setPage] = useState<Page | null>(null);

  // State to store any error message if the fetch fails
  const [error, setError] = useState<string | null>(null);

  // State to indicate whether the data is still loading
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect runs when the component mounts or when the "url" changes
  useEffect(() => {
    if (!url) {
      // If the URL parameter is missing, set an error message
      setError("Page URL is missing.");
      setLoading(false);
      return;
    }

    fetch(`http://3.140.254.43:3001/pages?url=${url}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the response JSON
        return response.json();
      })
      .then((data: Page) => {
        // Set the fetched page data into the state
        setPage(data);
        setLoading(false);
      })
      .catch((err) => {
        // Handle any error that occurs during the fetch process
        setError(`Error fetching page details: ${err.message}`);
        setLoading(false);
      });
  }, [url]); // Dependency array ensures the effect runs when "url" changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!page) {
    return <p>No page details available.</p>;
  }

  // Render the page details once data is successfully fetched
  return (
    <div>
      <h2>{page.title}</h2>
      <img
        src={page.featured_image}
        alt={page.title}
        style={{ maxWidth: "100%" }}
      />
      <p>{page.content}</p>
      <p>
        <strong>Last updated:</strong>{" "}
        {new Date(page.last_updated).toLocaleString()}
      </p>
    </div>
  );
}

export default PageDetail;
