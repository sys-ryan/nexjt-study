import Head from "next/head";

import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api-util";

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>Next Events</title>
      </Head>
      <meta name="description" content="find a lot of great events" />
      <EventList items={props.featuredEvents} />
    </div>
  );
};

export default HomePage;

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}
