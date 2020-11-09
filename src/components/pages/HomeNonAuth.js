import React, { useState, useEffect } from 'react'
import { useQuotesValue } from '../../context'
import QuoteCard from '../QuoteCard'

const HomeNonAuthPage = () => {
  const { quotes } = useQuotesValue()
  const [featured, setFeatured] = useState('')
  // const []
  useEffect(() => {
    setFeatured(quotes[0])
    return () => {}
  }, [quotes])

  return (
    <div className="page home-non container__content">
      {featured ? (
        <QuoteCard quote={featured} cl="featured" />
      ) : (
        <div className="loading"></div>
      )}
      <section className="quotes section">
        {quotes &&
          quotes.map((q, i) => <QuoteCard key={i} quote={q} />)}
      </section>
    </div>
  )
}

export default HomeNonAuthPage
