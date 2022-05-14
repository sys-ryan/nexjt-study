import fs from "fs/promises";
import path from "path";

import Link from "next/link";

function HomePage(props) {
  return (
    <ul>
      {props.products.map((product) => {
        return (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log("regenerating...");
  //process.cwd() == root project folder
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");

  let data = await fs.readFile(filePath);
  data = JSON.parse(data);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
    // notFound: true,
    // redirect:
  };
}

export default HomePage;
