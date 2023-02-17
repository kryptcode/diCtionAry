import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { searchState } from '../atom'

const Search = () => {
    const [word, setWord] = useState('')
    const [results, setResults] = useRecoilState(searchState)

    const saveFormData = async () => {
        const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(res => res.json())
        
        setResults(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await saveFormData()
            alert('Your request was successfully submitted!')
          } catch(err) {
            alert(`Registration Failed ${err.message}`)
          }
    }

  return (
    <div className='p-2 rounded-lg bg-purple-100 w-[90%] md:w-[70%] mx-auto mb-16  '>
        <form onSubmit={handleSubmit} className='flex justify-between items-center'>
            <input type="text" placeholder='Enter a word' className='font-medium text-lg tracking-wide bg-purple-100 outline-none p-1 flex-1' onChange={(e) => setWord(e.target.value)} />
            <button type='submit'>
                <MagnifyingGlassIcon className='h-6 px-3 text-purple-700 font-semibold' />
            </button>
        </form>
    </div>
  )
}

export default Search