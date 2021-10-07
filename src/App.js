import './App.css';
import Navbar from './Component/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import About from './Component/About';
import Home from './Component/Home';
import Contact from './Component/Contact';
import Member from './Component/Member';
import Footer from './Component/Footer';
import Alert from './Component/Alert';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar'

function App() {

  const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(0);

  const showAlert = (massage, type) => {
    setAlert({
      msg: massage,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  const increasePro = (progress)=>{
    setProgress(progress);
  }

  return (
    <>
      <Router>

        <Navbar showAlert={showAlert} setProgress={increasePro} />
        <LoadingBar color='#f11946' height='3' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <Alert alert={alert} />

        <Switch>
          <Route exact path="/">
            <Home setProgress={increasePro}/>
            <Member />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

          <Route exact path="/contact">
            <Contact />
            <Member />
          </Route>

        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
