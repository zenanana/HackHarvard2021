import React, { useEffect, useState }from 'react';
import Form from './Form';
import { useParams } from 'react-router';

export default function UserComponent() {

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
    <input type="file" name="myImage" onChange={onImageChange} />*/}
                <img width="200" height="200" src={dataUri} alt="avatar"/>
  <input type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
            </div>

            {/*<form onSubmit={this.handleSubmit}>
                <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
</form>*/}
        </div>
    );
}