import fs from "fs/promises";
import path from "path";

import { Fragment, useState } from "react";

const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedbackHandler = async (id) => {
    const response = await fetch(`/api/feedback/${id}`);
    const data = await response.json();

    setFeedbackData(data.feedback);
  };

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}{" "}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Details</button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const fileData = await fs.readFile(filePath);
  const data = JSON.parse(fileData);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
