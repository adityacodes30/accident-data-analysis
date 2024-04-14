import React, { useState, useEffect } from 'react';
import { FaHome, FaFileAlt, FaMap, FaComments, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
import './Layout.css'; // Assuming you have a CSS file for styling
import { ResponsiveContainer, AreaChart, PieChart, BarChart, Area, Pie, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [selectedNavItem, setSelectedNavItem] = useState("Dashboard");

  const handleNavItemClick = (itemName) => {
    setSelectedNavItem(itemName);
  };

  let pageContent;
  if (selectedNavItem === "Dashboard") {
    pageContent = <GraphDisplay />;
  } else if (selectedNavItem === "Form") {
    pageContent = <FormPage />;
  } else if (selectedNavItem === "Map") {
    pageContent = <><YearList/><IframeDisplay /></>;
  } else if (selectedNavItem === "Chatbot") {
    // Add logic for Chatbot page
  } else if (selectedNavItem === "Logout") {
    pageContent = <LogoutLogin />;
  }

  return (
    <div className="app">
      <div className="centered-container">
        <div className="sub-container no-bg">
          <h2>App Name</h2>
          <nav>
            <ul className="nav-menu">
              <li className={selectedNavItem === "Dashboard" ? "selected" : ""} onClick={() => handleNavItemClick("Dashboard")}><FaHome /><span>Dashboard</span></li>
              <li className={selectedNavItem === "Form" ? "selected" : ""} onClick={() => handleNavItemClick("Form")}><FaFileAlt /><span>Form</span></li>
              <li className={selectedNavItem === "Map" ? "selected" : ""} onClick={() => handleNavItemClick("Map")}><FaMap /><span>Map</span></li>
              <li className={selectedNavItem === "Chatbot" ? "selected" : ""} onClick={() => handleNavItemClick("Chatbot")}><FaComments /><span>Chatbot</span></li>
              <li className={selectedNavItem === "Logout" ? "selected" : ""} onClick={() => handleNavItemClick("Logout")}><FaSignOutAlt /><span>Logout</span></li>
            </ul>
          </nav>
        </div>
        
        {pageContent}
        
        {/* <YearList /> */}
        {/* <IframeDisplay/> */}
        
      </div>
    </div>
  );
}
function YearList() {
  const years = [2020, 2021, 2022, 2023, 2024]; // Sample list of years
  const [selectedYear, setSelectedYear] = useState(2022);
  return (
    <div className="sub-container">
    <div className='year-list-container'>
    <div className="year-list">
      {years.map((year) => (
        <div
          key={year}
          className={`year ${year === selectedYear ? 'selected' : ''}`}
          onClick={() => setSelectedYear(year)}
        ><div className='year-margin'>
            {year}</div>
        </div>
      ))}
        </div></div></div>
  );
}
function IframeDisplay() {
  return (
    <div className="sub-container big">
    <div className="iframe-container">
      <iframe src="./2023.html" className='iframe-d' title="HTML File Display"></iframe>
      </div></div>
  );
}

function LogoutLogin() {
  return (
    <div className="sub-container bbig">
          <SignedIn>
            <UserButton afterSignOutUrl='/sign-in' />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">Sign In</Link>
          </SignedOut>
    </div>
  );
  
}

// export default YearList;
// import React from "react";
function GraphDisplay() {
  // Sample data for demonstration
  const data = [
    { name: "Category 1", value: 400 },
    { name: "Category 2", value: 300 },
    { name: "Category 3", value: 300 },
    { name: "Category 4", value: 200 },
    { name: "Category 5", value: 100 }
  ];

  return (
    <div className="sub-container bbig graph-display">
      <div className="graph-container">
        <h3>Area Chart</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}>
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
      </div>
      <div className="graph-container pie">
        <h3>Pie Chart</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        
      </div>
      <div className="graph-container pie">
        <h3>Pie Chart</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

      </div>
      <div className="graph-container pie">
        <h3>Pie Chart</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

      </div>
      <div className="graph-container pie">
        <h3>Pie Chart</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

      </div>
      <div className="graph-container histo">
        <h3>Bar Chart</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <Bar dataKey="value" fill="#8884d8" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
}

function FormPage() {
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

// export default GraphDisplay;

export default Dashboard;
