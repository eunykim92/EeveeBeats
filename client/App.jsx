import React from 'react';
import './stylesheets/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './containers/Test';
import LandingContainer from './containers/LandingContainer';
import AppContainer from './containers/AppContainer';

const App = () => {
    return (
        // <div>
        //   ih
        //   <Test />
        // </div> heloo helloo

        <BrowserRouter>
          <div className='App'>
            <Routes>
              <Route path='/' element={<LandingContainer />} />
              <Route path='/app' element={<AppContainer />} />
              <Route path='/test' element={<Test />} />
            </Routes>
          </div>
        </BrowserRouter>
        
        //  <div className='App'>
        //   {isLoggedIn ? <AppContainer /> : <LandingContainer />}
        //   {/* <AppContainer /> */}
        // </div>
    )
}
export default App;
