import { BrowserRouter, Switch, Route } from 'react-router-dom'
import UserProfilePage from './pages/user'
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
						<Route path="/profile" component={UserProfilePage} />
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
