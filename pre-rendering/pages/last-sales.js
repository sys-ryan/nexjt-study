import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     let data = await fetch("https://nextjs-course-84ee0-default-rtdb.firebaseio.com/sales.json");
  //     data = await data.json();
  //     const transformedSales = [];
  //     for (const key in data) {
  //       transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
  //     }
  //     setSales(transformedSales);
  //     setIsLoading(false);
  //   };

  //   fetchData();
  // }, []);

  const { data, error } = useSWR(
    "https://nextjs-course-84ee0-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps(context) {
  let data = await fetch("https://nextjs-course-84ee0-default-rtdb.firebaseio.com/sales.json");
  data = await data.json();
  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
  }

  return { props: { sales: transformedSales }, revalidate: 10 };
}

export default LastSalesPage;
