import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import {sanityClient} from '../sanity'

const Home: NextPage = (props:any) => {
  return (
    <div className="max-w-7xl mx-auto">
     <Head>
      <title>Blog</title>
     </Head>
     <Header/>
     <div className='flex items-center bg-yellow-400 justify-between py-10 border-y border-black '>
       <div className='px-10 space-y-5'>
         <h1 className='text-6xl max-w-xl font-serif'> <span className='underline decoration-black decoration-4'>Medium</span>{" "} is a place to write read and connect </h1>
         <h2>It's easy and free to post your thinking on any topic and connect with millions of readers.</h2>
       </div>
       <img src="/image/medium-1.svg" alt="logo" className='h-32 w-32 md:mr-4 lg:mr-9'/>
     </div>
    </div>
  )
}


export const getServerSideProps= async()=>{
      const query = `*[_type == "post"]{
        _id,
        title,
        slug,
        author->{
        name,
      }
        
      } `


     const posts = await sanityClient.fetch(query);
     return{
       props:{
         posts
       }
     }
}

export default Home
