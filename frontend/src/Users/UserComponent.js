import React, { useEffect, useState }from 'react';

import { useParams } from 'react-router';

import { Avatar, Grid } from '@mui/material';

export default function UserComponent(props) {

    let { id } = useParams();

    // hardcoded users
    const { homeData } = props
    const { issues, users } = homeData

    // const [data, setData] = useState([]);
    // useEffect(async () => {
    //     const result = await fetch("http://localhost:5000/get_user?user=bryan").then(res => {
    //         return res.json()
    //     }).then(res => {
    //         console.log(res);
    //         setData(res)
    //     });
    //     //console.log(result.json());
    //     //console.log(result.body)
    //     //console.log(result.json());
    //     //console.log(result.data);
    //     //setData(result.data);
    // }, [])
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={4} md={4}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Avatar src={users[id].avatar} alt={users[id].name}></Avatar>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <h2>{users[id].name}</h2>
                            <p style={{fontStyle: 'italic'}}>{users[id].pronouns}</p>
                            <p>{users[id].bio}</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={8} md={8}>
                    
                </Grid>
            </Grid>
        </div>
    );
}