import React from 'react';
import './App.css';
import Row from './Row';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import requests from './requests'
import Banner from './Banner'
import Nav from './Nav';
import Card from './utils/Card';
import MoviePage from './MoviePage';
import Favourites from './Favourites';
import WatchLater from './WatchLater';
function App() {

  return (
    // 2:16:21
    <div className="app">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/favourite">
            <Favourites />
          </Route>
          <Route exact path="/watchlater">
            <WatchLater />
          </Route>
          <Route path="/:id">
            <MoviePage />
          </Route>
          <Route exact path="/mylist">
            <Card></Card>
          </Route>


          <Route rxact path="/">
            <Banner />
            <Row
              title="NETFLIX ORIGINALS"
              fetchUrl={requests.fetchNetflixOriginals}
              isLargeRow
            />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
