// import './App.css';
import './index.css';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
 
import LoginTemplate from './components/templates/login';
import RegisterTemplate from './components/templates/register';
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
            <NavLink activeClassName="active" to="/register">Register</NavLink>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={HomeTemplate} />
              <Route path="/login" component={LoginTemplate} />
              <Route path="/register" component={RegisterTemplate} />
            </Switch>
          </div>
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
