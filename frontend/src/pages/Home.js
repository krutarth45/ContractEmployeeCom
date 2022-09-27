import { Fragment } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import HomeBody from '../components/HomeBody/HomeBody';

const Home = ({ mode, setMode }) => {
  return (
    <Fragment>
      <Header mode={mode} setMode={setMode} />
      <HomeBody mode={mode} setMode={setMode} />
      <Footer setMode={setMode} />
    </Fragment>
  );
};

export default Home;
