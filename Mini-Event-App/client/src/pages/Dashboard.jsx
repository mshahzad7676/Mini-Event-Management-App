import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Typography,
  createTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import EventCard from '../components/EventCard';
import Events from './Events';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Sample chart data
const chartData = [
  { name: 'Jan', events: 5 },
  { name: 'Feb', events: 8 },
  { name: 'Mar', events: 6 },
  { name: 'Apr', events: 10 },
  { name: 'May', events: 4 },
];

const NAVIGATION = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'events', title: 'Events', icon: <ShoppingCartIcon /> },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function Dashboard() {
  
  return (
    <Box sx={{ p: 4 }}>
      <EventCard />
      <Box mt={6}>
        <Typography variant="h5" gutterBottom>
          Events Chart
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="events" stroke="#1976d2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

function renderPage(pathname) {
  switch (pathname) {
    case '/dashboard':
      return <Dashboard />;
    case '/events':
      return <Events />;
    default:
      return (
        <Box sx={{ p: 4 }}>
          <Typography variant="h6">404 - Page not found</Typography>
        </Box>
      );
  }
}

function DashboardLayoutBranding({ window }) {
  const router = useDemoRouter('/dashboard');
  const { user,  logout,  } = useAuth();
  
  const navigate = useNavigate();

  const demoWindow = window !== undefined ? window() : undefined;

  //Add session state for user
  const [session, setSession] = React.useState({
    user: {
      name: `${user?.name}`,
      email: `${user?.email}`,
      // image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: `${user?.name}`,
            email: `${user?.email}`,
            // image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
      },
      signOut: () => {
      logout();         
      navigate('/');    
    },
    };
  }, [logout, navigate]);

  return (
    <DemoProvider window={demoWindow}>
      <AppProvider
        session={session}
        authentication={authentication}
        navigation={NAVIGATION}
        branding={{
          title: 'Event Manager',
          homeUrl: '/dashboard',
        }}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          {renderPage(router.pathname)}
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBranding;
