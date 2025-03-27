import axios from 'axios'

// API URLs and Keys

export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export const apiUrl = import.meta.env.VITE_LOCAL_API_URL

const API_URL = import.meta.env.VITE_API_URL


// Fetch price data

export const fetchPriceData = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching price data:', error)
    throw error
  }
}



// Format date and time

export const formatDateTime = (datetime) => {
  if (!datetime) return 'N/A'
  const date = new Date(datetime)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}


export const formatPrice = (value) => {
  if (value === null || value === undefined) return 'N/A'
  return Number(value).toFixed(2)
}
