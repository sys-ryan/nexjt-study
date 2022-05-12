import { useRouter } from "next/router";

const SelectedClientProejctPage = () => {
  const router = useRouter();

  let info = [];
  for (const property in router.query) {
    info.push(`${property} : ${router.query[property]}`);
  }
  console.log(info);
  // console.log(info);
  return (
    <div>
      <h1>The Proejct Page for a specific proejct for a selected client</h1>
      <h2>Proejct Detail</h2>
      {info.forEach((i) => (
        <h3>{i}</h3>
      ))}
    </div>
  );
};

export default SelectedClientProejctPage;
