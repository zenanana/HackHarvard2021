import { Avatar, CircularProgress, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CustomizedTimeline from "./CustomizedTimeline.js"
import { Link } from "react-router-dom";
import FormDialog from './FormDialog';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Form from './Form'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentsComponent from "./CommentsComponent.js";

export default function IssueComponent(props) {
    let { id } = useParams()

    const [issueData, setData] = useState([]);
	useEffect(async () => {
        const result = await fetch("http://localhost:5000/get_si?siid=" + id.toString()).then(res => {
            return res.json()
        }).then(res => {
            console.log("issue data here = ", res);
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


    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [isTimelineLoading, setTimelineLoading] = useState(true);
    const [commentsOpen, setCommentsOpen] = useState(false);

    let speedDialIcons = [
        {
            icon: <AddIcon/>,
            name: "Add Event/Comment",
            onClick: handleClickOpen
        },
        {
            icon: <DeleteIcon/>,
            name: "Delete Issue",
            onClick: () => {
                console.log("Delete Issue")
            }
        },
        {
            icon: <EditIcon/>,
            name: "Edit Issue",
            onClick: () => {
                console.log("Edit Issue")
            }
        }
    ]

    return (
        <div style={{marginTop: '10px'}}>
            <Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6} md={6}>
                        <ToggleButtonGroup
                            value={commentsOpen}
                            exclusive
                            onChange={() => setCommentsOpen(!commentsOpen)}
                            aria-label="left toggle"
                            size="small"
                            style={{marginBottom: "5px", marginLeft: "21.5vw"}}
                            >
                            <ToggleButton value={false} aria-label="issue">
                                <InfoIcon />
                            </ToggleButton>
                            <ToggleButton value={true} aria-label="comments">
                                <QuestionAnswerIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                        {(issueData === [] || commentsOpen)? null :
                            <div>
                                <img src={issueData[4]} alt={issueData[2]} style={{width: '100%', borderRadius: '15px'}}></img>
                                <h1 style={{textAlign: "center", fontFamily: 'Arial'}}>{issueData[2]}</h1>
                                <p style={{textAlign: "center", fontFamily: 'Arial'}}>{issueData[3]}</p>  
                                </div>                      
                        }
                        {commentsOpen ? <CommentsComponent allUserData={allUserData} commentData={commentData}/> : null}
                    </Grid>
                    <Grid item xs={6} md={6}>
                        {
                            isTimelineLoading ? 
                            (
                                <CircularProgress style={{position: "absolute", top: "50vh", right: "25vw"}}></CircularProgress>
                            ) : null
                        }
                        <div style={isTimelineLoading ? {visibility: 'hidden'} : {}}>
                            <CustomizedTimeline issueID={id} issueName={issueData===[]?null:issueData[2]} setTimelineLoading={setTimelineLoading}/>
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                >
                {
                    speedDialIcons.map((speedDialIcon) => (
                        <SpeedDialAction
                            key={speedDialIcon.name}
                            icon={speedDialIcon.icon}
                            tooltipTitle={speedDialIcon.name}
                            onClick={speedDialIcon.onClick ? speedDialIcon.onClick : null}/>
                    ))
                }
            </SpeedDial>

                

            {/* <Fab color="primary" aria-label="add" onClick={handleClickOpen} style={{bottom: 5, right: 5, position: "fixed"}}>
                <AddIcon />
            </Fab> */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Add new event</DialogTitle>
                <Form issueID={id} issueName={issueData[2]}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}