import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Pages/homepage";
import SignUp from "./Pages/signup"; // Make sure the component name starts with an uppercase letter
import LogIn from "./Pages/login";
import Buses from "./Pages/Buses";
import BusDetails from "./Pages/busDetails";
import { dataContext } from "./context/dataContext";
import UttarPradeshCityDistances from "./Pages/cityDistance";
import Booking from "./components/booking";
import BookingDetails from "./Pages/bookingDetails";
import Profile from "./Pages/profile";
import axios from "axios";


function App() {
  const [buses, setBuses] = useState([]);
  const [user, setUser] = useState();
  const [date, setDate] = useState();
  const [loginStatus, setLoginStatus] = useState(false);
  const [userId, setUserId] = useState();

  const userAuthenticated = () => {
    axios.get("http://localhost:8000/users/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.data.auth) {
        setUserId(response.data.user);
        setLoginStatus(true);
        console.log(response.data);
      } else {
        setLoginStatus(false);
        setUser(null);
      }
    }).catch((error) => {
      console.log(error);
      setLoginStatus(false);
    });
  };

  const getUser = () => {
    if (!userId) return;
    axios.get(`http://localhost:8000/user/${userId}`).then((response) => {
      setUser(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    userAuthenticated();
  }, []);

  useEffect(() => {
    getUser();
  }, [userId]);

  if (loginStatus === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <dataContext.Provider value={{ buses, setBuses, user, setUser, date, setDate, loginStatus, setLoginStatus }}>
          <Routes>
            <Route
              path="/citydistances"
              element={<UttarPradeshCityDistances />}
            />
            <Route path="/booking" element={loginStatus ? <Booking /> : <Navigate to="/login" />} />
            <Route path="/bookingdetails/:busId" element={loginStatus ? <BookingDetails /> : <Navigate to="/login" />} />
            <Route path="/profile" element={loginStatus ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/buses" element={<Buses />} />{" "}
            <Route path="/viewdetails/:id" element={<BusDetails />} />
            <Route path="/" element={!loginStatus ? <Dashboard /> : <Navigate to="/profile" />} />
            <Route path="/signup" element={!loginStatus ? <SignUp /> : <Navigate to="/profile" />} />
            {/* Make sure component name starts with uppercase */}
            <Route path="/login" element={!loginStatus ? <LogIn /> : <Navigate to="/profile" />} />

          </Routes>
        </dataContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
