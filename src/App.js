import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Listing from "./components/Leaves/Listing";
import CreateLeave from "./components/Leaves/CreateLeave";
import EditLeave from "./components/Leaves/EditLeave";
import CalendarView from "./components/Leaves/CalendarView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/listing" element={<Listing />}></Route>
        <Route path="/createleave" element={<CreateLeave />}></Route>
        <Route path="/editleave" element={<EditLeave />}></Route>
        <Route path="/calendar" element={<CalendarView />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
