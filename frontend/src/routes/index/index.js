import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
 
export default function IndexPage() {
  return (
    <div>
      
        <div style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div>
            <SignedIn>
          <UserButton afterSignOutUrl='/sign-in' />
          <Link to="/dashboard" style={{ backgroundColor: 'white', padding: '1rem 2rem', borderRadius: '5px', border: 'none', cursor: 'pointer', marginLeft: '1rem' }}>Dashboard</Link>
            </SignedIn>
            <SignedOut>
          <Link to="/sign-in">Sign In</Link>
            </SignedOut>
            </div>
        <h1 style={{ color: 'white', fontSize: '4rem', marginBottom: '0' }}>Safe Karnataka:</h1>
        <p style={{ color: 'white', fontSize: '4rem', marginTop: '0' }}>Building Bridges to Accident-Free Roads</p>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%' }}>
          <Link to="/sign-in" style={{ backgroundColor: 'white', padding: '1rem 2rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Login</Link>
          <Link to="/sign-up" style={{ backgroundColor: 'white', padding: '1rem 2rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Signup</Link>
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