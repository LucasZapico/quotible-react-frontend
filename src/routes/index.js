// todo: generalize routes for reusability

export const getQuotesByUser = (
  user = 'quotible_admin@quotible.com'
) => {
  axios
    .get(`${process.env.REACT_APP_API_BASE_URL}/api/quotes/`, {
      params: { user: user },
    })
    .then(res => {
      // setAllQuotes(res.data)
      // setQuotes(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}
