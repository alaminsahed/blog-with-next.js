import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'

const Home: NextPage = ({ posts }: any) => {
  console.log(posts)
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Blog</title>
      </Head>
      <Header />
      <div className="flex items-center justify-between border-y border-black bg-yellow-400 py-10 lg:py-5 ">
        <div className="space-y-5 px-10">
          <h1 className="max-w-xl font-serif text-6xl">
            {' '}
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is a place to write read and connect{' '}
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </div>
        <img
          src="/image/medium-1.svg"
          alt="logo"
          className="hidden h-32 w-32 sm:inline-flex md:mr-4 lg:mr-9"
        />
      </div>
      <div className="grids-cols-1 grid gap-3 p-2 md:grid-cols-3 md:gap-6 md:p-6">
        {posts.map((post: any) => {
          return (
            <Link key={post._id} href={`posts/${post.slug.current}`}>
              <div className="group cursor-pointer overflow-hidden rounded-lg border">
                <img
                  className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                  src={urlFor(post.mainImage).url()!}
                  alt=""
                />
                <div className="flex justify-between px-3">
                  <div>
                    <p>{post.title}</p>
                    <p>Written By: {post.author.name}</p>
                  </div>
                  <img
                    className="border-white-300 w-10 rounded-full border-2"
                    src={urlFor(post.author.image).url()}
                    alt=""
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
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

  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts,
    },
  }
}

export default Home
