import {useState, useEffect} from 'react'
import moment from 'moment'
import axios from 'axios'

export const useQuotes = () => {
    const [quotes, setQuotes] = useState([])
    useEffect( () => {
        axios.get(`${process.env.REACT_API_BASE_URL}/api/quotes`).then((res) => {
            const orderedByDate = res.data.sort((a,b) =>   moment(b.created) - moment(a.created))
            if(JSON.stringify(quotes) !== JSON.stringify(orderedByDate)) {
                setQuotes(orderedByDate)
            }
            
        }).catch(err => console.log(err.response))    

        
    }, [quotes])
    return {quotes, setQuotes}
} 