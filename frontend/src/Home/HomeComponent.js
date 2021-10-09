import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

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
	]
		
}

export default function HomeComponent() {

	const [issueData, setData] = useState([]);
    useEffect(async () => {
        const result = await fetch("http://localhost:5000/list_si").then(res => {
            return res.json()
        }).then(res => {
            console.log(res);
            setData(res[0])
        });
    }, [])

	return (
		<div>
			<h1>Just Checking {issueData}</h1>
    		<Grid container spacing={2}>
				<Grid item xs={12}>
					<h2 style={{textAlign: "center"}}>Currently Trending Issues</h2>
				</Grid>
				{
					homeData.issues.map((issue, index) => {
						return (
							<Grid item xs={12} sm={6} md={4} key={index}>
								<Link to={`issues/${issue.id}`}>
									<div style={{textAlign: "center"}}>
										<img src={issue.image} alt={issue.name} style={{width: "100%"}} />
										<h3>{issue.name}</h3>
										<p>{issue.description}</p>
									</div>
								</Link>
							</Grid>
						)
					})
				}
      		</Grid>
    	</div>
  	);
}