import { Avatar, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CustomizedTimeline from "./CustomizedTimeline.js"
import { Link } from "react-router-dom";
import FormDialog from './FormDialog';

export default function IssueComponent(props) {
    let { id } = useParams()
    // api call to get issue by id. right now, we are using the hardcoded issues passed through props
    useEffect(() => {
        console.log('API Call')
    }, [])

    const { homeData } = props
    const { issues, discussions, users } = homeData

    const [issueData, setData] = useState([]);
	useEffect(async () => {
        const result = await fetch("http://localhost:5000/get_si?siid=" + id.toString()).then(res => {
            return res.json()
        }).then(res => {
            console.log(res);
            setData(res)
        });
    }, [])

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

    const [commentData, setCommentData] = useState([]);
	useEffect(async () => {
        const result = await fetch("http://localhost:5000/get_comments_for_si?siid=" + id.toString()).then(res => {
            return res.json()
        }).then(res => {
            console.log("commentData ", res);
            var curarr = [];
            for (var i = 0; i < res.length; i++){
                curarr.push({
                    id: res[i][0],
                    date: res[i][1],
                    type: res[i][2],
                    socialID: res[i][3],
                    title: res[i][4],
                    description: res[i][5],
                    authorID: res[i][6]
                })
            }
            setCommentData(curarr)
            console.log("curarr here, ", curarr);
        });
    }, [])

    return (
        <div>
            <h1>Issue</h1>
            <h1>{id}</h1>
            <Grid>
                <Grid container spacing={3}>
                    <Grid item xs={5} md={5}>
                        {issueData == [] ? null :
                        <div>
                            <img src={issueData[4]} alt={issueData[2]} style={{width: '100%', borderRadius: '15px'}}></img>
                            <h1 style={{textAlign: "center"}}>{issueData[2]}</h1>
                            <p style={{textAlign: "center"}}>{issueData[3]}</p>  
                            </div>                      
                        }
                        
                        <br></br>
                        <h1 style={{textAlign: 'center'}}>What's Going On</h1>
                        <div style={{display: "flex", flexDirection: 'column', height: '35vh', overflow: 'scroll'}}>
                            {   
                            
                                commentData.map((x, index) => {
                                    if (allUserData == []) return null;
                                    if (!('authorID' in x)) return null;
                                    if (allUserData[x['authorID'] - 1] == null) return null;
                                    console.log(commentData, "HERE");
                                    console.log(x);
                                    return (
                                        <div>
                                            <p>
                                                <Link to={`/user/${x['authorID']}`} style={{display: 'flex', alignItems: 'center'}}>
                                                    <Avatar alt={allUserData[x['authorID'] - 1][1]} src={allUserData[x['authorID'] - 1][5]}></Avatar>
                                                    <b style={{margin: '5px'}}>{allUserData[x['authorID'] - 1][1]}</b>
                                                </Link>
                                                <br/>
                                                <div dangerouslySetInnerHTML={{ __html: x['description']}} />
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Grid>
                    <Grid item xs={7} md={7}>
                        <CustomizedTimeline/>
                    </Grid>
                </Grid>
            </Grid>
            <div>
                <FormDialog issueID={id} issueName={issueData==[]?null:issueData[2]}/>
            </div>
        </div>
    );
}