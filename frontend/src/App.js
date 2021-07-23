import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import LoginTemplate from './components/templates/login'
import RegisterTemplate from './components/templates/register'
import HomePage from './pages/home'

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<div className="content">
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route path="/login" component={LoginTemplate} />
						<Route path="/register" component={RegisterTemplate} />
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
