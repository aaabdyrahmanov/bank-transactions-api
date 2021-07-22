const axios = require('axios')
const { TPP_API_URL } = require('../config')

// TPP-banking API for retrieving the data
const API = axios.create({
    baseURL: TPP_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  
/**
  * create API call on TPP-banking API
  * @param {object} options - specified operation options 
  * @return {Promise<Object>} - Retrieved operation data
  * @throws {Exception} - Promise rejection depending on the fatality status
*/
module.exports = async function createAPICall(options) {
  const {         
      type,
      isFatal,
      hasFilter,
      filterByName,
      filterByValue
  } = options
  
  const uri = hasFilter ? `/api/${type}?${filterByName}=${filterByValue}` : `/api/${type}`;
  let status = 'pending'
  console.log({ status })

  const response = API.get(uri)
    .then((res)=> {
      status = 'resolved'
      console.log({ status })

      // send only parsed neccessary data
      // to avoid storing the whole response object as a circular object
      return res.data
    }).catch(() => {
      status = 'rejected'
      console.log({ status })

      if (isFatal) {
          return 'fatalError'
      }
      console.error(`We're sorry. Error occured while retrieving the ${type} data from TPP!`)
    })
  
  return response
}