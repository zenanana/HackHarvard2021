import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Grid } from '@mui/material';

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
			"image": "https://climate.nasa.gov/system/content_pages/main_images/1320_effects-image.jpg",
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
				authorId: '10',
				content: 'Down with global warming! Find out more about how big oil companies harm the planet <a href="https://www.youtube.com/watch?v=uKxyLmbOc0Q" target="_blank">here</a>!'
			},
			{
				authorId: '11',
				content: 'Agreed! Let\'s march this Saturday morning!'
			},
			{
				authorId: '12',
				content: 'Hi new members! Climate change is an extremely pressing matter backed by decades of scientific evidence. Please check out the useful links and previous contributions to the cause on the right panel on this page! Hope to see you get involved in our cause! Planet Earth is under attack, we stand up and fight back!'
			}
		],
		'2': [
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
			topIssues: [3, 4], // ids of issues
			interestedIssues: [3] // ids of issues
		},
		'11': {
			name: 'Rin',
			avatar: 'https://i.pinimg.com/originals/23/0d/3c/230d3c51e51f16034b97aa6aa8e65246.jpg',
			pronouns: 'she/her',
			bio: 'Curry cup noodles & camping! 🍜⛺⛰️',
			topIssues: [1, 2],
			interestedIssues: [1, 2, 3]
		},
		'12': {
			name: 'Tohsaka',
			avatar: 'https://b.thumbs.redditmedia.com/0Pi3MkSmswhq46VHmFS8EUGbx-PNYiNify9pUSbeVeg.png',
			pronouns: 'she/her',
			bio: 'Love purple haired girls and guys who shoot arrows',
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
