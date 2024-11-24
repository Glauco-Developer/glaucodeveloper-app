import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation between routes
import { Page } from "../types.ts"; 

function PageList() {
  // useState to store the list of pages fetched from the API
  const [pages, setPages] = useState<Page[]>([]); // The state is an array of Page objects

  // useEffect to handle the side effect of fetching data from the API
  useEffect(() => {
    // Fetch the list of pages from the API
    fetch("http://3.140.254.43:3001/pages")
      .then((response) => {
        // Parse the JSON response from the API
        return response.json();
      })
      .then((data: Page[]) => {
        // Update the state with the fetched pages
        setPages(data);
      })
      .catch((error) => {
        // Handle errors that occur during the fetch process
        console.error("Error fetching pages:", error);
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      {/* Heading for the page list */}
      <h2>Page List</h2>
      <ul>
        {/* Loop through the pages array and render each page as a list item */}
        {pages.map((page) => (
          <li key={page.url}>
            {/* Use Link to enable navigation to the detailed page view */}
            <Link to={`${page.url}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PageList;
