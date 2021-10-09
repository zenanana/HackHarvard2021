import React from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";

export default function IssuesListComponent(props) {
    const { issuesList, issues } = props
    if (issuesList == null) return null;
    if (issuesList == []) return null;
    if (issuesList.length == 0) return null;
    return (
        <div style={{display: 'flex', flexDirection: 'row', width: '70vw', overflowX: 'auto'}}>
            {issues != null &&
                issues.map((i) => {
                    if (issuesList)
                    // Should be replaced with a call to the API to get single issue by id
                            return (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    whileHover={{ scale: 1.03 }}
                                    style={{margin: '7px'}}>
                                            <Card sx={{ maxWidth: 300 }}>
                                                <Link to={`/issue/${issuesList[i - 1].id}`}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                        component="img"
                                                        height="130"
                                                        image={issuesList[i - 1].image}
                                                        alt={issuesList[i - 1].title}
                                                        />
                                                        <CardContent sx={{height: '15px'}}>
                                                        <Typography gutterBottom variant="body2">
                                                            {issuesList[i - 1].title}
                                                        </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Link>
                                            </Card>
                                    </motion.div>
                            )
                        
                    
                })
            }
        </div>
    )
}