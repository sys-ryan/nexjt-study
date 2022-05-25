import { useState, useEffect } from "react";

import classes from "./ContactForm.module.css";

import Notification from "../ui/notification";

const sendContactData = async (contactDetails) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactDetails),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
};

const ContactForm = (props) => {
  const [enteredEmail, setEnteredEmail] = useState();
  const [enteredName, setEnteredName] = useState();
  const [enteredMessage, setEnteredMessage] = useState();

  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const messageChangeHandler = (event) => {
    setEnteredMessage(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const newMessage = {
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    };

    setRequestStatus("pending");
    try {
      await sendContactData(newMessage);
      setRequestStatus("success");

      setEnteredMessage("");
      setEnteredEmail("");
      setEnteredName("");
    } catch (error) {
      setRequestStatus("error");
      setRequestError(error.message);
    }
  };

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              onChange={emailChangeHandler}
              value={enteredEmail}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              onChange={nameChangeHandler}
              value={enteredName}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea id="mssage" rows="5" onChange={messageChangeHandler} value={enteredMessage} />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </section>
  );
};

export default ContactForm;
