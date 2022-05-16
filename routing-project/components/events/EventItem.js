import Image from "next/image";

import classes from "./EventItem.module.css";
import Button from "../ui/button";

import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

const EventItem = (props) => {
  const date = new Date(props.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const address = props.location.replace(", ", "\n");

  const exploreLink = `/events/${props.id}`;

  return (
    <li className={classes.item}>
      <Image src={`/${props.image}`} alt={props.title} width={250} height={160} />
      {/* <img src={`/${props.image}`} alt={props.title} /> */}
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{props.title}</h2>
        </div>
        <div className={classes.date}>
          <DateIcon />
          <time>{date}</time>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{address}</address>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
