import React from "react";
import { useQuotesValue } from "../../context";

const HomePage = () => {
  const { quotes } = useQuotesValue();
  console.log("home", quotes);

  return (
    <div className="page--home container--full">
      {quotes.length > 0 ? (
        <div className="home--quote">
          <h3> {quotes[0].quote}</h3>
          <h5>- {quotes[0].author}</h5>
          <div>{quotes[0].like}</div>
        </div>
      ) : (
        <div className="loading">
          
        <div className="loader--wrapper">
            <h4>Building up app from Heroku</h4>
            <p>This app and it's backend is spun up dynamically so initial load time maybe longer then expected. Please wait a moment for the instance deploy.</p>
          <svg
            className="loader--element"
            height="57"
            
            viewBox="0 0 57 57"
            width="57"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fillRule="evenodd" fill="none">
              <g strokeWidth="2" transform="translate(1 1)">
                <circle
                  className="loader12__path-left"
                  cx="5"
                  cy="50"
                  r="5"
                ></circle>
                <circle
                  className="loader12__path-top"
                  cx="27"
                  cy="5"
                  r="5"
                ></circle>
                <circle
                  className="loader12__path-right"
                  cx="50"
                  cy="50"
                  r="5"
                ></circle>
              </g>
            </g>
          </svg>
          </div>
        </div>
      )}
      <div className="home--background"></div>
    </div>
  );
};

export default HomePage;
