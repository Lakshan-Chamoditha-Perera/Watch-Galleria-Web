import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';

const AddProductForm = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [gender, setGender] = useState('unisex');

  const handleImageChange = (index, event) => {
    const newImages = [...images];
    newImages[index] = event.target.files[0];
    setImages(newImages);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className=" bg-[#F8F8F9] px-[13.33vw] flex justify-center">
      <Box className='p-3 border border-red-800 w-full '>
        <Typography className="text-left" fontWeight="bold" variant="h4" component="h1" gutterBottom>
          Manage Products
        </Typography>
        <Typography className="text-left " variant="subtitle1" gutterBottom>
          Add your product for your customers
        </Typography>

        <Box component="form" className="mt-3 p-3 bg-[#FEFEFF] rounded" onSubmit={handleSubmit} noValidate autoComplete="off" >
          <Grid container className='bg-[#FEFEFF] justify-center '>

            <Grid className='p-3' item xs={12} md={6} >
              <Box className='bg-[#FEFEFF]' mb={4} >
                <Box p={2} borderRadius={2} className='border rounded'>
                  <Typography fontWeight="bold" variant="h6" component="h2" gutterBottom className="text-left">
                    Basic Information
                  </Typography>
                  <TextField
                    label="Item Code"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Product Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                  />
                </Box>
              </Box>
              <Box className='bg-[#FEFEFF] border rounded' mb={4}>
                <Box p={2} borderRadius={2}>
                  <Typography fontWeight="bold" variant="h6" component="h2" gutterBottom className="text-left">
                    Category
                  </Typography>
                  <FormControl variant="outlined" fullWidth margin="normal" required>
                    <InputLabel>Product Category</InputLabel>
                    <Select label="Product Category">
                      <MenuItem value="Luxury">Luxury</MenuItem>
                      <MenuItem value="Sport">Sport</MenuItem>
                      <MenuItem value="Casual">Casual</MenuItem>
                      <MenuItem value="Smart">Smart</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box className='bg-[#FEFEFF] border rounded' mb={4}>
                <Box p={2} borderRadius={2}>
                  <Typography fontWeight="bold" variant="h6" component="h2" gutterBottom className="text-left">
                    Price & Quantity
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Price"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="number"
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Unit Price"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="number"
                        required
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>

            <Grid className='p-3' item xs={12} md={6}>
              <Box mb={4}>
                <Box p={2} className='bg-[#FEFEFF] border rounded' borderRadius={2}>
                  <Typography fontWeight="bold" variant="h6" component="h2" gutterBottom className="text-left">
                    Product Image
                  </Typography>
                  <Grid container spacing={2}>
                    {images.map((image, index) => (
                      <Grid item xs={6} sm={3} key={index}>
                        <Button
                          variant="outlined"
                          component="label"
                          fullWidth
                          sx={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          {image ? (
                            <img src={URL.createObjectURL(image)} alt={`Product Image ${index + 1}`} style={{ maxHeight: '100%', maxWidth: '100%' }} />
                          ) : (
                            <AddPhotoAlternateIcon />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => handleImageChange(index, e)}
                          />
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
              <Box mb={4}>
                <Box p={2} className='bg-[#FEFEFF]  border rounded' borderRadius={2}>
                  <Typography fontWeight="bold" variant="h6" component="h2" gutterBottom className="text-left">
                    Select Size
                  </Typography>
                  <TextField
                    label="Add Size"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Product Date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </Box>
              </Box>

              <Box mb={4}>
                <Box p={2} className='bg-[#FEFEFF]  border rounded' borderRadius={2}>
                  <Typography fontWeight="bold" variant="h6" className='text-left' gutterBottom>
                    Gender
                  </Typography>

                  <FormControl className='border bg-[#FEFEFF]' component="fieldset" sx={{ width: '100%' }}>
                    <RadioGroup
                      sx={{ justifyContent: 'space-around', display: 'flex' }}
                      className=' border rounded p-2 '
                      aria-label="gender"
                      name="gender"
                      value={gender}
                      onChange={handleGenderChange}
                      row
                    >
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="unisex" control={<Radio />} label="Unisex" />
                    </RadioGroup>
                  </FormControl>
                </Box>

              </Box>

              <Grid container gap={2} className='justify-evenly border rounded p-2'>
                <Grid item xs={3} >
                  <Button variant="contained" color="primary" type="submit" fullWidth>
                    Add Product
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" color="secondary" fullWidth startIcon={<UpdateIcon />}>
                    Update
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" color="error" fullWidth startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </div >
  );
};

export default AddProductForm;
