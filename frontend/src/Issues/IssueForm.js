import React, { useState } from "react";
import 'semantic-ui-css/semantic.min.css'
import { Button, Form } from 'semantic-ui-react'

const defaultValues = {
    title: "",
    description: "",
    scale: "big",
    si: 0,
    picture: "",
    userID: 1,
    date: "2021-10-08"
};


const IssueForm = (props) => {
    const {issueName, issueID, handleClose, setRefresh, setSnackbarOpen} = props;

    const [formValues, setFormValues] = useState(defaultValues);
    const [image, setImageData] = useState([]);
    const [dataUri, setDataUri] = useState('')
  
    console.log("HEREHERE ", issueName);

    defaultValues["si"] = parseInt(issueID);


    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    })

    
    const onChange = (file) => {

        if(!file) {
            setDataUri('');
            return;
        }

        fileToDataUri(file).then(dataUri => {
            setDataUri(dataUri);
            console.log(dataUri);
            setFormValues({
                ...formValues,
                picture: dataUri,
            });
            console.log(dataUri)
        });
    
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit pressed and yielded ", formValues);
        
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
            }).then((result) => {
                setRefresh(true);
                setSnackbarOpen(true);
                return result
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }
        
        postData('http://localhost:5000/create_event', formValues).then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });

        handleClose()
    };

    const onAutoChange = (event, values) => {
        setFormValues({
            ...formValues,
            groupsChampioned: values
        });
        console.log(values);
    }

    return (
        <div style={{marginLeft:"auto", marginRight:"auto", width: "80%"}}>

        <Form>
        <Form.Field>
          <label>Event Title</label>
          <input placeholder='Title' name="title" onChange={handleInputChange} />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input placeholder='Description' name="description" onChange={handleInputChange} />
        </Form.Field>
        <Form.Field>
          <label>Social Issue</label>
          <input placeholder={issueName} name="si" disabled />
        </Form.Field>
        <Form.Field>
          <label>Scale</label>
          <input placeholder="Scale" name="scale" onChange={handleInputChange}/>
        </Form.Field>
        <Form.Field>
        {dataUri === '' ? null : <img width="200" height="200" src={dataUri} alt="avatar"/>}
        <br></br>
        <input type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
        </Form.Field>
        <Button type='submit' onClick={handleSubmit} primary>Submit</Button>
      </Form>
      </div>

    );
};

export default IssueForm;

