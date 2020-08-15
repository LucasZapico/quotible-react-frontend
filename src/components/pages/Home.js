import React  from 'react';
import {useQuotesValue } from '../../context'

const HomePage = () => {
    const {quotes} = useQuotesValue()
    console.log('home', quotes)
    
    return ( 
    <div className="page--home container--full">
        
        {quotes.length > 0 && <div className="home--quote">
          <h3> { quotes[0].quote}</h3>
          <h5>- {quotes[0].author}</h5>
          <div>{quotes[0].like}</div>
       </div>
       }
       <div className="home--background"></div>
    </div>
    );
    }
 
export default HomePage;