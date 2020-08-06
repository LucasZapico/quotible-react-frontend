import React, {useState, useEffect} from 'react';
import {useQuotesValue } from '../../context'

const Quote = () => {
    
    
    return ( 
    <div className="home-page container--default"> Hello from Quotible
       <div className="home-quote">
           {quotes.length > 0 ? quotes[0].quote : undefined}
       </div>
    </div>
    );
    }
 
export default Quote;