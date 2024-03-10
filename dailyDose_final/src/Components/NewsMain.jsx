import React, { useState, useEffect } from "react";
import NewsContainer from "./NewsContainer";
import axios from "axios";

const NewsMain = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const apiKey = "827d995de2164005bee10a728d2cf843";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
        
        if (query) {
          url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        }

        const response = await axios.get(url);
        setArticles(response.data.articles);
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [query]); // Re-run useEffect only on query changes

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value.trim();

    if (!searchTerm) {
      alert("Please enter a search term.");
      return;
    }

    setQuery(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handlePrev = async () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container">
      <h2 style={{border: '2px solid red', background: 'linear-gradient(to right, red, white)'}}>Daily dose- Main Headlines</h2>

      <form onSubmit={handleSearch} className="d-flex justify-content-end">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          onKeyPress={handleKeyPress}
          className="form-control me-2"
        />
        <button type="submit" className="btn btn-outline-primary">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="row my-3">
        {articles.map((element) => (
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
        ))}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          type="button"
          disabled={page <= 1}
          onClick={handlePrev}
          className="btn btn-primary btn-lg"
        >
          &larr;Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="btn btn-secondary btn-lg"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default NewsMain;
