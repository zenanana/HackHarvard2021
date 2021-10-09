import { Accordion, AccordionDetails, AccordionSummary, Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function CommentsComponent(props) {
    const {allUserData, commentData} = props
    return (
        <><h1 style={{ textAlign: 'center', fontFamily: 'Arial' }}>What's Going On</h1><div style={{ display: "flex", flexDirection: 'column', height: '75vh', overflow: 'scroll' }}>
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
                            <Link to={`/user/${x['authorID']}`} style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar alt={allUserData[x['authorID'] - 1][1]} src={allUserData[x['authorID'] - 1][5]}></Avatar>
                                <b style={{ fontFamily: "Arial", margin: '5px' }}>{allUserData[x['authorID'] - 1][1]}</b>
                            </Link>
                        </AccordionSummary>
                        <AccordionDetails
                            style={{ backgroundColor: "#E8F5FF" }}>
                            <div style={{ fontFamily: "Arial" }} dangerouslySetInnerHTML={{ __html: x['description'] }} />
                        </AccordionDetails>
                    </Accordion>
                );
            })}

        </div></>
    )
}