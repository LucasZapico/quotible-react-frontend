import React, { useRef, useEffect, useState } from 'react'
import ClickOutSide from './ClickOutside'
import { IoIosUnlock, IoIosLock, IoIosTrash } from 'react-icons/io'
import { reSizeTextArea } from '../helpers'
import axios from 'axios'
import { set } from 'lodash'

const dataSchema = {
  quote: '',
  author: '',
  categories: [],
  tags: [],
  links: [],
  like: 0,
  notes: '',
  isPrivate: false,
}

const QuoteCardEditable = ({ data, setQuoteUpdate }) => {
  const [quote, setQuote] = useState(data)
  const [newQuote, setNewQuote] = useState(dataSchema)
  const [editCard, setEditCard] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(0)
  const [isPrivate, setIsPrivate] = useState(false)
  const [save, setSave] = useState(false)
  const textArea = useRef(null)

  const handleChange = e => {
    e.persist()
    const key = e.target.name
    if (key === 'categories') {
      const cat = parseCategories(e.target.value)
      setNewQuote(newQuote => {
        return { ...newQuote, [key]: cat }
      })
    } else if (key == 'private') {
      setNewQuote(newQuote => {
        return { ...newQuote, [key]: isPrivate }
      })
    } else {
      setNewQuote(newQuote => {
        return { ...newQuote, [key]: e.target.value }
      })
    }
    reSizeTextArea(textArea)
  }

  useEffect(() => {
    if (save) {
      axios
        .put(
          `${process.env.REACT_APP_API_BASE_URL}/api/quotes/${newQuote._id}`,
          {
            data: newQuote,
          }
        )
        .then(res => {
          console.log('update', res)
        })
        .catch(err => {
          console.log(err)
        })
      setQuoteUpdate(true)
      setSave(false)
    }

    return () => {}
  }, [newQuote, save])

  const onSubmit = () => {
    setConfirmDelete(0)
    setSave(true)
    setEditCard(!editCard)
  }

  useEffect(() => {
    if (newQuote.quote === '') {
      setNewQuote(prev => {
        return quote
      })
    }

    return () => {}
  }, [quote, setNewQuote])

  // todo: look at for refactor.. resizeTextArea hook ??
  useEffect(() => {
    if (textArea.current !== null) {
      reSizeTextArea(textArea)
    }
    return () => {}
  }, [editCard])

  const handleDelete = () => {
    if (confirmDelete == 2) {
      axios
        .delete(
          `${process.env.REACT_APP_API_BASE_URL}/api/quotes/${newQuote._id}`
        )
        .then(res => {
          console.log('update', res)
        })
        .catch(err => {
          console.log(err)
        })
      setQuoteUpdate(true)
      setConfirmDelete(0)
    } else {
      setConfirmDelete(prev => {
        return prev + 1
      })
    }
  }

  // todo: remove duplicates
  const parseCategories = cat => {
    const cats = cat.split(',')
    if (cats.length > 1) {
      const catsClean = cats.map(c =>
        c.toLowerCase().trim().replace(' ', '-')
      )
      return catsClean
    }
    const newCat = cats[0].toLowerCase().trim().replace(' ', '-')
    if (newCat === '') {
      return []
    } else {
      return [newCat]
    }
  }

  return (
    <>
      {!editCard ? (
        <div
          className="card quote editable"
          onClick={() => setEditCard(true)}
        >
          <div className="quote__body h6">{newQuote.quote}</div>
          <div className="quote__author">-{newQuote.author}</div>
        </div>
      ) : (
        <ClickOutSide handleClickOutside={e => onSubmit(newQuote)}>
          <div className="card quote editable editor">
            <div className="margin__bottom--m">
              <div className="input__container">
                <label className="input__label">Quote</label>
                <textarea
                  className="input__input"
                  autoComplete="off"
                  aria-label="quote"
                  name="quote"
                  defaultValue={newQuote.quote}
                  ref={textArea}
                  onChange={e => handleChange(e)}
                />
              </div>
            </div>
            <div className="margin__bottom--m">
              <div className="input__container">
                <label className="input__label">Author</label>
                <input
                  autoComplete="off"
                  className="input__input"
                  name="author"
                  defaultValue={newQuote.author}
                  onChange={e => handleChange(e)}
                />
              </div>
            </div>
            <div className="margin__bottom--m">
              <div className="input__container">
                <label className="input__label">Categories</label>
                <input
                  autoComplete="off"
                  className="input__input"
                  name="categories"
                  defaultValue={newQuote.categories}
                  onChange={e => handleChange(e)}
                />
              </div>
            </div>
            <div className="margin__bottom--m">
              <div className="input__container">
                <label className="input__label">tags</label>
                <input
                  autoComplete="off"
                  className="input__input"
                  name="tags"
                  defaultValue={newQuote.tags}
                />
              </div>
            </div>
            {/* todo: add links feature */}

            <div className="margin__bottom--m">
              <div className="input__container">
                <label className="input__label">Notes</label>
                {/* todo: enable markdown support */}
                <textarea
                  autoComplete="off"
                  className="input__input"
                  aria-label="notes"
                  name="notes"
                  defaultValue={newQuote.notes}
                />
              </div>
            </div>
            <div className="margin__bottom--m">
              <div className="input__container">
                <div
                  defaultValue={isPrivate}
                  className="input container private"
                  onClick={() => setIsPrivate(!isPrivate)}
                >
                  {isPrivate ? <IoIosLock /> : <IoIosUnlock />}
                  <input
                    className="input private"
                    type="checkbox"
                    name="private"
                    defaultValue={newQuote.isPrivate}
                  />
                </div>
              </div>
            </div>
            <div className="" onClick={() => handleDelete()}>
              {confirmDelete < 1 ? (
                <IoIosTrash />
              ) : (
                <div>
                  Confirm {confirmDelete} <IoIosTrash />
                </div>
              )}
            </div>
          </div>
        </ClickOutSide>
      )}
    </>
  )
}

export default QuoteCardEditable
