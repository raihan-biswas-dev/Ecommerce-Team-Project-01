import React from 'react'
import { Helmet } from 'react-helmet-async'
import Banner from './Bnner.js'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className='mt-5 text-center'>
        <Banner />
      </div>
    </>
  )
}
