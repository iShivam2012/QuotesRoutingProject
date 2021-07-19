import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";
import useHttp from "../use-hook/use-http";
import { addQuote } from "../api/api";
import { useEffect } from "react";

const NewQuote = () => {
  const history = useHistory();
  const { sendRequest, status } = useHttp(
    {
      url: "https://quotesroutingproject-default-rtdb.firebaseio.com/quotes.json",
      method: "POST",
    },
    addQuote
  );

  useEffect(() => {
    if (status === "Completed") {
      history.push("/quotes");
    }
  }, [status]);
  const onAddHandler = (quoteData) => {
    sendRequest(quoteData);
    // console.log(quoteData);
  };

  return (
    <QuoteForm isLoading={status === "Pending"} onAddQuote={onAddHandler} />
  );
};
export default NewQuote;
