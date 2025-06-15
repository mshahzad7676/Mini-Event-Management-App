
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  createTheme,
} from '@mui/material';


export default function EventCard() {
  return (

    <> <Grid container spacing={3} justifyContent="center"
      alignItems="center"   >
        <Grid  >
          <Card sx={{ minWidth: 325 }}>
            <CardContent>
              <Typography variant="h6">Total Events</Typography>
              <Typography variant="h4">28</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid >
          <Card sx={{ minWidth: 325 }}>
            <CardContent>
              <Typography variant="h6">Pending</Typography>
              <Typography variant="h4">6</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid >
          <Card sx={{ minWidth: 325 }}>
            <CardContent>
              <Typography variant="h6">Completed</Typography>
              <Typography variant="h4">22</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid></>
  );}