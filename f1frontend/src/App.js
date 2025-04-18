// Import global styles and Bootstrap CSS + Icons
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Import the components used in the app
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddDriver from "./drivers/AddDriver";
import ViewDriver from "./drivers/ViewDriver";
import EditDriver from "./drivers/EditDriver";
import DeleteDriver from "./drivers/DeleteDriver";
import EditDriverForm from "./drivers/EditDriverForm";

// Main App component
function App() {
  return (
    <div className="App">
      {/* Wrap the app in a Router so we can switch between pages */}
      <Router>
        {/* Display the navigation bar at the top of every page */}
        <Navbar />

        {/* Define all routes (page paths) the user can visit */}
        <Routes>
          {/* Home page with menu options */}
          <Route exact path="/" element={<Home />} />

          {/* Form to add a new driver */}
          <Route exact path="/addDrivers" element={<AddDriver />} />

          {/* Page that shows a table of all drivers */}
          <Route exact path="/viewDrivers" element={<ViewDriver />} />

          {/* Page to list drivers and go to edit */}
          <Route exact path="/editDrivers" element={<EditDriver />} />

          {/* Page to list drivers and delete one */}
          <Route exact path="/deleteDrivers" element={<DeleteDriver />} />

          {/* Form page to edit a specific driver by ID */}
          <Route
            exact
            path="/editDriverForm/:id"
            element={<EditDriverForm />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
