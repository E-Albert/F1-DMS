import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddDriver from './drivers/AddDriver';
import ViewDriver from './drivers/ViewDriver';
import EditDriver from './drivers/EditDriver';
import DeleteDriver from './drivers/DeleteDriver';
import EditDriverForm from './drivers/EditDriverForm';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addDrivers" element={<AddDriver />} />
          <Route exact path="/viewDrivers" element={<ViewDriver />} />
          <Route exact path="/editDrivers" element={<EditDriver />} />
          <Route exact path="/deleteDrivers" element={<DeleteDriver />} />
          <Route exact path="/editDriverForm/:id" element={<EditDriverForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
