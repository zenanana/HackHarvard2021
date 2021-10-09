import React, { useEffect, useState }from 'react';

import { useParams } from 'react-router';

import { Avatar, Grid, Card, CardContent, CardMedia, CardActionArea, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import IssuesListComponent from './IssuesListComponent';

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
            <Grid container>
                <Grid item xs={4} md={4} style={{marginLeft: "15px"}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{height: '40vh'}}>
                            <Avatar src={users[id].avatar} alt={users[id].name} sx={{width: 300, height: 300}}></Avatar>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', height: '48vh'}}>
                            <h2>{users[id].name}</h2>
                            <p style={{fontStyle: 'italic'}}>{users[id].pronouns}</p>
                            <p>{users[id].bio}</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={7} md={7}>
                    <div style={{height: '28vh'}}>
                        <h3 style={{marginBottom: '0px'}}>
                            Top Contributions
                        </h3>
                        <IssuesListComponent issuesList={users[id].topIssues} issues={issues}></IssuesListComponent>
                    </div>
                    <div style={{height: '26vh'}}>
                        <h3 style={{marginBottom: '0px'}}>
                            Recent Contributions
                        </h3>
                        <IssuesListComponent issuesList={users[id].recentIssues} issues={issues}></IssuesListComponent>
                    </div>
                    <div style={{height: '28vh'}}>
                        <h3 style={{marginBottom: '0px'}}>
                            Friends/Collaborators
                        </h3>
                        {/* {
                            users[id].friends.map((friend, index) => {
                                return (
                                    <div key={index} style={{display: 'flex', flexDirection: 'row', marginBottom: '10px'}}>
                                        <Avatar src={friend.avatar} alt={friend.name} sx={{width: 50, height: 50}}></Avatar>
                                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>
                                            <Link to={`/users/${friend.id}`}>
                                                <h4>{friend.name}</h4>
                                            </Link>
                                            <p style={{fontStyle: 'italic'}}>{friend.pronouns}</p>
                                        </div>
                                    </div>
                                )
                            })
                        } */}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}