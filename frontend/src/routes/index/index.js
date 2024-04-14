import { Link } from "react-router-dom";
 
export default function IndexPage() {
  return (
    <div>
      {/* <h1>This is the index page</h1> */}
      <div style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1 style={{ color: 'white', fontSize: '4rem', marginBottom: '2rem' }}>Accident Data Analysis</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%' }}>
          <Link to="/sign-up" style={{ backgroundColor: 'white', padding: '1rem 2rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Login</Link>
          <Link to="/sign-in" style={{ backgroundColor: 'white', padding: '1rem 2rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Signup</Link>
        </div>
      </div>
      <div>
        {/* <ul>
          <li><Link to="/sign-up">Sign Up</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul> */}
      </div>
    </div>
  )
}