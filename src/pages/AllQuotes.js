import { useEffect } from "react";
import { getAllQuotes } from "../api/api";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../use-hook/use-http";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const AllQuotes = () => {
  const {
    sendRequest: fetchData,
    status,
    error,
    data: quotesData,
  } = useHttp(
    {
      url: "https://quotesroutingproject-default-rtdb.firebaseio.com/quotes.json",
    },
    getAllQuotes,
    true
  );

  useEffect(() => {
    let unmount = false;
    if (!unmount) {
      fetchData();
    }
    return () => {
      unmount = true;
    };
  }, []);

  if (status === "Pending") {
    return (
      <div className="centered focused">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "Completed" && error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "Completed" && (!quotesData || quotesData.length === 0)) {
    return <NoQuotesFound />;
  }

  console.log(quotesData);

  return <QuoteList quotes={quotesData} />;
};
export default AllQuotes;
