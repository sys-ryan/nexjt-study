import { useRouter } from "next/router";

const DetailPage = () => {
  const router = useRouter();
  const newsId = router.query.newsId;
  console.log(newsId);
  return <h1>The News Page</h1>;
};

export default DetailPage;
