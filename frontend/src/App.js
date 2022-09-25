import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import HomeBody from './components/HomeBody/HomeBody';

const App = () => {
  return (
    <Fragment>
      <Header />
      <HomeBody />
      <Footer />
    </Fragment>
  );
};

export default App;
