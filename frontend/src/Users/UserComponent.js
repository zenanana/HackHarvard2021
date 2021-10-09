import React, { useEffect, useState }from 'react';
import Form from './Form';
import { useParams } from 'react-router';

import { Avatar, Grid } from '@mui/material';

export default function UserComponent(props) {

    let { id } = useParams();

    const [data, setData] = useState([null, null, null, '']);
    const [image, setImageData] = useState([]);

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
            <Grid container spacing={3}>
                <Grid item xs={4} md={4}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Avatar src={users[id].avatar} alt={users[id].name}></Avatar>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <h2>{users[id].name}</h2>
                            <p style={{fontStyle: 'italic'}}>{users[id].pronouns}</p>
                            <p>{users[id].bio}</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={8} md={8}>
                    
                </Grid>
            </Grid>
        </div>
    );
}