import React from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";

export default function IssuesListComponent(props) {
    const { issuesList, issues } = props
    return (
        <div style={{display: 'flex', flexDirection: 'row', width: '70vw', overflow: 'scroll'}}>
            {
                issuesList.map((issue) => {
                    // Should be replaced with a call to the API to get single issue by id
                    for (let i = 0; i < issues.length; i++) {
                        if (issues[i].id === issue) {
                            return (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    whileHover={{ scale: 1.03 }}
                                    style={{margin: '7px'}}>
                                            <Card sx={{ maxWidth: 300 }}>
                                                <Link to={`/issue/${issues[i].id}`}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                        component="img"
                                                        height="130"
                                                        image={issues[i].image}
                                                        alt={issues[i].title}
                                                        />
                                                        <CardContent sx={{height: '15px'}}>
                                                        <Typography gutterBottom variant="body2">
                                                            {issues[i].title}
                                                        </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Link>
                                            </Card>
                                    </motion.div>
                            )
                        }
                    }
                    return <></>;
                })
            }
        </div>
    )
}