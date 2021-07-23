// import './App.css';
import 'antd/dist/antd.css';
import 'swiper/swiper.scss';
import './styles/globals.scss'
// import './index.css';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
 
import LoginTemplate from './components/templates/login';
import UserProfileTemplate from './components/templates/user/profile';
import HomeTemplate from './components/templates/home';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
            <div className="header">
              <NavLink exact activeClassName="active" to="/">Home</NavLink>
              <br/>
              <NavLink activeClassName="active" to="/login">Login</NavLink>
              <br/>
              <NavLink activeClassName="active" to="/profile">Profile</NavLink>
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={HomeTemplate} />
                <Route path="/login" component={LoginTemplate} />
                <Route path="/Profile" component={UserProfileTemplate} />
              </Switch>
            </div>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
