import React, { useState } from "react";
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
import { ButtonUnstyled } from "@mui/core";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"
import { Button, Checkbox, Form } from 'semantic-ui-react'

const defaultValues = {
    title: "",
    description: "",
    date: "",
    picture: ""
};

// get from backend
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

const HomeForm = (props) => {
    const {handleClose} = props

    const [formValues, setFormValues] = useState(defaultValues);
    const [image, setImageData] = useState([]);
    const [dataUri, setDataUri] = useState('')


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
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("formvalue here: ", formValues);
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
        postData('http://localhost:5000/create_si', formValues).then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
        handleClose();
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
          <label>Title</label>
          <input placeholder='Title' name="title" onChange={handleInputChange} />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input placeholder='Description' name="description" onChange={handleInputChange} />
        </Form.Field>
        <Form.Field>
        <label>Upload a thumbnail</label>
        {dataUri === '' ? null : <img width="200" height="200" src={dataUri} alt="avatar"/>}
        <input type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
        </Form.Field>
        <Button type='submit' onClick={handleSubmit} primary>Submit</Button>
      </Form>
      </div>
    );
};

export default HomeForm;