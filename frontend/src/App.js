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

const homeData = {
	// sid
	// title
	// description
	// date added
	// image
	issues: [
		{
			"id": 1,
			"title": "Climate Change",
			"description": "Earth is warming up!",
			"image": "https://climate.nasa.gov/system/content_pages/main_images/1320_effects-image.jpg",
		},
		{
			"id": 2,
			"title": "Human Rights",
			"description": "People are suffering!",
			"image": "https://i1.wp.com/opiniojuris.org/wp-content/uploads/human-rights-day-feature_1290x688_ms_w1140_h545_bg.jpg?fit=1140%2C545"
		},
		{
			"id": 3,
			"title": "Gender Equality",
			"description": "Equal rights for all!",
			"image": "https://content.unops.org/photos/News-and-Stories/Publications/_image1920x900/Cover-illustration.jpg?mtime=20200701121513&focal=none&tmtime=20210511124317"
		},
		{
			"id": 4,
			"title": "War on Drugs",
			"description": "- and the drugs are winning!",
			"image": "https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc4NTk5MjE4Mzc0MzY3/gettyimages-607566618-2.jpg"
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
				authorId: '12',
				content: 'Everyone deserves to have basic human rights! Strike down systematic oppression!'
			},
			{
				authorId: '11',
				content: 'Please direct more attention to the humanitarian crisis in Xinjiang - a gross violation of human rights!'
			}
		],
		'3': [
			{
				authorId: '10',
				content: 'Enough is enough! Check out the sidebar to find out how to be an ally.'
			},
		],
		'4': [
			{
				authorId: '12',
				content: 'The War on Drugs is evidently killing more people than it claims to help. Let\'s stop this right now and start legalizing certain drugs such as weed.'
			},
			{
				authorId: '11',
				content: 'Agreed. Ample scientific evidence for the benefits of certain drugs, such as LSD, mushrooms and weed, have been found. Let\'s not delay any further - there are people dying that could be saved by legalizaiton.'
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
			recentIssues: [3] // ids of issues
		},
		'11': {
			name: 'Rin',
			avatar: 'https://i.pinimg.com/originals/23/0d/3c/230d3c51e51f16034b97aa6aa8e65246.jpg',
			pronouns: 'she/her',
			bio: 'Curry cup noodles & camping! 🍜⛺⛰️',
			topIssues: [1, 2],
			recentIssues: [1, 2, 3]
		},
		'12': {
			name: 'Tohsaka',
			avatar: 'https://b.thumbs.redditmedia.com/0Pi3MkSmswhq46VHmFS8EUGbx-PNYiNify9pUSbeVeg.png',
			pronouns: 'she/her',
			bio: 'Love purple haired girls and guys who shoot arrows',
			topIssues: [2, 3],
			recentIssues: [3]
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
				<div>
					<Switch>
						<Route path="/issue/:id">
                            <HeaderComponent issues={homeData.issues} searchbox={false}></HeaderComponent>
							<IssueComponent homeData={homeData} />
						</Route>
						<Route path="/user/:id">
                            <HeaderComponent issues={homeData.issues} searchbox={false}></HeaderComponent>
							<UserComponent homeData={homeData} />
						</Route>
						<Route path="/">
                            <HeaderComponent issues={homeData.issues} searchbox={true}></HeaderComponent>
							<HomeComponent homeData={homeData} />
						</Route>
					</Switch>
				</div>
				</Router>
    	</div>
  	);
}

export default App;
