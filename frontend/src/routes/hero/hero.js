import { Button, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Navbar from '../../components/navbar';

export default function Hero(){
    return <>
    <center>
        <Navbar/>
    <Paper elevation={2} style={{width:'30vw', height:'50vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <h2>Login</h2>
        <TextField placeholder='email' style={{width:'70%'}}></TextField>
        <TextField placeholder='password' type='password'style={{width:'70%'}}></TextField>
        <Button variant='contained'style={{width:'30%'}}>Login</Button>
    </Paper>
    </center>
    </>
}