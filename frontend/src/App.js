import { BrowserRouter, Switch, Route } from 'react-router-dom'
import UserProfilePage from './pages/user'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import AboutUs from './pages/about-us'
import NewPost from './pages/new-post'
import {CookiesProvider} from 'react-cookie'

function App() {
	return (
		<CookiesProvider>
		<BrowserRouter>
			<div className="App">
				<div className="content">
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route path="/login" component={LoginPage} />
						<Route path="/profile" component={UserProfilePage} />
						<Route path="/about-us" component={AboutUs} />
						<Route path="/new-post" component={NewPost} />
						<Route path="/profile" component={UserProfilePage} />
					</Switch>
				</div>
			</div>
		</BrowserRouter>
		</CookiesProvider>
	)
}

export default App
