import { Fragment } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import HomeBody from '../components/HomeBody/HomeBody';

const Home = () => {
  return (
    <Fragment>
      <Header />
      <HomeBody />
      <Footer />
    </Fragment>
  );
};

export default Home;
