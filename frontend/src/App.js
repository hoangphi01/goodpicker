import { BrowserRouter, Switch, Route } from 'react-router-dom'
import UserProfilePage from './pages/user'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import AboutUs from './pages/about-us'
import NewPost from './pages/new-post'
import Custom404 from './pages/404'
import {CookiesProvider} from 'react-cookie'

function App() {
	return (
		<CookiesProvider>
		<BrowserRouter>
			<div className="App">
				<div className="content">
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/profile" component={UserProfilePage} />
						<Route exact path="/about-us" component={AboutUs} />
						<Route exact path="/new-post" component={NewPost} />
						<Route component={Custom404} />
					</Switch>
				</div>
			</div>
		</BrowserRouter>
		</CookiesProvider>
	)
}

export default App
