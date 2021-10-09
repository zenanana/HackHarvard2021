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
import Button from "@material-ui/core/Button";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"

const defaultValues = {
    title: "",
    description: "",
    scale: "big",
    si: 0,
    picture: "",
    userID: 1,
    date: "2021-10-08"
};


const Form = (props) => {
    const [formValues, setFormValues] = useState(defaultValues);
    const [image, setImageData] = useState([]);
    const [dataUri, setDataUri] = useState('')

    const {issueName, issueID} = props;
    console.log("HEREHERE ", issueName);

    defaultValues["si"] = issueID;


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
        console.log(formValues);
        
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
        
        postData('http://localhost:5000/create_event', formValues).then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });

    };

    const onAutoChange = (event, values) => {
        setFormValues({
            ...formValues,
            groupsChampioned: values
        });
        console.log(values);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid item>
                    <TextField
                    id="title-input"
                    name="title"
                    label="Title"
                    type="text"
                    value={formValues.title}
                    onChange={handleInputChange}
                    />
                </Grid>
                <br></br>

                <Grid item>
                    <TextField
                    id="description-input"
                    name="description"
                    label="Description"
                    type="text"
                    value={formValues.description}
                    onChange={handleInputChange}
                    />
                </Grid>

                <br></br>
                <Grid item>
                    <TextField
                    id="si-input"
                    name="si"
                    label="Social Issue"
                    type="text"
                    //pass down the props
                    defaultValue={issueName}
                    disabled
                    value={issueName}
                    onChange={handleInputChange}
                    />
                </Grid>

                <br></br>
                <Grid item>
                <Select
                    id="si-select"
                    value={formValues.scale}
                    label="scale"
                    name="scale"
                    onChange={handleInputChange}
                >
                    <MenuItem value={"big"}>Big</MenuItem>
                    <MenuItem value={"small"}>Small</MenuItem>
                    <MenuItem value={"comment"}>Comment</MenuItem>
                </Select>
                
            </Grid>
          <br></br>

                <Grid item>
                    {dataUri === '' ? null : <img width="200" height="200" src={dataUri} alt="avatar"/>}
                    <br></br>
                    <input type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
                </Grid>


                <br></br>

                <IconButton aria-label="add" type="submit" size="large">
                    <AddIcon />
                </IconButton>
            </Grid>
        </form>
    );
};

export default Form;

