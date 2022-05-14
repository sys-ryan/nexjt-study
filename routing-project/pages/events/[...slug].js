import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import useSWR from "swr";

import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultTitle";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/ErrorAlert";

const FilteredEventsPage = (props) => {
  const router = useRouter();

  const filterData = router.query.slug;

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://nextjs-course-84ee0-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  console.log(data);

  const [loadedEvents, setLoadedEvents] = useState();

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p>Loading...</p>;
  }

  const year = +filterData[0];
  const month = +filterData[1];

  if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your value.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filteredData = params.slug;

//   if (!filteredData) {
//     return <p>Loading...</p>;
//   }

//   const year = +filteredData[0];
//   const month = +filteredData[1];

//   if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year,
//     month: month - 1,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       year,
//       month,
//     },
//   };
// }
