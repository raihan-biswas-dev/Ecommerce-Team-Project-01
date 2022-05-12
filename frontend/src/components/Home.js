import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className='mt-5 text-center'>
      <h2>হোমপেজে বালটাও নাই পুরো ফাঁকা</h2>
      </div>
    </>
  )
}
