import { Avatar, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function IssueComponent(props) {
    let { id } = useParams()
    // api call to get issue by id. right now, we are using the hardcoded issues passed through props
    useEffect(() => {
        console.log('API Call')
    }, [])

    const { homeData } = props
    const { issues, discussions, users } = homeData

    return (
        <div>
            <Grid>
                <Grid container spacing={3}>
                    <Grid item xs={5} md={5}>
                        <img src={issues[id-1].image} alt={issues[id-1].title} style={{width: '100%', borderRadius: '15px'}}></img>
                        <h1 style={{textAlign: "center"}}>{issues[id-1].title}</h1>
                        <p style={{textAlign: "center"}}>{issues[id-1].description}</p>
                        <br></br>
                        <h1 style={{textAlign: 'center'}}>What's Going On</h1>
                        <div style={{display: "flex", flexDirection: 'column', height: '35vh', overflow: 'scroll'}}>
                            {
                                discussions[id].map((discussion, index) => {
                                    return (
                                        <div>
                                            <p>
                                                <Link to={`/user/${discussion.authorId}`} style={{display: 'flex', alignItems: 'center'}}>
                                                    <Avatar alt={users[discussion.authorId].name} src={users[discussion.authorId].avatar}></Avatar>
                                                    <b style={{margin: '5px'}}>{users[discussion.authorId].name}</b>
                                                </Link>
                                                <br/>
                                                <div dangerouslySetInnerHTML={{ __html: discussion.content}} />
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Grid>
                    <Grid item xs={7} md={7}>
                        
                    </Grid>
                    
                </Grid>
            </Grid>
            <div>

            </div>
        </div>
    );
}