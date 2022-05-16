import { useRef, useState } from "react";

function HomePage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };
    // console.log(JSON.stringify(reqBody));

    const response = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  };

  const loadFeedbackHandler = async () => {
    const response = await fetch("/api/feedback");
    const data = await response.json();
    console.log(data);
    setFeedbacks(data.feedback);
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <div>
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback.id}>{feedback.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
