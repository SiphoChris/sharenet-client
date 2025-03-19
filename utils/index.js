import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const fetchPriceData = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching price data:', error)
    throw error
  }
}

export const GOOGLE_MAPS_API_KEY = import.meta.env.GOOGLE_MAPS_API
