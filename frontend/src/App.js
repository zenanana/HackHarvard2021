import './App.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomeComponent from './Home/HomeComponent';
import IssueComponent from './Issues/IssueComponent';
import UserComponent from './Users/UserComponent';
import HeaderComponent from './Shared/HeaderComponent';

function App() {
    const [currentUser, setCurrentUser] = React.useState(2);
	return (
		<div>  
			  <Router>
				<div>
					<Switch>
						<Route path="/issue/:id">
                            <HeaderComponent searchbox={false} currentUser={currentUser}></HeaderComponent>
							<IssueComponent currentUser={currentUser}/>
						</Route>
						<Route path="/user/:id">
                            <HeaderComponent searchbox={false} currentUser={currentUser}></HeaderComponent>
							<UserComponent currentUser={currentUser}/>
						</Route>
						<Route path="/">
                            <HeaderComponent searchbox={true} currentUser={currentUser}></HeaderComponent>
							<HomeComponent currentUser={currentUser}/>
						</Route>
					</Switch>
				</div>
				</Router>
    	</div>
  	);
}

export default App;
