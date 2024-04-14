import React, { useState } from 'react';
import { FaHome, FaFileAlt, FaMap, FaComments, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
import './App.css'; // Assuming you have a CSS file for styling

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
        <div className="sub-container">
          <YearList />
        </div>
        <div className="sub-container big">
          <IframeDisplay/>
        </div>
      </div>
    </div>
  );
}
function YearList() {
  const years = [2020, 2021, 2022, 2023, 2024]; // Sample list of years
  const [selectedYear, setSelectedYear] = useState(2022);
  return (
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
      </div></div>
  );
}
function IframeDisplay() {
  return (
    <div className="iframe-container">
      <iframe src="./2023.html" className='iframe-d' title="HTML File Display"></iframe>
    </div>
  );
}

// export default YearList;

export default App;
