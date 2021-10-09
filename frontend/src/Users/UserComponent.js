import React, { useEffect, useState }from 'react';
import UserForm from './UserForm';
import FormDialog from './FormDialog';
import { useParams } from 'react-router';

import { Avatar, Grid, Card, CardContent, CardMedia, CardActionArea, Typography, getAccordionSummaryUtilityClass } from '@mui/material';
import IssuesListComponent from './IssuesListComponent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function UserComponent(props) {

    let { id } = useParams();
    const { currentUser } = props;

    const [data, setData] = useState([null, null, null, '']);
    const [image, setImageData] = useState([]);

    const [issueData, setIssueData] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [contributionData, setContributionData] = useState([]);
    useEffect(async () => {
        const result = await fetch("http://localhost:5000/get_event_for_user?userid=" + id).then(res => {
            return res.json()
        }).then(res => {
            console.log("RES here contribution data ", res);
            var curdict = {}
            for (var i = 0; i < res.length; i++){
                if (res[i][3] in curdict) continue;
                curdict[res[i][3]] = 1;
            }
            var curarr = [];
            for (var i in curdict){
                curarr.push(parseInt(i));
            }
            console.log(res);
            console.log("curarr here", curarr)
            setContributionData(curarr)
            //setContributionData(res)
        });
    }, [])

	useEffect(async () => {
        const result = await fetch("http://localhost:5000/list_si").then(res => {
            return res.json()
        }).then(res => {
            let curarr = [];
            for (var i = 0; i < res.length; i++){
                curarr.push({
                    id: res[i][0],
                    date: res[i][1],
                    title: res[i][2],
                    description: res[i][3],
                    image: res[i][4],
                })
            }
            console.log("res here + ", res);
            console.log("Curarr here", curarr);
            setIssueData(curarr)
        });
    }, [])

    useEffect(async () => {
        const result = await fetch("http://localhost:5000/get_userID?userID=" + id).then(res => {
            return res.json()
        }).then(res => {
            console.log(res);
            setData(res[0])
        });
    }, []);

    /*
    function onImageChange(event){
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            console.log(URL.createObjectURL(img));
            const blob = new Blob([JSON.stringify(img, null, 2)], {type : 'application/json'});
            console.log(img);
            console.log(blob);
            setImageData(URL.createObjectURL(img));
        }
    };
    */

    const toArray = (s) => {
        if (s == null) return;
        var ss = s.substring(1, s.length - 1);
        return ss.split(',').map(Number);
    }

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    })
    const [dataUri, setDataUri] = useState('')
    const onChange = (file) => {
    
        if(!file) {
          setDataUri('');
          return;
        }
    
        fileToDataUri(file)
          .then(dataUri => {
            setDataUri(dataUri);
            console.log(dataUri);
        });
        
    }
    console.log(data)
    
    /*
    return (
        <div>
            <h1>Picture: {data[3]}</h1>
            <img src={data[3]}/>
            <h1>UserID: {data[0]}</h1>
            <h1>UserName: {data[1]}</h1>
            <h1>Issues Championed: {data[2]}</h1>
            <h1>User</h1>
            <h1>{id}</h1>
            <Form/>
            <div>
                {/*<img src={image}></img>
                <h1>Select Image</h1>
    <input type="file" name="myImage" onChange={onImageChange} />*/
                /*<img width="200" height="200" src={dataUri} alt="avatar"/>
  <input type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
            </div>*/

            /*<form onSubmit={this.handleSubmit}>
                <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
    </form>*/

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
        <div style={{marginTop: '10px'}}>
            <Grid container>
                <Grid item xs={3.5} md={3.5} style={{marginLeft: "15px", borderRight: "1px solid rgba(34,36,38,.15)"}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {/*<Avatar src=data[3] alt={data[3]}></Avatar>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <h2>data[1]</h2>

                        </div>
                        */}
                        
                        <div style={{height: '40vh', borderBottom: "1px solid rgba(34,36,38,.15)"}}>
                            <Avatar src={data[5]} alt={data[1]} sx={{width: 300, height: 300}} style={{ marginLeft: '10%' }}></Avatar>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', height: '48vh'}}>
                            <h1>{data[1]}</h1>
                            <p style={{fontStyle: 'italic'}}>{data[3]}</p>
                            <p>{data[4]}</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={0.5} md={0.5}>
                </Grid>
                <Grid item xs={7} md={7}>
                    <div style={{height: '28vh', borderBottom: "1px solid rgba(34,36,38,.15)"}}>
                        <h3 style={{marginBottom: '0px', marginTop: '7px'}}>
                            Top Contributions 🏆
                        </h3>
                        <IssuesListComponent issuesList={issueData} issues={contributionData}></IssuesListComponent>
                        

                        
                    </div>
                    <div style={{height: '28vh', borderBottom: "1px solid rgba(34,36,38,.15)"}}>
                        <h3 style={{marginBottom: '0px'}}>
                            Passions ❤️
                        </h3>
                        <IssuesListComponent issuesList={issueData} issues={toArray(data[2])}></IssuesListComponent>
                        
                        
                    </div>
                    <div style={{height: '26vh'}}>
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


                <Fab color="primary" aria-label="add" onClick={handleClickOpen} style={{bottom: 5, right: 5, position: "fixed"}}>
                    <AddIcon />
                </Fab>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add new user</DialogTitle>
                    <UserForm/>
                    
                    <DialogActions>
                    <Button onClick={handleClose} color="error">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    );
}