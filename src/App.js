import Header from './components/header/header'
import Home from './components/home/home'
// import Profile from './components/profile/profile';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header></Header>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="profile" component={Profile} />
        </Routes>
      </BrowserRouter> */}
      <Home></Home>
    </div>
  );
}

export default App;
