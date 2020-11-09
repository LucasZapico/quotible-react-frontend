import React, { useState, useEffect } from 'react'

const QuoteCard = ({ quote, cl = '' }) => {
  return (
    <div className={cl ? `${cl} card quote` : 'card quote'}>
      <div className="quote__body h6">{quote.quote}</div>
      <div className="quote__author">-{quote.author}</div>
    </div>
  )
}

export default QuoteCard
