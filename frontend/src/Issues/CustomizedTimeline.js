import React, { useState, useEffect } from "react";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import StyledEventComponent from "../Shared/StyledEventComponent";

export default function CustomizedTimeline(props) {

  const {issueID, issueName, setTimelineLoading, refresh, setRefresh} = props;

  const [timelineData, setTimelineData] = useState([]);
  console.log("ISSUE ID HERE", issueID)
	useEffect(async () => {
        const result = await fetch("http://localhost:5000/get_timeline_for_si?siid=" + issueID).then(res => {
            return res.json()
        }).then(res => {
            console.log(res);
            res.sort(function compareFn(firstEl, secondEl){
              if (firstEl[1] < secondEl[1]) return 1;
              return -1;
            });

            setTimelineData(res)
            console.log("TIME LINE DATA ", res);
            setTimelineLoading(false)
        });
  }, [])

  useEffect(async () => {
        setTimelineLoading(true)
        const result = await fetch("http://localhost:5000/get_timeline_for_si?siid=" + issueID).then(res => {
            return res.json()
        }).then(res => {
            console.log(res);
            res.sort(function compareFn(firstEl, secondEl){
              if (firstEl[1] < secondEl[1]) return 1;
              return -1;
            });

            setTimelineData(res)
            console.log("TIME LINE DATA ", res);
            setTimelineLoading(false)
            setRefresh(false)
        });
  }, [refresh])

  console.log(
    "timeline data ", timelineData
  )
  console.log("mapper ", timelineData.map(x => x[0]));

  return (
    <Timeline position="alternate">
      {timelineData.map(x => 

      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {x[1]}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
          <StyledEventComponent
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								variant="dot">
								<Avatar src={x[7]} alt={x[1]} sx={{width: 48, height: 48}}></Avatar>
							</StyledEventComponent>
            
            {/*<FastfoodIcon />*/}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            {x[4]}
          </Typography>
          <Typography>{x[5]}</Typography>
        </TimelineContent>
      </TimelineItem>


      )}
  
    </Timeline>
  );
}