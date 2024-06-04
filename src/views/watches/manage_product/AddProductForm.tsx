import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { WatchDto } from '../../../util/dto/watch.dto';
import './addProductForm.css'

const ManageProductForm = () => {
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
    const [itemList, setItemList] = useState<WatchDto[]>([]);
    const [disableButton, setDisableButton] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const [watchImgURL, setWatchImgURL] = useState(undefined);

    useEffect(() => {
        loadAllItemList();
    }, []);



    const validateForm = () => {
        const itemCodeRegex = /^[a-zA-Z0-9_-\s]+$/;
        const productNameRegex = /^[a-zA-Z0-9\s]+$/;
        const descriptionRegex = /^.{1,500}$/;
        const priceRegex = /^\d+(\.\d{1,2})?$/;
        const productDateRegex = /^\d{4}-\d{2}-\d{2}$/;
        const quantityRegex = /^\d+$/;
        const validCategories = ["LUXURY", "SPORT", "CASUAL", "SMART"];
        const validGenders = ["MALE", "FEMALE", "UNISEX"];
        try {

            if (!itemCodeRegex.test(itemCode)) {
                throw new Error('Please enter a valid item code');
            }
            if (!productNameRegex.test(productName)) {
                throw new Error('Please enter a valid product name');
            }
            if (!descriptionRegex.test(description)) {
                throw new Error('Please enter a valid description (1 to 500 characters)');
            }
            if (!priceRegex.test(price) || Number(price) <= 0) {
                throw new Error('Please enter a valid price');
            }
            if (!productDateRegex.test(productDate)) {
                throw new Error('Please enter a valid product date');
            }
            if (!quantityRegex.test(String(quantity)) || Number(quantity) <= 0) {
                throw new Error('Please enter a valid quantity');
            }
            if (!validCategories.includes(category)) {
                throw new Error('Please select a valid category');
            }
            if (rating < 0 || rating > 5) {
                throw new Error('Please enter a valid rating (0-5)');
            }
            if (!images || images.length == 0 || images[0].type.includes('image') == false) {
                throw new Error('Please select an valid image');
            }
            if (!validGenders.includes(gender)) {
                throw new Error('Please select a valid category');
            }
            return true;
        } catch (err) {
            enqueueSnackbar(err.message, { variant: 'error' });
            return false;
        }

    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWatchImgURL(undefined);

        const files = e.target.files;
        // check file is jpg or png avif , jpeg 

        if (files && files.length > 0 && files[0].type.includes('image')) {
            const fileList = Array.from(files);
            const updatedImages = images ? [...images] : Array(1).fill(null);
            updatedImages[0] = fileList[0];

            const reader = new FileReader();
            reader.onload = () => {
                console.log(reader.result);
            };
            reader.readAsDataURL(fileList[0]);
            setImages(updatedImages);
        } else {
            setImages([]);
            enqueueSnackbar('Please select an image', { variant: 'error' });
        }
    };


    const handleGenderChange = (event) => {
        setGender(event.target.value);
    }

    // SAVE ITEM
    const saveItem = (e) => {
        e.preventDefault();
        if (validateForm()) {
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
                enqueueSnackbar('Item added successfully', { variant: 'success' });
                clearAll();
            }).catch((err) => {
                console.log(err);
                enqueueSnackbar(err.message, { variant: 'error' });
            })
        } loadAllItemList();
    }

    //DELETE ITEM
    const deleteItem = () => {
        if (selectedItem) {
            axios.delete(`http://localhost:3000/api/watch/${itemCode}`).then((res) => {
                if (res.status === 200) {
                    enqueueSnackbar('Item deleted successfully', { variant: 'success' });
                    clearAll();
                    loadAllItemList();
                } else {
                    enqueueSnackbar('Failed to delete item', { variant: 'error' });
                }
            }).catch((err) => {
                console.log(err);
                enqueueSnackbar(err.response.data.error, { variant: 'error' });
            })
        } else {
            enqueueSnackbar('Please select an item to delete', { variant: 'error' });
        }
    }

    // GET ALL ITEMS
    const loadAllItemList = async () => {
        await axios.get('http://localhost:3000/api/watch').then((res) => {
            if (res.data.data) {
                console.log(res.data.data);
                const watchList = res.data.data.map((item) =>
                    new WatchDto(
                        item.itemCode,
                        item.productName,
                        item.description,
                        item.category,
                        item.price,
                        item.quantity,
                        item.rating,
                        new Date(item.productDate),
                        item.gender,
                        item.imageUrlList,
                        0
                    ));

                setItemList(watchList);
            }
        }).catch((err) => {
            enqueueSnackbar('Failed to fetch items', { variant: 'error' });
        });
    }

    //UPDATE ITEM
    const updateItem = () => {
        if (selectedItem) {
            if (validateForm()) {
                enqueueSnackbar('Item details validated successfully', { variant: 'success' });
            }
        } else {
            enqueueSnackbar('Please select an item to update', { variant: 'info' });
        }
    }



    const handleItemCode = (e) => {
        if (e.target.value != '') {
            enqueueSnackbar(e.target.value, { variant: 'info' })
            setSelectedItem(undefined);
            setItemCode(e.target.value)
            setDisableButton(false);
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

    const [selectedItem, setSelectedItem] = useState<WatchDto>();

    const handleOptionChange = (event, newValue) => {

        let selectedItem;
        itemList.map((element) => {
            if (element.itemCode === newValue) {
                selectedItem = element
                enqueueSnackbar(selectedItem.itemCode + ' is selected. ', { variant: 'info' });
            }
        });

        setSelectedItem(selectedItem);
        if (selectedItem) {
            setItemCode(selectedItem.itemCode);
            setProductName(selectedItem.productName);
            setDescription(selectedItem.description);
            setCategory(selectedItem.category);
            setPrice(selectedItem.price + '');
            setQuantity(selectedItem.quantity);
            setRating(selectedItem.rating);
            setProductDate(selectedItem.productDate.toISOString().split('T')[0]);
            setGender(selectedItem.gender);
            setImages([]);
            setWatchImgURL(selectedItem.imageUrlList[0]);
            setDisableButton(true);
        }
    };

    const handleRatingChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            setRating(0);
        } else {
            const numberValue = Number.parseInt(value, 10);
            if (!isNaN(numberValue) && numberValue >= 0 && numberValue <= 5) {
                setRating(numberValue);
            }
        }
    };

    return (<div className=" px-[13.33vw] my-10 flex flex-col justify-center min-h-[80vh]">

        <Box className='rounded p-3 glass-card'>
            <Typography fontWeight="bold" className="text-left " variant="h3"  >
                Manage Products
                <Typography className="text-left" variant="subtitle1" gutterBottom>
                    Add new products, update or delete existing products
                </Typography>
            </Typography>
        </Box>


        <Box component="form" className="mt-3  rounded" noValidate autoComplete="off">

            <div className='flex flex-wrap gap-5 justify-between '>

                <Grid xs={12} md={7} className=" h-fit glass-card">
                    <Box className='bg-[#FEFEFF]' mb={4}>
                        <Box p={2} borderRadius={2} className='rounded'>
                            <Typography fontWeight="bold" variant="h5" component="h2" gutterBottom
                                className="text-left">
                                Basic Information
                            </Typography>
                            <Stack spacing={2}>
                                <Autocomplete
                                    freeSolo
                                    disableClearable
                                    options={itemList.map((option: WatchDto) => option.itemCode)}
                                    onChange={handleOptionChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Item code"
                                            onChange={handleItemCode}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                        />
                                    )}
                                />
                            </Stack>
                            <TextField
                                size='small'
                                label="Product Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                value={productName}
                                onChange={(e) => {
                                    setProductName(e.target.value)
                                }}
                            />
                            <TextField
                                size='small'
                                label="Description"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={4}
                                required
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                            />
                        </Box>
                    </Box>


                    <Box className='bg-[#FEFEFF]  rounded' mb={4}>
                        <Box p={2} borderRadius={2}>
                            <Typography fontWeight="bold" variant="h5" component="h2" gutterBottom
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


                    <Box className='bg-[#FEFEFF]  rounded' mb={4}>
                        <Box p={2} borderRadius={2}>
                            <Typography fontWeight="bold" variant="h5" component="h2" gutterBottom
                                className="text-left">
                                Price & Quantity
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField

                                        size='small'
                                        value={price}
                                        label="Price"
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        type="number"
                                        required={true}

                                        onChange={(e) => {
                                            setPrice(e.target.value)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField

                                        size='small'
                                        value={quantity}
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

                <Grid xs={12} md={4} lg={1} className="justify-start w-[400px] glass-card">



                    {/* Size and Date */}
                    <Box mb={4}>
                        <Box p={2} className='bg-[#FEFEFF]  rounded' borderRadius={2}>
                            <Typography fontWeight="bold" variant="h5" component="h2"
                                gutterBottom
                                className="text-left">
                                Rating & Date
                            </Typography>
                            <TextField
                                size='small'
                                value={rating}
                                label="Ratings 0-5"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                type="number"
                                onChange={handleRatingChange}
                                inputProps={{ min: 0, max: 5 }}
                            />
                            <TextField
                                size='small'
                                value={productDate}
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

                    {/* Gender */}
                    <Box mb={4}>
                        <Box px={2} className='bg-[#FEFEFF]  rounded' borderRadius={2}>
                            <Typography fontWeight="bold" variant="h5" className='text-left'
                                gutterBottom>
                                Gender
                            </Typography>

                            <FormControl component="fieldset"
                                sx={{ width: '100%' }}>
                                <RadioGroup
                                    sx={{ justifyContent: 'space-around', display: 'flex' }}
                                    className='rounded border p-2 '
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

                </Grid>

                <div className='flex flex-col justify-between glass-card' >

                    <Box p={2} className="bg-[#FEFEFF] h-[650px] w-[400px] max-w-[400px] rounded" borderRadius={2}>
                        <Typography fontWeight="bold" variant="h5" component="h2" gutterBottom className="text-left">
                            Product Image
                        </Typography>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            className='h-[70%]'
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}
                        >
                            {images ? (
                                <img
                                    src={watchImgURL ? watchImgURL : images[0] ? URL.createObjectURL(images[0]) : ""}
                                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                                />
                            ) : (
                                <AddPhotoAlternateIcon />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => handleFileChange(e)}
                            />
                        </Button>

                    </Box>


                    {/* buttons */}
                    <div className='justify-end gap-4 flex  rounded p-2'>

                        <Button disabled={disableButton} variant="contained" color="primary" type="submit"
                            startIcon={<AddIcon />}
                            onClick={saveItem}>
                            &nbsp;&nbsp;  Add  &nbsp;&nbsp;
                        </Button>
                        <Button disabled={!disableButton} variant="contained" color="success"
                            startIcon={<UpdateIcon />}
                            onClick={updateItem}>
                            Update
                        </Button>
                        <Button disabled={!disableButton} variant="contained" color="error"
                            startIcon={<DeleteIcon />}
                            onClick={deleteItem}
                        >
                            Delete
                        </Button>
                    </div>

                </div>

            </div>

        </Box>

    </div>)

};

export default function ManageProducts() {
    return (
        <SnackbarProvider maxSnack={3}
            anchorOrigin={
                { vertical: 'top', horizontal: 'right' }
            }
        >
            <ManageProductForm />
        </SnackbarProvider>
    );
}

