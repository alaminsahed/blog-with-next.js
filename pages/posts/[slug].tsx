import React from 'react'
import { sanityClient, urlFor } from '../../sanity'
import Head from 'next/head'
import Header from '../../components/Header'
import { GetStaticProps } from 'next'
import PortableText from 'react-portable-text'

const Post = ({ post }: any) => {
  console.log(post)
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/image/mediu,.png" />
      </Head>

      <Header />
      <img
        className="h-80 w-full object-cover "
        src={urlFor(post.mainImage).url()!}
        alt=""
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>

        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <p className="text-sm font-extralight">
            Blog post By{' '}
            <span className="text-green-700">{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props}></h1>
              ),
              h2: (props: any) => (
                <h1 className="my-5 text-xl font-bold" {...props}></h1>
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ children, href }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
    </>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
  _id,
  slug {
      current
  }
}`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: any) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params?.slug)
  const query = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  author -> {
    name,
    image
  },
  "comments": *[
    _type == "comment" &&
    post._ref == ^._id && 
    approved == true
  ],
 
  mainImage,
  slug,
  body
}`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
