import { BrowserRouter, Switch, Route } from 'react-router-dom'
import UserPage from './pages/user/profile'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import AboutUs from './pages/about-us'
import NewPost from './pages/new-post'

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<div className="content">
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route path="/login" component={LoginPage} />
						<Route path="/profile" component={UserPage} />
						<Route path="/about-us" component={AboutUs} />
						<Route path="/new-post" component={NewPost} />
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
