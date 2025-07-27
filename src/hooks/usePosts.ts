import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/axios'

async function fetchPosts() {
  const { data } = await api.get('/posts')
  return data
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })
}
