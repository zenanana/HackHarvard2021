import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardActionArea, CardContent, Typography, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";

import { Link } from "react-router-dom";

import { motion } from 'framer-motion'
import FormDialog from './FormDialog';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Form from './Form'


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

	const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
	
	return (
		<div style={{ marginLeft: '5vw' }}>
    		<Grid container spacing={3}>
				<Grid item xs={12}>
					<h2 style={{textAlign: "center", fontFamily:'Arial'}}>Trending Issues</h2>
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
				<SpeedDial
					ariaLabel="SpeedDial basic example"
					sx={{ position: 'absolute', bottom: 16, right: 16 }}
					icon={<SpeedDialIcon />}
					>
					<SpeedDialAction
						key={1}
						icon={<AddIcon/>}
						tooltipTitle={'Add Issue'}
						onClick={handleClickOpen}/>
				</SpeedDial>
				<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>Add new issue</DialogTitle>
				<Form/>
				
				<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				</DialogActions>
				</Dialog>
			</Grid>


    	</div>
  	);
}