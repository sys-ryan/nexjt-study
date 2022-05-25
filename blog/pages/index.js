import { Fragment } from "react";
import Head from "next/head";
import Hero from "../components/Hero";
import FeaturedPosts from "../components/FeaturedPosts";

import { getFeaturedPosts } from "../lib/posts-util";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Ryan's Blog</title>
        <meta name="description" content="I post about programming nad web development" />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
};

export default HomePage;

export async function getStaticProps() {
  const featuredPosts = await getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 1800,
  };
}
