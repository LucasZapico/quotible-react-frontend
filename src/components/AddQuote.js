import React, { useState, useEffect, useRef } from 'react'
import { IoIosAdd, IoIosClose, IoIosSave } from 'react-icons/io'
import moment from 'moment'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useEditValue, useQuotesValue } from '../context'
import { IoIosUnlock, IoIosLock, IoIosTrash } from 'react-icons/io'
import { reSizeTextArea } from '../helpers'
import { useForm } from 'react-hook-form'

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

const AddQuote = () => {
  let history = useHistory()
  const { register, handleSubmit, watch, errors } = useForm()
  const [newQuote, setNewQuote] = useState(dataSchema)
  const [isPrivate, setIsPrivate] = useState(false)
  const [save, setSave] = useState(false)
  const textArea = useRef(null)

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
    return newCat
  }

  const handleAddQuote = data => {
    data.categories = parseCategories(data.categories)

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/api/quotes/`, {
        data: data,
      })
      .then(res => {
        console.log('update', res)
        if (res.status === 200) {
          history.push('/')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // todo: look at for refactor.. resizeTextArea hook ??
  // useEffect(() => {
  //   if (textArea.current !== null) {
  //     reSizeTextArea(textArea)
  //   }
  //   return () => {}
  // }, [])

  return (
    <div className="page add-quote  container__content">
      <form onSubmit={handleSubmit(handleAddQuote)}>
        <div className="card quote editable margin__y--l">
          <div className="margin__bottom--m">
            <div className="input__container">
              <label className="input__label">Quote</label>
              <textarea
                className="input__input"
                autoComplete="off"
                aria-label="quote"
                name="quote"
                defaultValue={newQuote.quote}
                ref={e => {
                  register(e, { required: true, min: 10, max: 1000 })
                  textArea.current = e
                }}
              />
              {errors.quote && <span>This field is required</span>}
            </div>
          </div>
          <div className="margin__bottom--m">
            <div className="input__container">
              <label className="input__label">Author</label>
              <input
                autoComplete="off"
                className="input__input"
                name="author"
                ref={register({ required: true })}
                defaultValue={newQuote.author}
              />
              {errors.author && <span>This field is required</span>}
            </div>
          </div>
          <div className="margin__bottom--m">
            <div className="input__container">
              <label className="input__label">Categories</label>
              <input
                autoComplete="off"
                className="input__input"
                name="categories"
                ref={register}
                defaultValue={newQuote.categories}
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
                ref={register}
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
                ref={register}
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
                  ref={register}
                />
              </div>
            </div>
          </div>
          <input
            className="btn btn__primary--light"
            type="submit"
            value="save"
          ></input>
        </div>
      </form>
    </div>
  )
}

export default AddQuote
