import React, { useState } from 'react';
import { FaHome, FaFileAlt, FaMap, FaComments, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
import './Layout.css'; // Assuming you have a CSS file for styling
import { ResponsiveContainer, AreaChart, PieChart, BarChart, Area, Pie, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

function App() {
  const [selectedNavItem, setSelectedNavItem] = useState("Dashboard");

  const handleNavItemClick = (itemName) => {
    setSelectedNavItem(itemName);
  };

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
        
          {/* <YearList /> */}
        
          {/* <IframeDisplay/> */}
          <GraphDisplay/>
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
// export default GraphDisplay;

export default App;
