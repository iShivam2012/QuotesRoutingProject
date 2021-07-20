import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { addComment } from "../../api/api";
import useHttp from "../../use-hook/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const params = useParams();
  const { sendRequest, status, error } = useHttp(
    {
      url: `https://quotesroutingproject-default-rtdb.firebaseio.com/quotes/comments/${params.quotesId}.json`,
      method: "POST",
    },
    addComment
  );
  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "Completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const commentTextRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    // send comment to server
    sendRequest({ text: commentTextRef.current.value });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div>{status === "Pending" && <LoadingSpinner />}</div>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
