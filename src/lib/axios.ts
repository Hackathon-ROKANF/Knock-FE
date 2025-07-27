import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // 예시 API
  timeout: 5000,
})
