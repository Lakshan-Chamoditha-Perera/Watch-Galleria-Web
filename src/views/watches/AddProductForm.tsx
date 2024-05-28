import { useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { clear } from 'console';

const AddProductForm = () => {
    const [itemCode, setItemCode] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('CASUAL');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [rating, setRating] = useState(5);
    const [productDate, setProductDate] = useState('');
    const [gender, setGender] = useState('UNISEX');
    const [images, setImages] = useState<File[]>([]);

    const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const fileList = Array.from(files);
            const updatedImages = images ? [...images] : Array(4).fill(null);
            updatedImages[index] = fileList[0];

            const reader = new FileReader();
            reader.onload = () => {
                console.log(reader.result);
            };
            reader.readAsDataURL(fileList[0]);
            setImages(updatedImages);
        }
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    }

    const saveItem = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('itemCode', itemCode);
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('quantity', quantity + '');
        formData.append('rating', rating + '');
        formData.append('productDate', productDate);
        formData.append('gender', gender);

        images.map((image, index) => {
            if (image) {
                formData.append(`image${index + 1}`, image);
            }
        });

        const config = {
            method: "post",
            url: "http://localhost:3000/api/watch",
            data: formData,
        };

        axios.request(config).then((res) => {
            console.log(res.data);
            Swal.fire('Success', 'Item added successfully', 'success');
            clearAll();
        }).catch((err) => {
            console.log(err);
            Swal.fire('Error', 'An error occurred while adding item', 'error');
        })
    }

    const handleItemCode = (e) => {
        if (e.target.key === 'Enter') {
            e.preventDefault();
            console.log('Enter key pressed')
        } else {
            setItemCode(e.target.value)
            console.log(e.target.value)
        }
    }

    function clearAll() {
        setItemCode('');
        setProductName('');
        setDescription('');
        setCategory('CASUAL');
        setPrice('');
        setQuantity(0);
        setRating(5);
        setProductDate('');
        setGender('UNISEX');
        setImages([]);
    }


    return (<div className=" bg-[#F8F8F9] px-[13.33vw] flex justify-center">
        <Box className='p-3 border border-red-800 w-full '>
            <Typography className="text-left" fontWeight="bold" variant="h4" component="h1" gutterBottom>
                Manage Products
            </Typography>
            <Typography className="text-left " variant="subtitle1" gutterBottom>
                Add your product for your customers
            </Typography>

            <Box component="form" className="mt-3 p-3 bg-[#FEFEFF] rounded" noValidate
                autoComplete="off">
                <Grid container className='bg-[#FEFEFF] justify-center '>

                    <Grid className='p-3' item xs={12} md={6}>
                        <Box className='bg-[#FEFEFF]' mb={4}>
                            <Box p={2} borderRadius={2} className='border rounded'>
                                <Typography fontWeight="bold" variant="h6" component="h2" gutterBottom
                                    className="text-left">
                                    Basic Information
                                </Typography>
                                <TextField
                                    label="Item Code"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    value={itemCode}
                                    onChange={handleItemCode}
                                />
                                <TextField
                                    label="Product Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    onChange={(e) => {
                                        setProductName(e.target.value)
                                    }}
                                />
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    required
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box className='bg-[#FEFEFF] border rounded' mb={4}>
                            <Box p={2} borderRadius={2}>
                                <Typography fontWeight="bold" variant="h6" component="h2" gutterBottom
                                    className="text-left">
                                    Category
                                </Typography>
                                <FormControl variant="outlined" fullWidth margin="normal" required>
                                    <InputLabel>Product Category</InputLabel>
                                    <Select label="Product Category" value={category}
                                        onChange={(event) => {
                                            setCategory(event.target.value)
                                        }}>
                                        <MenuItem value="LUXURY">LUXURY</MenuItem>
                                        <MenuItem value="SPORT">SPORT</MenuItem>
                                        <MenuItem value="CASUAL">CASUAL</MenuItem>
                                        <MenuItem value="SMART">SMART</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box className='bg-[#FEFEFF] border rounded' mb={4}>
                            <Box p={2} borderRadius={2}>
                                <Typography fontWeight="bold" variant="h6" component="h2" gutterBottom
                                    className="text-left">
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
                                            onChange={(e) => {
                                                setPrice(e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Quantity"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            type="number"
                                            required
                                            onChange={(e) => {
                                                setQuantity(Number.parseInt(e.target.value))
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid className='p-3' item xs={12} md={6}>
                        <Box mb={4}>
                            <Box p={2} className='bg-[#FEFEFF] border rounded' borderRadius={2}>
                                <Typography fontWeight="bold" variant="h6" component="h2"
                                    gutterBottom
                                    className="text-left">
                                    Product Image
                                </Typography>
                                <Grid container spacing={2}>

                                    {[...Array(4)].map((_, index) => (
                                        <Grid item xs={6} sm={3} key={index}>
                                            <Button
                                                variant="outlined"
                                                component="label"
                                                fullWidth
                                                sx={{
                                                    height: '100px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                {images && images[index] ? (
                                                    <img
                                                        src={URL.createObjectURL(images[index])}
                                                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                                                        alt={`Uploaded preview ${index}`}
                                                    />
                                                ) : (
                                                    <AddPhotoAlternateIcon />
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    onChange={(e) => {
                                                        console.log(index)
                                                        handleFileChange(index, e)
                                                    }
                                                    }
                                                />
                                            </Button>
                                        </Grid>
                                    ))}

                                </Grid>
                            </Box>
                        </Box>
                        <Box mb={4}>
                            <Box p={2} className='bg-[#FEFEFF]  border rounded' borderRadius={2}>
                                <Typography fontWeight="bold" variant="h6" component="h2"
                                    gutterBottom
                                    className="text-left">
                                    Select Size
                                </Typography>
                                <TextField
                                    label="Ratings 1-5"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    onChange={(e) => {
                                        setRating(Number.parseInt(e.target.value))
                                    }}
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
                                    onChange={(e) => {
                                        setProductDate(e.target.value)
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box mb={4}>
                            <Box p={2} className='bg-[#FEFEFF]  border rounded' borderRadius={2}>
                                <Typography fontWeight="bold" variant="h6" className='text-left'
                                    gutterBottom>
                                    Gender
                                </Typography>

                                <FormControl className='border bg-[#FEFEFF]' component="fieldset"
                                    sx={{ width: '100%' }}>
                                    <RadioGroup
                                        sx={{ justifyContent: 'space-around', display: 'flex' }}
                                        className=' border rounded p-2 '
                                        aria-label="gender"
                                        name="gender"
                                        value={gender}
                                        onChange={handleGenderChange}
                                        row
                                    >
                                        <FormControlLabel value="MALE" control={<Radio />}
                                            label="Male" />
                                        <FormControlLabel value="FEMALE" control={<Radio />}
                                            label="Female" />
                                        <FormControlLabel value="UNISEX" control={<Radio />}
                                            label="Unisex" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Box>

                        <Grid container gap={2} className='justify-evenly border rounded p-2'>
                            <Grid item xs={3}>
                                <Button onClick={saveItem} variant="contained" color="primary" type="submit" fullWidth>
                                    Add Product
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" color="secondary" fullWidth
                                    startIcon={<UpdateIcon />}>
                                    Update
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" color="error" fullWidth
                                    startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </div>)
};

export default AddProductForm;


