import { useUser } from '@clerk/clerk-react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function FormPage() {
    const [formdata, setformdata] = useState({})
    const [loading, setloading] = useState(true)
    const [formValues, setFormValues] = useState({"month": ""});
    const [formError, setFormError] = useState(false);
    const { isLoaded, user } = useUser();

    if (!isLoaded) return null;

    if (!user) {
        return (
            <Paper>
                <h1>Please sign in to view this page</h1>
            </Paper>
        );
    }

    const handleChange = (key) => (event) => {
        setFormValues(prevValues => ({
          ...prevValues,
          [key]: event.target.value,
        }));
      };

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Form submitted');
        // Check if any field is empty
        const isEmpty = Object.values(formValues).some(value => value === '');
        if (isEmpty) {
            console.log('Form is empty');
            console.log(user.id);
            // /there is a form_sub collection in the database put form values in that collection with user id and the time stamp
            setFormError(true);
        } else {
            axios.post('http://localhost:5001/form_sub', {
                user_id: user.id,
                form_values: formValues,
                timestamp: new Date().toISOString()
            }).then((response) => {
                console.log('Form submitted successfully:', response);
            }).catch((error) => {
                console.error('Error submitting form:', error);
            });
            setFormError(false);
            
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5001/formdata').then((response) => {
            setformdata(response.data);
            setFormValues(
                Object.keys(response.data).filter(key => key !== "_id").reduce((obj, key) => ({ ...obj, [key]: '' }), {})
            );
            setloading(false);
        }).catch((error) => {
            console.error('Error fetching form data:', error);
            setloading(false);
        });
    }, []);
    
    if(loading) 
    {
        return (<h1>Loading data</h1>);
    }
    
    return (
        <>
            <Paper>
                <h1>Form page</h1>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {Object.keys(formdata).map((key) => {
                            if (key === "_id") {
                                return null;
                            }
                            const value = formdata[key];
                            const menuitems = value.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ));
                            return (
                                <Grid item xs={12} sm={6} md={3} key={key}>
                                    <FormControl fullWidth>
                                        <InputLabel id={key}>{key}</InputLabel>
                                        <Select
                                            labelId={key}
                                            id={key}
                                            value={formValues[key] || ''}
                                            onChange={handleChange(key)}
                                            error={formError && formValues[key] === ''}
                                        >
                                            <MenuItem value="">Select {key}</MenuItem>
                                            {menuitems}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <TextField
                        id="month"
                        label="Month"
                        variant="outlined"
                        value={formValues.month || ''}
                        onChange={handleChange('month')}
                        fullWidth
                        sx={{ mt: 2 }}
                        type="number"
                        error={formError && formValues.month === ''}
                    />
                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </>
    );
}
