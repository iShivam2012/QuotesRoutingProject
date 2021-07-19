import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import HighLightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../use-hook/use-http";
import { getSingleQuote } from "../api/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetails = () => {
  const params = useParams();
  const {
    sendRequest,
    status,
    data: quote,
  } = useHttp(
    {
      url: `https://quotesroutingproject-default-rtdb.firebaseio.com/quotes/${params.quotesId}.json`,
      params: params.quotesId,
    },
    getSingleQuote
  );

  useEffect(() => {
    sendRequest();
  }, []);

  const match = useRouteMatch();
  console.log(match);

  if (status === "Completed" && !quote.text) {
    return <NoQuotesFound />;
  }

  if (status === "Completed") {
    return (
      <section>
        <HighLightedQuote text={quote.text} author={quote.author} />
        <Route path={match.path} exact>
          <div className="centered">
            <Link className=" btn--flat" to={`${match.url}/comments`}>
              Load Comments
            </Link>
          </div>
        </Route>

        {/* <Route path="/quotes/:quotesId/comments"> */}
        <Route path={`${match.path}/comments`}>
          <Comments />
        </Route>
      </section>
    );
  }
  return (
    <div className="centered">
      <LoadingSpinner />;
    </div>
  );
};
export default QuoteDetails;
