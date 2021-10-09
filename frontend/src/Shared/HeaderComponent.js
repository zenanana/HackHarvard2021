import React, {useState, useEffect} from "react";

import { Autocomplete, TextField, Grid, Badge } from "@mui/material";
import templogo from '../templogo.png'

import { Avatar } from '@mui/material';
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { styled } from "@mui/system";
import StyledBadgeComponent from "./StyledBadgeComponent";

export default function HeaderComponent(props) {
	const { searchbox, currentUser } = props
	const history = useHistory()
	// TODO: Mutate issues array into dictionary when using real database

	const [allUserData, setAllUserData] = useState([]);
	useEffect(async () => {
        const result = await fetch("http://localhost:5000/list_user").then(res => {
            return res.json()
        }).then(res => {
            console.log(res);
            setAllUserData(res)
            console.log("ALL USER DATA ", res);
        });
    }, [])
	console.log("ALL USER DATA: ", allUserData);

	const [issues, setData] = useState([]);
	useEffect(async () => {
        const result = await fetch("http://localhost:5000/list_si").then(res => {
            return res.json()
        }).then(res => {
            console.log(res);
            setData(res)
        });
    }, [])
	console.log("ALL ISSUE DATA: ", issues);

    return (
        <Grid container spacing={2} style={{marginTop: '0px', border: '1px solid rgba(34,36,38,.15)', boxShadow: "0 1px 2px 0 rgb(34 36 38 / 15%)", marginBottom: '20px'}}>
			<Grid item xs={4}>
				<Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
					<div style={{cssFloat:"left"}}>
					<Avatar src={templogo} alt={"Logo"} sx={{width: 48, height: 48}}></Avatar>
					</div>
					<div style={{marginLeft: 10, marginTop:10, fontSize: 24}}>Justice</div>
				</Link>
			</Grid>


			<Grid item xs={4}>
				{
					searchbox ? (
						<div style={{textAlign: 'end'}}>
					<Autocomplete
						freeSolo
						disableClearable
						size="small"
						id="searchbox"
						options={issues.map((issue) => issue[2])}
						onChange={(event, value) => {
							for (let i = 0; i < issues.length; i++) {
								if (issues[i][2] === value) {
									history.push(`/issue/${issues[i][0]}`)
								}
							}
						}}
						renderInput={(params) => (
						<TextField
							{...params}
							label="Search"
							InputProps={{
							...params.InputProps,
							type: 'search',
							}}
						/>
						)}
					/>
				</div>
					) : null
				}
			</Grid>
			<Grid item xs={3}>
			</Grid>
			<Grid item xs={1}>
				<div style={{marginTop:-7}}>
					{allUserData !== [] && allUserData.length > 4 &&
					<Link to={`/user/${currentUser+1}`}>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							whileHover={{ scale: 1.03 }}
							style={{marginBottom: "10px"}}>
							<StyledBadgeComponent
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								variant="dot">
								<Avatar src={allUserData[currentUser][5]} alt={allUserData[currentUser][1]} sx={{width: 60, height: 60}}/>
							</StyledBadgeComponent>
						</motion.div>
					</Link>}
				</div>
			</Grid>
		</Grid>
    )
}