import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardActionArea, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";

import { Link } from "react-router-dom";

import { motion } from 'framer-motion'


export default function HomeComponent(props) {
	const { homeData } = props;
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
    		<Grid container spacing={3}>
				<Grid item xs={12}>
					<h2 style={{textAlign: "center"}}>Currently Trending Issues</h2>
				</Grid>
				{
					homeData.issues.map((issue, index) => {
						return (
							
							<Grid item xs={6} sm={4} md={4} key={index}>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									whileHover={{ scale: 1.03 }}>
									<Link to={`/issue/${issue.id}`}>									
										<Card sx={{ maxWidth: 345 }}>
											<CardActionArea>
												<CardMedia
												component="img"
												height="140"
												image={issue.image}
												alt={issue.name}
												/>
												<CardContent>
													<Typography gutterBottom variant="h5" component="div">
														{issue.name}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														{issue.description}
													</Typography>
												</CardContent>
											</CardActionArea>
										</Card>
									</Link>
								</motion.div>
								{/* <motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									whileHover={{ scale: 1.03 }}
									style={{cursor: 'pointer', position: "relative"}}>
									<img src={issue.image} alt={issue.name} style={{width: "100%"}} />
									<motion.div
										style={{display: "flex", width: "100%", height: "100%", opacity: 0, position: 'absolute', backgroundColor: 'rgba(126, 166, 156, 0.8)'}}
										whileHover={{ opacity: 1, scale: 1.03 }}
										transition={{ duration: 0.2 }}
										onClick={() => {
											changeModalOpacity(1);
											changeModalVisibility("visible");
										}}
										>
										<h2>dsafdsaf</h2>
									</motion.div>
								</motion.div> */}
								{/* <Link to={`issues/${issue.id}`}>
									<div style={{textAlign: "center"}}>
										<img src={issue.image} alt={issue.name} style={{width: "100%"}} />
										<h3>{issue.name}</h3>
										<p>{issue.description}</p>
									</div>
								</Link> */}
							</Grid>
						)
					})
				}
      		</Grid>
    	</div>
  	);
}