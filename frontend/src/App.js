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
import HeaderComponent from './Shared/HeaderComponent';

const homeData = {
	issues: [
		{
			"id": 1,
			"name": "Climate Change",
			"description": "Earth is warming up!",
			"image": "https://climate.nasa.gov/system/content_pages/main_images/1320_effects-image.jpg"
		},
		{
			"id": 2,
			"name": "Global Warming",
			"description": "Earth is warming up!",
			"image": "https://climate.nasa.gov/system/content_pages/main_images/1320_effects-image.jpg"
		},
		{
			"id": 3,
			"name": "Global Warming",
			"description": "Earth is warming up!",
			"image": "https://climate.nasa.gov/system/content_pages/main_images/1320_effects-image.jpg"
		},
		{
			"id": 4,
			"name": "Global Warming",
			"description": "Earth is warming up!",
			"image": "https://climate.nasa.gov/system/content_pages/main_images/1320_effects-image.jpg"
		}
	],

	discussions: {
		// sort according to date of post?
		'1': [
			{
				author: 'Sophie',
				authorId: '10',
				content: 'Down with global warming! Find out more about how big oil companies harm the planet <a href="https://www.youtube.com/watch?v=uKxyLmbOc0Q" target="_blank">here</a>!'
			},
			{
				author: 'Rin',
				authorId: '11',
				content: 'Agreed! Let\'s march this Saturday morning!'
			}
		]
	},

	users: {
		'10': {
			name: 'Sophie',
			avatar: 'https://ghiblimerchandise.com/wp-content/uploads/2021/06/Why-did-Sophies-age-keep-changing3-1024x576.jpg',
			pronouns: 'she/her',
			bio: 'Love howling, moving, and castles!',
			topIssues: [3, 4],
			interestedIssues: [3]
		},
		'11': {
			name: 'Rin',
			avatar: 'https://i.pinimg.com/originals/23/0d/3c/230d3c51e51f16034b97aa6aa8e65246.jpg',
			pronouns: 'he/him',
			bio: 'Curry cup noodles & camping! 🍜⛺⛰️',
			topIssues: [1, 2],
			interestedIssues: [1, 2, 3]
		}
	}
		
}

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
				<HeaderComponent></HeaderComponent>
				<div>
					<Switch>
						<Route path="/issue/:id">
							<IssueComponent homeData={homeData} />
						</Route>
						<Route path="/user/:id">
							<UserComponent homeData={homeData} />
						</Route>
						<Route path="/">
							<HomeComponent homeData={homeData} />
						</Route>
					</Switch>
				</div>
				</Router>
    	</div>
  	);
}

export default App;
