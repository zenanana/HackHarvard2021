import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardActionArea, CardContent, Typography, Snackbar, Alert } from "@mui/material";

import { Link } from "react-router-dom";

import { motion } from 'framer-motion'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import HomeForm from './HomeForm'


export default function HomeComponent() {
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

	const fetchIssuesData = async () => {
        const result = await fetch("http://localhost:5000/list_si").then(res => {
            return res.json()
        }).then(res => {
            console.log(res);
            setData(res)
        });
    }

	const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

	//START SNACKBAR HANDLING
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };
    //END SNACKBAR HANDLING
	
	return (
		<div>
    		<Grid container spacing={3}>
				<Grid item xs={12}>
					<h2 style={{textAlign: "center", cursor: "default"}}>Trending Issues 🔥</h2>
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
											<Link to={`/issue/${issue[0]}`} style={{ textDecoration: 'none', color: 'black' }}>					
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
							</Grid>
						)
					})
				}
      		</Grid>
			{/*<FormDialog/>*/}
			<Grid>
				<Fab color="primary" aria-label="add" onClick={handleClickOpen} style={{bottom: 16, right: 16, position: "fixed"}}>
                    <AddIcon />
                </Fab>
				<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>Champion a new issue 🥇</DialogTitle>
				<HomeForm handleClose={handleClose} fetchIssuesData={fetchIssuesData} setSnackbarOpen={setSnackbarOpen}/>
				
				<DialogActions>
				<Button onClick={handleClose} color="error">Cancel</Button>
				</DialogActions>
				</Dialog>
			</Grid>

			<Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Issue added successfully!
                </Alert>
            </Snackbar>
    	</div>
  	);
}