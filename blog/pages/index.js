import { Fragment } from "react";

import Hero from "../components/Hero";
import FeaturedPosts from "../components/FeaturedPosts";

import { getFeaturedPosts } from "../lib/posts-util";

const HomePage = (props) => {
  return (
    <Fragment>
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
