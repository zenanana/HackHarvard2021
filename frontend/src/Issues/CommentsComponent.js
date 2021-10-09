import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

export default function CommentsComponent(props) {
    const {allUserData, commentData, currentUser, issueID} = props

    const handleSubmitClick = () => {
        const comment = commentInputValue
        console.log(comment)
        // Call to API to add comment  
        // You can get id of current user from currentUser

        const formValues = {
            title: "Comment",
            description: comment,
            scale: "comment",
            si: parseInt(issueID), //get this
            picture: "",
            userID: parseInt(currentUser) + 1,
            date: "2021-10-08"
        };
        console.log("IS THIS FUNCTION CALLED MANY TIMES")
        console.log(formValues, "here here her");

        async function postData(url = '', data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json'
              },
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }
        
        postData('http://localhost:5000/create_event', formValues).then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });

        setCommentInputValue("")

    }

    const [commentInputValue, setCommentInputValue] = React.useState('');

    const handleCommentInputChange = (event) => {
        setCommentInputValue(event.target.value);
    }

    const [commentConfirmationOpen, setCommentConfirmationOpen] = React.useState(false);

    return (
        <><h1 style={{ textAlign: 'center' }}>Join the Conversation 🗣️</h1><div style={{ display: "flex", flexDirection: 'column', height: '50vh', overflowY: 'auto' }}>
            {commentData.map((x, index) => {
                if (allUserData === [])
                    return null;
                if (!('authorID' in x))
                    return null;
                if (allUserData[x['authorID'] - 1] == null)
                    return null;
                console.log(commentData, "HERE");
                console.log(x);
                return (
                    <Accordion expanded={true}>
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{ backgroundColor: "#E8EEFF" }}
                        >
                            <Link to={`/user/${x['authorID']}`} style={{ display: 'flex', textDecoration: 'none', color: 'black', alignItems: 'center' }}>
                                <Avatar alt={allUserData[x['authorID'] - 1][1]} src={allUserData[x['authorID'] - 1][5]}></Avatar>
                                <b style={{ fontFamily: "Arial", margin: '10px' }}>{allUserData[x['authorID'] - 1][1]}</b>
                            </Link>
                        </AccordionSummary>
                        <AccordionDetails
                            style={{ backgroundColor: "#E8F5FF" }}>
                            <div dangerouslySetInnerHTML={{ __html: x['description'] }} />
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </div>
            <div>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: '0px 1.4vw 0px 1vw'}}>
                    <Avatar src={allUserData[currentUser][5]} style={{marginRight: '5px'}}></Avatar>
                    <TextField  style={{margin: "0px 10px"}} id="comment field" label="Write a comment..." variant="standard" rows={4} multiline fullWidth value={commentInputValue} onChange={handleCommentInputChange}/>
                    <Button onClick={() => setCommentConfirmationOpen(true)} endIcon={<AddCommentIcon/>}>Comment</Button>
                </Box>
            </div>
            <Dialog
                open={commentConfirmationOpen}
                onClose={() => setCommentConfirmationOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to submit this comment?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This comment will be added to the database and will be visible to everyone.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setCommentConfirmationOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                    setCommentConfirmationOpen(false)
                    handleSubmitClick()
                    }} autoFocus>
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}