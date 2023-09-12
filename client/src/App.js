import React from 'react';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import Nav from './modules/Nav/Nav';
import Home from './modules/Home/Home';
import Form from './modules/Form/Form';
import Detail from './modules/Detail/Detail';
import About from './modules/About/About';
import Landing from './modules/Landing/Landing';
import CreateForm from './modules/CreateForm/CreateForm';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/homepage" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreateForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
