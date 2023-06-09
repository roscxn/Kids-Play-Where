import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import Map from "../../components/Map/Map";
import NavBar from "../../components/NavBar/NavBar";
import BookmarksPage from "../BookmarksPage/BookmarksPage";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import ViewAll from "../ViewAll/ViewAll";
import LocationDetails from "../LocationDetails/LocationDetails";

const App = () => {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/user/bookmarks" element={<BookmarksPage user={user} />} />
        <Route path="/user/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/user/login" element={<Login setUser={setUser} />} />
        <Route path="/location/viewall" element={<ViewAll user={user} />} />
        <Route path="/location/:id" element={<LocationDetails user={user} />} />
      </Routes>
    </>
  );
};

export default App;
