import { Article, BlogpostImage } from "@components/Article";
import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  GetStaticPaths,
} from "next";
import Head from "next/head";
import { title } from "process";
import { Post } from "../index";

export default function BlogPost({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, body } = post;
  return (
    <Article>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content="/d-s-chapman-aIgZHolF4Dg-unsplash.jpg"
        />
      </Head>
      <h1>{title}</h1>
      <BlogpostImage
        src="/d-s-chapman-aIgZHolF4Dg-unsplash.jpg"
        alt="cheetah stretching"
      />
      <p>{body}</p>
    </Article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  const emptyPost: Post = {
    title: "Post not found",
    body: "",
    id: 0,
    userId: 0,
  };

  if (!params?.id) {
    return {
      props: {
        post: emptyPost,
      },
    };
  }

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  const post: Post = await res.json();

  return {
    props: {
      post,
    },
  };
};
