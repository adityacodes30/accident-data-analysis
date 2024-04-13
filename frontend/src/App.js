import './App.css';
// import Hero from './Pages/hero/hero';
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"

function App() {
  return (
      <>
      <SignedOut>
        <>
        Welcome to Accident data analysis Dashboard<br/>
        <SignInButton children={
          <button style={{backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer'}}>Sign in</button>
        
        }/>
        </>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      </>
  );
}

export default App;
