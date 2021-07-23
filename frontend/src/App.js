import { BrowserRouter, Switch, Route } from 'react-router-dom'
import UserPage from './pages/user/profile'
import HomePage from './pages/home'
import LoginPage from './pages/login'

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<div className="content">
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route path="/login" component={LoginPage} />
						<Route path="/profile" component={UserPage} />
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
