import Head from "next/head";
import { Fragment } from "react";

import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const EventDetailPage = (props) => {
  // const router = useRouter();
  const { event } = props;

  if (!event) {
    return (
      <div className="center">
        <h2>Loading ...</h2>
      </div>
    );
  }

  // if (!event) {
  //   return (
  //     <Fragment>
  //       <ErrorAlert>
  //         <p>No event found.</p>
  //       </ErrorAlert>
  //     </Fragment>
  //   );
  // }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventDetailPage;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);
  console.log(event);

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths,
    fallback: true,
  };
}
