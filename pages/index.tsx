import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import {sanityClient, urlFor} from '../sanity'


const Home: NextPage = ({posts}:any) => {
 console.log(posts);
  return (
    <div className="max-w-7xl mx-auto">
     <Head>
      <title>Blog</title>
     </Head>
     <Header/>
     <div className='flex items-center bg-yellow-400 justify-between py-10 border-y border-black lg:py-5 '>
       <div className='px-10 space-y-5'>
         <h1 className='text-6xl max-w-xl font-serif'> <span className='underline decoration-black decoration-4'>Medium</span>{" "} is a place to write read and connect </h1>
         <h2>It's easy and free to post your thinking on any topic and connect with millions of readers.</h2>
       </div>
       <img src="/image/medium-1.svg" alt="logo" className='h-32 w-32 md:mr-4 lg:mr-9 hidden sm:inline-flex'/>
     </div>
     <div className='grid grids-cols-1 md:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
       {
         posts.map((post:any) =>{
            return(
            <Link key={post._id} href={`posts/${post.slug.current}`}>
              <div className='group border rounded-lg cursor-pointer overflow-hidden'>
              <img
                  className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  src={urlFor(post.mainImage).url()!}
                  alt=""
                />  
                <div className='flex justify-between px-3'>
                 <div>
                 <p>{post.title}</p>
                  <p>Written By: {post.author.name}</p>
                 </div>
                 <img className='w-10 border-2 border-white-300 rounded-full' src={urlFor(post.author.image).url()} alt="" />
                </div>
              </div>
            </Link>
          )
          
         })
       }
     </div>
    </div>
  )
}


export const getServerSideProps= async()=>{
      const query = `*[_type == "post"]{
        _id,
        title,
        slug,
        mainImage,
        author->{
        name,
        image
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
