import { Route, useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";

const QuoteDetails = () => {
  const params = useParams();
  return (
    <section>
      <h1>Quote Details</h1>
      <p>{params.quotesId}</p>
      {/* <Route path="/quotes/:quotesId/comments"> */}
      <Route path={`/quotes/${params.quotesId}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};
export default QuoteDetails;
