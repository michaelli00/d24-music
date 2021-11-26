import React from 'react';
import ReactDOM from 'react-dom';
import { 
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './App';
import Header from './components/Header/Header';
import TIGroup from './components/TIGroup/TIGroup';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'katex/dist/katex.min.css';
import './index.css';

ReactDOM.render(
  <HashRouter>
    <Header/>
    <Routes>
      <Route
        path="/"
        element={<App/>}
      />
      <Route
        path="/ti"
        element={<TIGroup/>}
      />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);
