import React from 'react';
import Search from './pages/Search/Search';
import { ApolloProvider } from '@apollo/client';
import useApolloClient from './hooks/useApolloClient';
import "./App.css"


const App: React.FC = () => {
  const client = useApolloClient();

  return (
    <ApolloProvider client={client}>
      <div className="main">
        <Search />
      </div>
    </ApolloProvider>
  );
};

export default App;
