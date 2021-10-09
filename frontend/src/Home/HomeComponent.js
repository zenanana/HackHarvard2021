import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardActionArea, CardContent, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import { motion } from 'framer-motion'
import FormDialog from './FormDialog';


export default function HomeComponent(props) {
	const { homeData } = props;
	const [issueData, setData] = useState([]);
	useEffect(async () => {
        const result = await fetch("http://localhost:5000/list_si").then(res => {
            return res.json()
        }).then(res => {
            console.log(res);
            setData(res)
        });
    }, [])
	console.log("issueData ", issueData);
	console.log("homeData ", homeData)
	return (
		<div>
    		<Grid container spacing={3}>
				<Grid item xs={12}>
					<h2 style={{textAlign: "center"}}>Currently Trending Issues</h2>
				</Grid>
				{
					issueData.map((issue, index) => {
						return (
							
							<Grid item xs={6} sm={4} md={4} key={index}>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									whileHover={{ scale: 1.03 }}>
										<Card sx={{ maxWidth: 345, maxHeight: 345 }}>
											<Link to={`/issue/${issue[0]}`}>					
												<CardActionArea>
													<CardMedia
													component="img"
													height="140"
													width="140"
													image={issue[4]}
													alt={issue[2]}
													/>
													<CardContent>
														<Typography gutterBottom variant="h5" component="div">
															{issue[2]}
														</Typography>
														<Typography variant="body2" color="text.secondary">
															{issue[3]}
														</Typography>
													</CardContent>
												</CardActionArea>
											</Link>
										</Card>
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
			<FormDialog/>
    	</div>
  	);
}