import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import EventModal from '../components/EventModal';
import EventTable from '../components/EventTable';

export default function Events() {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch events from your API
  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/events', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch events');
      setEvents(data);
    } catch (err) {
      console.error(err.message);
    }
  };
   
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h3">Events</Typography>
        <Button variant="contained" onClick={handleOpen}>
          Add Event
        </Button>
      </Box>

      <EventModal
        open={open}
        handleClose={handleClose}
        selectedEvent={selectedEvent}
        setEvents={(newEvent) => setEvents((prev) => [...prev, newEvent])}
      />

      <Box sx={{ p: 4 }}>
        <EventTable events={events} setEvents={setEvents} handleEdit={(event) => {
            setSelectedEvent(event);
            setOpen(true);
          }} />
      </Box>
    </>
  );
}
