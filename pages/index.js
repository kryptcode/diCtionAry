import Head from 'next/head'
import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import Header from '../components/Header'

export default function Home() {
  const [word, setWord] = useState('')
  const [searchRes, setSearchRes] = useState(null)


  const handleSubmit = async (e) => {
      e.preventDefault()

      try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(res => res.json())
        setSearchRes(res)
        console.log(searchRes);
        
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className=''>
          <Head>
            <title>
              Dictionary | Home
            </title>
          </Head>
           <Header />

            <div className='p-2 rounded-lg bg-purple-100 w-[90%] md:w-[70%] mx-auto mb-16  '>
                <form onSubmit={handleSubmit} className='flex justify-between items-center'>
                    <input type="text" placeholder='Enter a word' className='font-medium text-2xl tracking-wide bg-purple-100 outline-none p-1 flex-1' onChange={(e) => setWord(e.target.value)} />
                    <button type='submit'>
                        <MagnifyingGlassIcon className='h-6 px-3 text-purple-700 font-semibold' />
                    </button>
                </form>
            </div>

            {
              searchRes && searchRes.slice(0, 3).map((item, index) => (
                <div key={index} className='w-[90%] md:w-[70%] mx-auto mb-8' >
                  <div className='flex items-center justify-between mb-5'>
                    <div>
                        <h2 className='text-6xl mb-2 font-bold'>
                          {item.word}
                        </h2>
                        <h5 className='text-purple-700 text-2xl font-medium mt-4'>
                          {item.phonetic}
                        </h5>
                      </div>
                      <div className='text-purple-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
                        </svg>
                      </div>
                  </div>

                  <div>
                    <p className='my-3 font-semibold italic text-xl'>
                      {item.meanings[0].partOfSpeech}
                    </p>

                    <p className='text-gray-500 mb-3 text-lg'>
                      Meaning
                    </p>

                    <ul className='list-disc pl-10 mb-5'>
                        {item.meanings[0].definitions.slice(0, 6).map(xo => (
                          <li className='my-3 text-lg'>
                            {xo.definition}
                          </li>
                        ) )
                      }
                    </ul>

                    <div className='flex space-x-4 text-lg font-medium'>
                      <span>
                        Synonyms
                      </span>
                      <div className='space-x-5'>
                        {
                          item.meanings[0].synonyms.map(xo => (
                            <span className='text-purple-700 hover:underline '>
                              {' '}
                              {xo}
                              {' '}
                            </span>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                    
                </div>
              ))
            }         
    </div>
  )
}
