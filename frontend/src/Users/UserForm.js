import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
//import Button from "@material-ui/core/Button";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button, Checkbox, Form } from 'semantic-ui-react'

const defaultValues = {
    userName: "",
    pronoun: "",
    bio: "",
    interest: "",
    picture: ""
};

// get from backend
/*
const socialIssueList = [
    { title: 'Sustainability', year: 1994 },
    { title: 'Healthcare', year: 1972 },
    { title: 'Protest', year: 1974 },
    { title: 'Women Rights', year: 2008 },
    { title: 'Racial Justice', year: 1957 },
    { title: "Crime", year: 1993 },
    { title: 'Ethics of Science', year: 1994 },
    { title: 'Air Pollution', year: 2003,},
];
*/

const UserForm = () => {
    const [formValues, setFormValues] = useState(defaultValues);
    const [image, setImageData] = useState([]);
    const [dataUri, setDataUri] = useState('')

	const [socialIssueList, setData] = useState([]);
	useEffect(async () => {
        const result = await fetch("http://localhost:5000/list_si").then(res => {
            return res.json()
        }).then(res => {
            console.log("Social issues list ", res);
            setData(res)
        });
    }, [])


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
        });
    
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("in input change")
        console.log(e.target.name, e.target.value);
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("form values here ", formValues);
        return;
        
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
        
        postData('http://localhost:5000/create_user', formValues).then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });


    };

    const onAutoChange = (event, values) => {
        var curlist = [];
        for (var i = 0; i < values.length; i++){
            curlist.push(values[i][0]);
        }
        setFormValues({
            ...formValues,
            interest: curlist
        });
        console.log(values);
        console.log(curlist)
    }

    return (
        <div style={{marginLeft:"auto", marginRight:"auto", width: "80%"}}>

        <Form>
        <Form.Field>
          <label>User Name</label>
          <input placeholder='username' name="userName" onChange={handleInputChange} />
        </Form.Field>
        <Form.Field>
          <label>Pronoun</label>
          <input placeholder='pronoun' name="pronoun" onChange={handleInputChange} />
        </Form.Field>
        <Form.Field>
          <label>Bio</label>
          <input placeholder="tell me your life story..." name="bio" onChange={handleInputChange}/>
        </Form.Field>
        <Form.Field>
        <div class="field">
            <label>Interests 💕</label>
            <select multiple class="ui dropdown" style={{height:100}} name="interest" onChange={handleInputChange}>
                {
                    socialIssueList.map((x) => <option key={x[0]} value={x[0]}>{x[2]}</option>)
                }
            </select>
        </div>
        </Form.Field>
        <Form.Field>
            <label>Upload a profile pic!</label>
        {dataUri === '' ? null : <img width="200" height="200" src={dataUri} alt="avatar"/>}
        <input type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
        </Form.Field>
        <Button type='submit' onClick={handleSubmit}>Submit</Button>
      </Form>
      </div>
    );
};

export default UserForm;