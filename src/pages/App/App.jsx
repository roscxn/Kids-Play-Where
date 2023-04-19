import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import Map from "../Map/Map";
import NavBar from "../../components/NavBar/NavBar";
import Bookmarks from "../Bookmarks/Bookmarks";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import Search from "../Search/search";
import ViewAll from "../ViewAll/ViewAll";

const App = () => {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/user/bookmarks" element={<Bookmarks user={user} />} />
        <Route path="/user/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/user/login" element={<Login setUser={setUser} />} />
        <Route path="/location/search" element={<Search />} />
        <Route path="/location/viewall" element={<ViewAll />} />
      </Routes>
    </>
  );
};

export default App;
