import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="">
     <Head>
       <h1>this is working</h1>
     </Head>
     <Header/>
    </div>
  )
}

export default Home
