import Link from "next/link";

const ClientPage = () => {
  const clients = [
    { id: "max", name: "maximilian" },
    { id: "ryan", name: "ryankim" },
  ];
  return (
    <div>
      <h1>Client</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {/* <Link href={`/clients/${client.name}`}>{client.name}</Link> */}
            <Link
              href={{
                pathname: "/clients/[id]",
                query: {
                  id: client.id,
                },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientPage;
