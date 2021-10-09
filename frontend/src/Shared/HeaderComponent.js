import React from "react";

import { Autocomplete, TextField, Grid } from "@mui/material";

import { Link } from "react-router-dom";

const issues = [
	{
		id: 1,
		name: "Climate Change"
	},
	{
		id: 2,
		name: "Human Rights"
	},
	{
		id: 3,
		name: "Hunger"
	},
	{
		id: 4,
		name: "Droughts"
	},
	{
		id: 5,
		name: "Famine"
	},
	{
		id: 6,
		name: "War"
	}
]

export default function HeaderComponent() {
    return (
        <Grid container spacing={2} style={{marginTop: '7px'}}>
			<Grid item xs={4}>
			</Grid>
			<Grid item xs={4}>
				<Link to="/">
					<h1 style={{textAlign: 'center', marginTop: '0px'}}>Logo</h1>
				</Link>
			</Grid>
			<Grid item xs={4}>
				<div style={{textAlign: 'end'}}>
					<Autocomplete
						freeSolo
						disableClearable
						size="small"
						id="searchbox"
						options={issues.map((issue) => issue.name)}
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
			</Grid>
		</Grid>
    )
}