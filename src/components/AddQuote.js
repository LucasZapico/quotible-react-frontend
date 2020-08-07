import React, { useState, useEffect, useLayoutEffect } from "react";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import moment from "moment";
import axios from "axios";
import { useEditValue, useQuotesValue } from "../context";

const quoteSchema = {
  quote: "",
  author: "",
  categories: [],
  notes: "",
  links: [],
  like: 0,
  created: moment().date(),
};

const AddQuote = () => {
  const [showAddQuote, setShowAddQuote] = useState(false);
  const [newQuote, setNewQuote] = useState(quoteSchema);
  const { quotes, setQuotes } = useQuotesValue()
  const { quoteForEdit, setQuoteForEdit } = useEditValue();

  useLayoutEffect(() => {
    console.log("new quote test", newQuote);
  }, [newQuote]);

  useEffect(() => {
    console.log("quote for edit", quoteForEdit);
    if (quoteForEdit) {
      setNewQuote((prev) => {
        return quoteForEdit;
      });
      setShowAddQuote(!showAddQuote);
      console.log("new quote", newQuote);
    }
  }, [quoteForEdit]);

  const handleChange = (e) => {
    const key = e.target.name;
    if (key === "categories") {
      const cat = handleCategories(e.target.value);
      setNewQuote({ ...newQuote, [key]: cat });
    } else {
      setNewQuote({ ...newQuote, [key]: e.target.value });
    }
  };

  const handleCategories = (str) => {
    return str.trim().split(",");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('submit')
    axios
      .post(`${process.env.REACT_API_BASE_URL}/api/quotes`, newQuote)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setShowAddQuote(!showAddQuote);
  };
  const handleDelete = (e) => {
    axios
      .delete(`${process.env.REACT_API_BASE_URL}/api/quotes/${newQuote._id}`)
      .then((res) => {
        setQuotes([...quotes])
        console.log(res)
      })
      .catch((err) => console.log(err));
      setShowAddQuote(!showAddQuote);
  }
  return showAddQuote && newQuote ? (
    <div className="add-quote--modal char-100">
      <div
        className="add-quote--modal__hide icon--default"
        onClick={() => 
          {
            setShowAddQuote(!showAddQuote)
            
          }
        }
      >
        <IoIosClose />
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="add-quote--container">
        <textarea
          autoComplete="off"
          aria-label="quote"
          type="text"
          value={newQuote.quote || ""}
          name="quote"
          onClick={(e) => {
            console.log("value", e.target.value);
            console.log("new quote quote", newQuote.quote);
          }}
          onChange={(e) => handleChange(e)}
        ></textarea>
        <input
          autoComplete="off"
          aria-label="author"
          type="text"
          placeholder="author"
          value={newQuote.author || ""}
          name="author"
          onChange={(e) => handleChange(e)}
        />
        <input
          autoComplete="off"
          aria-label="categories"
          type="text"
          placeholder="categories"
          value={newQuote.categories || []}
          name="categories"
          onChange={(e) => handleChange(e)}
        />
        <textarea
          autoComplete="off"
          aria-label="notes"
          type="text"
          placeholder="notes"
          value={newQuote.notes || ""}
          name="notes"
          onChange={(e) => handleChange(e)}
        ></textarea>
        {/* <input
          autoComplete="off"
          aria-label="context"
          type="text"
          placeholder="context"
          value={newQuote.context || ""}
          name="context"
          onChange={(e) => handleChange(e)}
        /> */}
        <div className="add-quote--actions">
          {/* <input
            autoComplete="off"
            aria-label="date-created"
            type="date"
            value={newQuote.created || ""}
            name="created"
            onChange={(e) => handleChange(e)}
          /> */}
          <input
            autoComplete="off"
            aria-label="add quote"
            className="add-quote--submit btn"
            type="submit"
            name="submit"
          />
        {setNewQuote.quote !== '' ? 
          <button name="delete" className="btn" onClick={(e) => handleDelete(e)}>
            Delete
          </button> : undefined }        
        </div>
        
      </form>

    </div>
  ) : (
    <div
      className="add-quote icon--default"
      onClick={() => {
        setNewQuote(quoteSchema);
        setShowAddQuote(!showAddQuote);
      }}
    >
      <IoIosAdd />
    </div>
  );
};

export default AddQuote;
