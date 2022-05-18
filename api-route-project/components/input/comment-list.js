import classes from "./comment-list.module.css";

function CommentList(props) {
  console.log(props.comments);
  return (
    <ul className={classes.comments}>
      {props.comments.map((comment) => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>By {comment.name}</div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
