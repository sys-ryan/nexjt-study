import { useState } from "react";

import classes from "./ContactForm.module.css";

const ContactForm = (props) => {
  const [enteredEmail, setEnteredEmail] = useState();
  const [enteredName, setEnteredName] = useSatet();
  const [enteredMessage, setEnteredMessage] = useState();

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const messageChangeHandler = (event) => {
    setEnteredMessage(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newMessage = {
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    };
  };

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
    </section>
  );
};

export default ContactForm;
