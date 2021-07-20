import { useCallback, useEffect, useState } from "react";
import { getAllComments } from "../../api/api";
import useHttp from "../../use-hook/use-http";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const { sendRequest, data, status } = useHttp(
    {
      url: `https://quotesroutingproject-default-rtdb.firebaseio.com/quotes/comments/${params.quotesId}.json`,
    },
    getAllComments
  );

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  useEffect(() => {
    sendRequest();
  }, []);

  let comment;
  if (status === "Pending") {
    comment = (
      <div className="centered focused">
        <LoadingSpinner />;
      </div>
    );
  }

  if (status === "Completed" && (data || data.length > 0)) {
    comment = <CommentsList comments={data} />;
  }

  if (status === "Completed" && (!data || data.length === 0)) {
    comment = (
      <div className="centered">
        <p>No comments are added yet!</p>
      </div>
    );
  }

  const addedCommentHandler = useCallback(() => {
    sendRequest();
  }, []);

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm onAddedComment={addedCommentHandler} />
      )}
      {comment}
    </section>
  );
};

export default Comments;
