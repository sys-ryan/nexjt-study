import { useRouter } from "next/router";

const BlogPostPage = () => {
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <h1>Blog Post</h1>
    </div>
  );
};

export default BlogPostPage;

// http://localhost:3000/blog/123/321

// slug: (2) ['123', '321']
