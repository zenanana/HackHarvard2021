import React, {useState, useEffect} from "react";

import { Autocomplete, TextField, Grid } from "@mui/material";
import templogo from '../templogo.png'

import { Avatar } from '@mui/material';
import { Link, useHistory } from "react-router-dom";

export default function HeaderComponent(props) {
	const { issues, searchbox } = props
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

    return (
        <Grid container spacing={2} style={{marginTop: '7px'}}>
			<Grid item xs={4}>
				<Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
					<div style={{float:"left"}}>
					<Avatar src={templogo} alt={"Logo"} sx={{width: 48, height: 48}}></Avatar>
					</div>
					<div style={{marginLeft: 10, marginTop:5, fontFamily: "Arial", fontSize: 24}}>Justice</div>
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
						options={issues.map((issue) => issue.title)}
						onChange={(event, value) => {
							for (let i = 0; i < issues.length; i++) {
								if (issues[i].title === value) {
									history.push(`/issue/${issues[i].id}`)
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
					{allUserData != [] && allUserData.length > 4 &&
					<Avatar src={allUserData[4][5]} alt={allUserData[4][1]} sx={{width: 48, height: 48}}/>}
				</div>
			</Grid>
		</Grid>
    )
}