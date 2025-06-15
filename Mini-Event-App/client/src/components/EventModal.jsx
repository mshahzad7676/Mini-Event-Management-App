import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'application/pdf'];

// const validationSchema = Yup.object({
//   title: Yup.string().required('Title is required'),
//   description: Yup.string().required('Description is required'),
//   date: Yup.string().required('Date is required'),
//   location: Yup.string().required('Location is required'),
//   cover: Yup
//     .mixed()
//     .required('Cover image is required')
//     .test('fileSize', 'File too large', value => !value || value.size <= MAX_FILE_SIZE)
//     .test('fileType', 'Unsupported Format', value => !value || SUPPORTED_FORMATS.includes(value.type)),
//   files: Yup.array().of(
//     Yup.mixed().test('fileSize', 'File too large', value => !value || value.size <= MAX_FILE_SIZE)
//   ),
// });
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.string().required('Date is required'),
  location: Yup.string().required('Location is required'),
});
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function EventModal({ open, handleClose, setEvents,selectedEvent }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { token } = useAuth();
  // console.log(token);

useEffect(() => {
    if (selectedEvent) {
      formik.setValues({
        title: selectedEvent.title,
        description: selectedEvent.description,
        date: selectedEvent.date?.split('T')[0],
        location: selectedEvent.location,
        cover: null,
        files: [],
      });
    }
  }, [selectedEvent]);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      location: '',
      cover: null,
      files: [],
    },
    validationSchema,
  
    onSubmit: async (values) => {
  const formData = new FormData();
  formData.append('title', values.title);
  formData.append('description', values.description);
  formData.append('date', values.date);
  formData.append('location', values.location);
  if (values.cover) formData.append('cover', values.cover);
  values.files.forEach((file) => formData.append('files', file));

  try {
    const url = selectedEvent
      ? `http://localhost:5000/api/events/${selectedEvent._id}`
      : 'http://localhost:5000/api/events';

    const method = selectedEvent ? 'PUT' : 'POST';

   const res = await fetch(url, {
  method,
  headers: {
    Authorization: `Bearer ${token}`,
   
  },
  body: formData,
});

const text = await res.text();
console.log('Server response:', text);

let data;
try {
  data = JSON.parse(text);
} catch (e) {
  throw new Error('Server did not return valid JSON');
}
    if (!res.ok) throw new Error(data.error || 'Failed to save event');

    setEvents((prev) =>
  selectedEvent
    ? prev.map((e) => (e._id === selectedEvent._id ? data : e))
    : [...prev, data]
);
 
    formik.resetForm();
    setSelectedFiles([]);
    handleClose();

     window.location.reload();
  } catch (err) {
    alert(err.message);
  }
}
  });

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="event-modal-title">
      <Box sx={modalStyle}>
        <Typography id="event-modal-title" variant="h6" mb={2}>
          Create Event
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="date"
            name="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
            sx={{ mb: 2 }}
          />

         <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              Cover Image (Max 2MB)
            </Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload Cover
              <VisuallyHiddenInput
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => {
                  formik.setFieldValue('cover', e.currentTarget.files[0]);
                }}
              />
            </Button>
          </Box>

              {formik.errors.cover && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {formik.errors.cover}
                </Typography>
              )}


          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" gutterBottom>
              Additional Files (Optional)
            </Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload Files
              <VisuallyHiddenInput
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => {
                  const files = Array.from(e.currentTarget.files);
                  formik.setFieldValue('files', files);
                  setSelectedFiles(files);
                }}
              />
            </Button>
            {formik.errors.files && (
              <Typography color="error" variant="body2">{formik.errors.files}</Typography>
            )}
            <ul>
              {selectedFiles.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          </Box>

          <Button type="submit" variant="contained" fullWidth>
            Create Event
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
