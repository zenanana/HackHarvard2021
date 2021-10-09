import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Grid } from '@mui/material';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeComponent from './Home/HomeComponent';
import IssueComponent from './Issues/IssueComponent';
import UserComponent from './Users/UserComponent';

function App() {
	return (
		<div>
			
			{/* <Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Home
						</Typography>
						
					</Toolbar>
				</AppBar>
			</Box> */}
    		{/* <header>
        		HackHarvard2021
      		</header> */}
			  
			  <Router>
				<Grid item xs={12}>
					<Link to="/">
						<h1 style={{textAlign: "center"}}>Logo</h1>
					</Link>
			  	</Grid>
				<div>
					{/* <nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/users">Users</Link>
						</li>
					</ul>
					</nav> */}

					{/* A <Switch> looks through its children <Route>s and
						renders the first one that matches the current URL. */}
					<Switch>
						<Route path="/issues/:id">
							<IssueComponent />
						</Route>
						<Route path="/users/:id">
							<UserComponent />
						</Route>
						<Route path="/">
							<HomeComponent />
						</Route>
					</Switch>
				</div>
				</Router>
    	</div>
  	);
}

export default App;
