import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Launches, Launch } from './components';
import './App.css';

const client = new ApolloClient({
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <h1 style={{ textAlign: 'center' }}>SpaceX</h1>
          <Route exact path="/" component={Launches} />
          <Route path="/launch/:flight_number" component={Launch} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
