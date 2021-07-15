import QuoteList from "../components/quotes/QuoteList";

const DUMMY_DATA = [
  { id: "q1", author: "Shivam", text: "I can do this!" },
  { id: "q2", author: "Lord Shivam", text: "I can do this all day and night!" },
];

const AllQuotes = () => {
  return <QuoteList quotes={DUMMY_DATA} />;
};
export default AllQuotes;
