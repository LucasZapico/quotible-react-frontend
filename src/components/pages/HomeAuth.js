import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthValue, useQuotesValue } from '../../context'
import QuoteCardEditable from '../QuoteCardEditable'
import * as ROUTES from '../../constants/routes'
import axios from 'axios'
import ClickOutSide from '../ClickOutside'
import {
  IoIosUnlock,
  IoIosLock,
  IoIosSearch,
  IoIosEye,
  IoIosAdd,
} from 'react-icons/io'
import { reSizeTextArea } from '../../helpers'
import { union } from 'lodash'

const searchSchema = {
  quoteResults: [],
  authorResults: [],
  categoriesResults: [],
}

const HomeAuthPage = () => {
  const [allQuotes, setAllQuotes] = useState([])
  const [quotes, setQuotes] = useState([])
  const [quoteUpdate, setQuoteUpdate] = useState(false)
  const { currentUserObj } = useAuthValue()
  const [searchResults, setSearchResults] = useState(searchSchema)
  const [searchValue, setSearchValue] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [categories, setCategories] = useState('')

  const getUserQuotes = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/quotes/`, {
        params: { user: 'quotible_admin@quotible.com' },
      })
      .then(res => {
        setAllQuotes(res.data)
        setQuotes(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    setQuoteUpdate(false)
  }

  function getCategories() {
    let allCategories = []
    quotes.forEach(element => {
      allCategories = union(allCategories, element.categories)
    })
    return allCategories
  }

  const handleCategoryFilter = e => {
    const filter = e.currentTarget.textContent
    console.log('filter', filter)
    if (categoryFilter === filter || 'All Sources' === filter) {
      setQuotes(allQuotes)
    } else {
      let filtered = []
      allQuotes.forEach(q => {
        console.log('cats', q.categories)
      })
      setQuotes(prev => {
        return filtered
      })
      setCategoryFilter(prev => {
        return filter
      })
    }
  }
  useEffect(() => {
    console.log('current quotes', quotes)
  }, [quotes])

  useEffect(() => {
    if (quotes.length < 1 || quoteUpdate) {
      getUserQuotes()
    } else {
      const cats = getCategories()
      setCategories(cats)
    }

    return () => {}
  }, [allQuotes, quoteUpdate])

  useEffect(() => {
    console.log('get categores')
    const cats = getCategories()
    console.log(cats)
    setCategories(cats)
  }, [quoteUpdate])

  return (
    <div className="page home-auth container__content">
      <div className="quotes controls">
        <div className="search">
          <IoIosSearch /> <input name="search"></input>
        </div>
        <div className="">
          <div className="categories margin__y">
            {categories &&
              categories.map((c, i) => (
                <div
                  onClick={e => handleCategoryFilter(e)}
                  key={i + c.replace(' ', '-')}
                  className="category"
                >
                  <div className="margin__right--xs">{c}</div>{' '}
                  <IoIosEye />
                </div>
              ))}
          </div>
        </div>
      </div>
      <section className="quotes section">
        {quotes &&
          quotes.map((q, i) => (
            <QuoteCardEditable
              key={i}
              data={q}
              setQuoteUpdate={setQuoteUpdate}
            />
          ))}
      </section>
      <Link className="quotes quotes__add" to={ROUTES.ADD_QUOTE}>
        <IoIosAdd />
      </Link>
    </div>
  )
}

export default HomeAuthPage
