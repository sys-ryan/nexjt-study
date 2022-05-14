import fs from "fs/promises";
import path from "path";

import { Fragment } from "react";

const ProductDetailPage = (props) => {
  if (!props.loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{props.loadedProduct.title}</h1>
      <p>{props.loadedProduct.description}</p>
    </Fragment>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  let data = await fs.readFile(filePath);
  data = JSON.parse(data);
  return data;
};

export async function getStaticProps(context) {
  const productId = context.params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWIdhParams = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths: pathsWIdhParams,
    fallback: true,
  };
}

export default ProductDetailPage;
