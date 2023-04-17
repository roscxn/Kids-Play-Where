import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Location from '../Location/Location'
import NavBar from "../../components/NavBar/NavBar";
import Bookmark from '../Bookmark/Bookmark';
import SignUp from '../SignUp/SignUp';

const App = () => {
  const [user, setUser] = useState(null);

  return(
  <>
  <NavBar />
    <h2>
      Hello world!
    </h2>
    <h1>App Page</h1>
    <Location />
  <Routes>
    <Route path="/user/bookmark" element={<Bookmark />} />
    <Route path="/user/signup" element={<SignUp />} />
  </Routes>
  
  
  </>
  
  )
}

export default App;