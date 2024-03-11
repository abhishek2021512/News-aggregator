import React, { useState, useEffect } from "react";
import NewsContainer from "./NewsContainer";
import axios from "axios";

const NewsMain = () => {
  // Set a default query (e.g., top headlines for a specific country)
  const [defaultQuery, setDefaultQuery] = useState("in"); // Replace with your desired default query

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(1);

  const apiKey = "827d995de2164005bee10a728d2cf843"; // Replace with your actual News API key

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let url;
        if (query) { // Use query if available
          url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        } else { // Use default query for initial render
          url = `https://newsapi.org/v2/top-headlines?country=${defaultQuery}&page=${pageSize}&apiKey=${apiKey}`;
        }

        const response = await axios.get(url);
        setArticles(response.data.articles);
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [query, pageSize]); // Re-run useEffect only on query or pageSize changes

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on component mount
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value

    if (searchTerm.length === 0) {
      alert("Please enter a search term.");
      return; // Exit the function if search term is empty
    }

    setQuery(searchTerm); // Update query state to trigger re-render
  };

  // const handleKeyPress = (e) => {
  //   if (e.key == "Enter") {
  //     handleSearch(e);
  //   }
  // };

  const handlePrev = async () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    setPageSize((prevPageSize) => Math.max(prevPageSize - 1, 1));
  };

  const handleNext = async () => {
    setPage((prevPage) => prevPage + 1);
    setPageSize((prevPageSize) => prevPageSize + 1);
  };

  return (
    <div className="container flex">
      <h2>Daily dose- Main Headlines</h2>
      <div className="search-container" style={{ display: "flex", justifyContent: "flex-end" }}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="Search..."
            onKeyDown={(e)=>{if (e.key == "Enter") {
              handleSearch(e);
            }}}
            style={{marginRight:"5px",height:"35px"}}
          />
          <button className="btn btn-primary"type="submit">Search</button>
        </form>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="row my-3">
        {articles.length > 0 ? (
          articles.map((element) => {
            return (
              <div className="col-md-4 my-3" key={element.url}>
                <NewsContainer
                  Title={element.title ? element.title.slice(0, 45) : ""}
                  Description={
                    element.description ? element.description.slice(0, 80) : ""
                  }
                  ImageUrl={element.urlToImage}
                  NewsUrl={element.url}
                />
              </div>
            );
          })
        ) : (
          <p>End of news here</p>
        )}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          type="button"
          disabled={page <= 1}
          className="btn btn-primary btn-lg"
          onClick={handlePrev}
        >
          <a href="#"  style={{textDecoration:"none",color:"white"}}>&larr;Previous</a>
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleNext}
        >
          <a href="#" style={{textDecoration:"none",color:"white"}}>Next &rarr;</a>
        </button>
      </div>
    </div>
  );
};

export default NewsMain;
