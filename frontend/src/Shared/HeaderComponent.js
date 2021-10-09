import React from "react";

import { Autocomplete, TextField, Grid } from "@mui/material";

import { Link, useHistory } from "react-router-dom";

export default function HeaderComponent(props) {
	const { issues } = props
	const history = useHistory()
	// TODO: Mutate issues array into dictionary when using real database

    return (
        <Grid container spacing={2} style={{backgroundColor: "#F4E8FF", marginTop: '7px'}}>
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
			</Grid>
		</Grid>
    )
}