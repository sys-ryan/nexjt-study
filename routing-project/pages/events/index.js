import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

import { getAllEvents } from "../../helpers/api-util";

const EventsPage = (props) => {
  const { events } = props;
  const router = useRouter();

  const findEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="find a lot of great events" />
      </Head>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default EventsPage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  const events = await getAllEvents();

  return {
    props: {
      events,
    },
  };
}
