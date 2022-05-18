import { useEffect, useState, useContext } from "react";

import NotificationContext from "../../store/notification-context";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const notificationCtx = useContext(NotificationContext);

  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/comments/${eventId}`);
      const data = await response.json();
      setComments(data.comments);
      setIsFetchingComments(false);
    };
    if (showComments) {
      setIsFetchingComments(true);
      fetchComments();
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Adding",
      message: "Adding your comment...",
      status: "pending",
    });

    try {
      const response = await fetch(`/api/comments/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error("Failed to add the comment.");
      }
      const data = await response.json();
      console.log(data);

      notificationCtx.showNotification({
        title: "Success!",
        message: "Successfully added your comment.",
        status: "success",
      });
    } catch (error) {
      //error
      notificationCtx.showNotification({
        title: "Error",
        message: error.message || "Something went wrong.",
        status: "error",
      });
    }

    // send data to API
    // await fetch(`/api/comments/${commentData.id}`)
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? "Hide" : "Show"} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList comments={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
