import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './pages/About.js';
import Policy from './pages/Policy.js';
import Home from './pages/Home.js';
import PageNotFound from './pages/PageNotFound.js';
import Contact from './pages/Contact.js';
import Login from './pages/Auth/Login.js';
import Register from './pages/Auth/Register.js';
import Post from './pages/Post.js';
import PostPage from './pages/PostPage.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/about" element={<About></About>}></Route>
      <Route path="/contact" element={<Contact></Contact>}></Route>
      <Route path="/policy" element={<Policy></Policy>}></Route>
      <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/post" element={<Post></Post>}></Route>
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
  );
}

export default App;
