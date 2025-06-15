import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/AppBar";
import SendIcon from '@mui/icons-material/Send';
import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
 const handleGetStarted = () => {
  if (isAuthenticated) {
    navigate('/dashboard');
  } else {
    alert("Please Login into App");
    navigate('/'); 
  }
};
  return (
    <>
    
    <ResponsiveAppBar></ResponsiveAppBar>
    <div className="py-18 text-center " > 
      <h1 className="text-2xl">Welcome to Event Management</h1><br />
      <h3 className="text-4xl text-amber-100">One Stop</h3><br />
      <h1 className="text-amber-50 text-7xl">Event Planner</h1><br />

      {/* <button onClick={login} endIcon={<SendIcon />}className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"> */}
      <Button variant="contained" endIcon={<SendIcon />} onClick={handleGetStarted}>
        Get Started 
      </Button>
    </div>
    </>
  );
}
