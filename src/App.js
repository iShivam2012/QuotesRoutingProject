import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import AllQuotes from "./pages/AllQuotes";

const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const NoPageFound = React.lazy(() => import("./pages/NoPageFound"));
const QuoteDetails = React.lazy(() => import("./pages/QuoteDetails"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quotesId">
            <QuoteDetails />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NoPageFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
