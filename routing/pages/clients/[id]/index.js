import { useRouter } from "next/router";

const ClientProjectPage = () => {
  const router = useRouter();
  const loadProjectHandler = () => {
    // router.push("/clients/max/projecta");
    router.push({
      pathname: "/clients/[id]/[projectid]",
      query: {
        id: "max",
        projectid: "projecta",
      },
    });
    // router.replace()
  };
  return (
    <div>
      <h1>The Proejcts of a given client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default ClientProjectPage;
