import Head from "next/head";

import { getPostsFiles, getPostData } from "../../lib/posts-util";
import PostContent from "../../components/posts/post-detail/PostContent";
import { Fragment } from "react";

const PostDetailPage = (props) => {
  //
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
};

export default PostDetailPage;

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFileNames = getPostsFiles();
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));

  // const p = slugs.map((slug) => ({ params: { slug: slug } }));
  // console.log(p);
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}
