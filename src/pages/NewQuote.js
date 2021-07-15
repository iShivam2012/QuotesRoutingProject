import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = () => {
  const onAddHandler = (quoteData) => {
    console.log(quoteData);
  };

  return <QuoteForm onAddQuote={onAddHandler} />;
};
export default NewQuote;
