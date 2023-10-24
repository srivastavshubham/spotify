import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate,Outlet} from "react-router-dom";
import Home from './components/home';

const Error = (props) => {
  return (
    <div>
      <div style={{ textAlign:'center' }}>
        <i
          className="fa fa-ban"
          aria-hidden="true"
          style={{ fontSize: "100px",color:'red' }}
        ></i>
        <br />
        <br />
        <h2>This Page Is Under Maintainance</h2>
      </div>
    </div>
  );
};


function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/*" element={<Error />} />
    </Routes>
    </Router>
  );
}

export default App