import React, { useState, useEffect, useLayoutEffect } from "react";
import { useQuotesValue, useEditValue } from "../context";
import moment from "moment";
import { IoIosHeart } from "react-icons/io";

const searchSchema = {
  quoteResults: [],
  authorResults: [],
  categoriesResults: [],
};

const AllQuotes = () => {
  const { quotes } = useQuotesValue();
  const [showDetails, setShowDetails] = useState(false);
  const [displayQuotes, setDisplayQuotes] = useState([]);
  const [searchResults, setSearchResults] = useState(searchSchema);
  const [searchValue, setSearchValue] = useState("");
  const { quoteForEdit, setQuoteForEdit } = useEditValue();

  useEffect(() => {
    if (displayQuotes.length <= 0) {
      setDisplayQuotes((prev) => {
        return quotes;
      });
    }
  }, [quotes]);

  useEffect(() => {
    console.log(displayQuotes);
  }, [displayQuotes]);

  

  const handleEdit = (id) => {
    console.log("edit", id);
    const toEdit = quotes.filter((q) => q._id === id);
    setQuoteForEdit(toEdit[0]);
  };
  const handleLike = (e) => {};
  const handleFuzzySearch = (e) => {
    setSearchValue(e.target.value);
    let results = {
      quoteResults: [],
      authorResults: [],
      categoriesResults: [],
    };
    // for a seach value loop over each item and apply a match percentage
    // wait for search a have min length
    if (searchValue.length > 3) {
      quotes.forEach((q) => {
        if (q.quote.toLowerCase().includes(searchValue)) {
          results.quoteResults.push(q);
        }
        if (q.author.toLowerCase().includes(searchValue)) {
          results.authorResults.push(q);
        }
      });
    }
    setSearchResults(results);
  };
  const handleSearch = () => {
    if (searchValue.length > 3) {
      console.log(searchResults.quoteResults);
      setDisplayQuotes((prev) => {
        return searchResults.quoteResults;
      });
      setSearchResults(searchSchema);
    } else if (searchValue.length === 0){
      setDisplayQuotes((prev) => {
        return quotes
      });
    }
    
  };
  return (
    <>
      <div className="quotes--search">
        <input
          type="text"
          className=""
          onChange={(e) => handleFuzzySearch(e)}
          name="search"
          autoComplete="off"
          value={searchValue}
          onKeyPress={(e) => {
            return e.key == "Enter" ? handleSearch(e) : undefined;
          }}
        ></input>
        <button className="btn btn--search" onClick={(e) => handleSearch(e)}>
          Search
        </button>
        <div className="search--results">
          {searchResults.quoteResults &&
            searchResults.quoteResults.length > 0 &&
            searchResults.quoteResults.map((q) => <p>{q.quote}</p>)}
          
        </div>
      </div>
      <div className="quotes--container">
        {displayQuotes.length > 0 &&
          displayQuotes.map((quote, index) => (
            <div className="quote-card" key={quote._id}>
              <div className="quote-card--header">
                <p className="quote-card--quote">{quote.quote}</p>
                <h6 className="quote-card--author">- {quote.author}</h6>
              </div>
              <div className="quote-card--categories">
                {quote.categories &&
                  quote.categories.map((c, i) => <span key={i}>{c}, </span>)}
              </div>
              <h6 className="quote-card--created">
                {quote.created && moment(quote.created).format("MM/DD/YYYY")}
              </h6>
              <div className="quote-card--row">
                {/* <div className="quote-card--like btn">
                  <IoIosHeart />
                </div> */}
                {/* <div
                  className="quote-card--edit btn btn-secondary"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  Details
                </div> */}
                <div
                  className="quote-card--edit btn btn-secondary"
                  onClick={(e) => handleEdit(quote._id)}
                >
                  Edit
                </div>
                {showDetails ? (
                  <div className="quote-card--details">
                    <div>{quote.context}</div>
                    <div>{quote.notes}</div>
                    <div>{quote.links}</div>
                  </div>
                ) : undefined}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AllQuotes;
