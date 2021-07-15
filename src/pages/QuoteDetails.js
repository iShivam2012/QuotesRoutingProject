import { Route, useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import HighLightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_DATA = [
  { id: "q1", author: "Shivam", text: "I can do this!" },
  { id: "q2", author: "Lord Shivam", text: "I can do this all day and night!" },
];

const QuoteDetails = () => {
  const params = useParams();
  const quote = DUMMY_DATA.find((quote) => quote.id === params.quotesId);

  if (!quote) {
    return <NoQuotesFound />;
  }

  return (
    <section>
      <HighLightedQuote text={quote.text} author={quote.author} />
      {/* <Route path="/quotes/:quotesId/comments"> */}
      <Route path={`/quotes/${params.quotesId}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};
export default QuoteDetails;
