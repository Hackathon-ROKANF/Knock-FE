import { usePosts } from './hooks/usePosts'

export default function App() {
  const { data, isLoading } = usePosts()

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold text-blue-500'>tanStackQuery test</h1>

      <h2 className='text-xl mt-6 font-semibold'>Posts</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className='list-disc pl-5'>
          {data?.slice(0, 5).map((post: { id: number; title: string }) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
