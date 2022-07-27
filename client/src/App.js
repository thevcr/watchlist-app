import QuizPage from "./pages/QuizPage";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage"
import React from "react";
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
      <BrowserRouter>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/QuizPage" element={<QuizPage />} />
          </Routes>
        </>
      </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
