import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventModal from './EventModal';
import { useAuth } from '../context/AuthContext';

export default function EventTable({ events, setEvents ,handleEdit}) {
  const [open, setOpen] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState(null);
  const { token } = useAuth();

  // const handleEdit = (event) => {
  //   selectedEvent(event);
  //   setOpen(true);
  // };

 const handleDelete = async (event) => {
  const confirm = window.confirm('Are you sure you want to delete this event?');
  if (!confirm) return;

  try {
    const res = await fetch(`http://localhost:5000/api/events/${event._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Failed to delete event');

    setEvents((prev) => prev.filter((e) => e._id !== event._id));
    alert('Deleted');
  } catch (err) {
    alert(err.message);
  }
};

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="events table">
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((row,index) => (
              <TableRow key={row._id || index}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(row)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      {/* <EventModal
        open={open}
        handleClose={() => {
          setOpen(false);
          setSelectedEvent(null);
        }}
        selectedEvent={selectedEvent}
        setEvents={setEvents}
      /> */}
    </>
  );
}
