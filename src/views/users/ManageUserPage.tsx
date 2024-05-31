import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar, Button, TextField, Autocomplete, CardMedia } from '@mui/material';
import OrderAccordian from '../../components/accordion/OrderAccordian';
import { SnackbarProvider, useSnackbar } from 'notistack';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ManageUser = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [orderList, setOrderList] = useState([]);
    // @ts-ignore
    const { user } = useAuth();

    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [userProfile, setUserProfile] = useState('https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

    const stats = [
        { number: 5, label: 'All Bookings', percentage: '35.67%', color: '#3f51b5' },
        { number: 2, label: 'Completed', percentage: '25%', color: '#9c27b0' },
        { number: 5, label: 'Cancelled', percentage: '35.67%', color: '#f44336' },
    ];
    interface CountryType {
        code: string;
        name: string;
        phone: string;
        suggested?: boolean;
    }
    const countries: readonly CountryType[] = [
        { code: 'AD', name: 'Andorra', phone: '376' },
        { code: 'AE', name: 'United Arab Emirates', phone: '971', },
        { code: 'AF', name: 'Afghanistan', phone: '93' },
        { code: 'AG', name: 'Antigua and Barbuda', phone: '1-268', },
        { code: 'AI', name: 'Anguilla', phone: '1-264' },
        { code: 'AL', name: 'Albania', phone: '355' },
        { code: 'AM', name: 'Armenia', phone: '374' },
        { code: 'AO', name: 'Angola', phone: '244' },
        { code: 'AQ', name: 'Antarctica', phone: '672' },
        { code: 'AR', name: 'Argentina', phone: '54' },
        { code: 'AS', name: 'American Samoa', phone: '1-684' },
        { code: 'AT', name: 'Austria', phone: '43' },
        { code: 'AU', name: 'Australia', phone: '61', suggested: true, },
        { code: 'AW', name: 'Aruba', phone: '297' },
        { code: 'AX', name: 'Alland Islands', phone: '358' },
        { code: 'AZ', name: 'Azerbaijan', phone: '994' },
        { code: 'BA', name: 'Bosnia and Herzegovina', phone: '387', },
        { code: 'BB', name: 'Barbados', phone: '1-246' },
        { code: 'BD', name: 'Bangladesh', phone: '880' },
        { code: 'BE', name: 'Belgium', phone: '32' },
        { code: 'BF', name: 'Burkina Faso', phone: '226' },
        { code: 'BG', name: 'Bulgaria', phone: '359' },
        { code: 'BH', name: 'Bahrain', phone: '973' },
        { code: 'BI', name: 'Burundi', phone: '257' },
        { code: 'BJ', name: 'Benin', phone: '229' },
        { code: 'BL', name: 'Saint Barthelemy', phone: '590' },
        { code: 'BM', name: 'Bermuda', phone: '1-441' },
        { code: 'BN', name: 'Brunei Darussalam', phone: '673' },
        { code: 'BO', name: 'Bolivia', phone: '591' },
        { code: 'BR', name: 'Brazil', phone: '55' },
        { code: 'BS', name: 'Bahamas', phone: '1-242' },
        { code: 'BT', name: 'Bhutan', phone: '975' },
        { code: 'BV', name: 'Bouvet Island', phone: '47' },
        { code: 'BW', name: 'Botswana', phone: '267' },
        { code: 'BY', name: 'Belarus', phone: '375' },
        { code: 'BZ', name: 'Belize', phone: '501' },
        { code: 'CA', name: 'Canada', phone: '1', suggested: true, },
        { code: 'CC', name: 'Cocos (Keeling) Islands', phone: '61', },
        { code: 'CD', name: 'Congo, Democratic Republic of the', phone: '243', },
        { code: 'CF', name: 'Central African Republic', phone: '236', },
        { code: 'CG', name: 'Congo, Republic of the', phone: '242', },
        { code: 'CH', name: 'Switzerland', phone: '41' },
        { code: 'CI', name: "Cote d'Ivoire", phone: '225' },
        { code: 'CK', name: 'Cook Islands', phone: '682' },
        { code: 'CL', name: 'Chile', phone: '56' },
        { code: 'CM', name: 'Cameroon', phone: '237' },
        { code: 'CN', name: 'China', phone: '86' },
        { code: 'CO', name: 'Colombia', phone: '57' },
        { code: 'CR', name: 'Costa Rica', phone: '506' },
        { code: 'CU', name: 'Cuba', phone: '53' },
        { code: 'CV', name: 'Cape Verde', phone: '238' },
        { code: 'CW', name: 'Curacao', phone: '599' },
        { code: 'CX', name: 'Christmas Island', phone: '61' },
        { code: 'CY', name: 'Cyprus', phone: '357' },
        { code: 'CZ', name: 'Czech Republic', phone: '420' },
        { code: 'DE', name: 'Germany', phone: '49', suggested: true, },
        { code: 'DJ', name: 'Djibouti', phone: '253' },
        { code: 'DK', name: 'Denmark', phone: '45' },
        { code: 'DM', name: 'Dominica', phone: '1-767' },
        { code: 'DO', name: 'Dominican Republic', phone: '1-809', },
        { code: 'DZ', name: 'Algeria', phone: '213' },
        { code: 'EC', name: 'Ecuador', phone: '593' },
        { code: 'EE', name: 'Estonia', phone: '372' },
        { code: 'EG', name: 'Egypt', phone: '20' },
        { code: 'EH', name: 'Western Sahara', phone: '212' },
        { code: 'ER', name: 'Eritrea', phone: '291' },
        { code: 'ES', name: 'Spain', phone: '34' },
        { code: 'ET', name: 'Ethiopia', phone: '251' },
        { code: 'FI', name: 'Finland', phone: '358' },
        { code: 'FJ', name: 'Fiji', phone: '679' },
        { code: 'FK', name: 'Falkland Islands (Malvinas)', phone: '500', },
        { code: 'FM', name: 'Micronesia, Federated States of', phone: '691', },
        { code: 'FO', name: 'Faroe Islands', phone: '298' },
        { code: 'FR', name: 'France', phone: '33', suggested: true, },
        { code: 'GA', name: 'Gabon', phone: '241' },
        { code: 'GB', name: 'United Kingdom', phone: '44' },
        { code: 'GD', name: 'Grenada', phone: '1-473' },
        { code: 'GE', name: 'Georgia', phone: '995' },
        { code: 'GF', name: 'French Guiana', phone: '594' },
        { code: 'GG', name: 'Guernsey', phone: '44' },
        { code: 'GH', name: 'Ghana', phone: '233' },
        { code: 'GI', name: 'Gibraltar', phone: '350' },
        { code: 'GL', name: 'Greenland', phone: '299' },
        { code: 'GM', name: 'Gambia', phone: '220' },
        { code: 'GN', name: 'Guinea', phone: '224' },
        { code: 'GP', name: 'Guadeloupe', phone: '590' },
        { code: 'GQ', name: 'Equatorial Guinea', phone: '240' },
        { code: 'GR', name: 'Greece', phone: '30' },
        { code: 'GS', name: 'South Georgia and the South Sandwich Islands', phone: '500', },
        { code: 'GT', name: 'Guatemala', phone: '502' },
        { code: 'GU', name: 'Guam', phone: '1-671' },
        { code: 'GW', name: 'Guinea-Bissau', phone: '245' },
        { code: 'GY', name: 'Guyana', phone: '592' },
        { code: 'HK', name: 'Hong Kong', phone: '852' },
        { code: 'HM', name: 'Heard Island and McDonald Islands', phone: '672', },
        { code: 'HN', name: 'Honduras', phone: '504' },
        { code: 'HR', name: 'Croatia', phone: '385' },
        { code: 'HT', name: 'Haiti', phone: '509' },
        { code: 'HU', name: 'Hungary', phone: '36' },
        { code: 'ID', name: 'Indonesia', phone: '62' },
        { code: 'IE', name: 'Ireland', phone: '353' },
        { code: 'IL', name: 'Israel', phone: '972' },
        { code: 'IM', name: 'Isle of Man', phone: '44' },
        { code: 'IN', name: 'India', phone: '91' },
        { code: 'IO', name: 'British Indian Ocean Territory', phone: '246', },
        { code: 'IQ', name: 'Iraq', phone: '964' },
        { code: 'IR', name: 'Iran, Islamic Republic of', phone: '98', },
        { code: 'IS', name: 'Iceland', phone: '354' },
        { code: 'IT', name: 'Italy', phone: '39' },
        { code: 'JE', name: 'Jersey', phone: '44' },
        { code: 'JM', name: 'Jamaica', phone: '1-876' },
        { code: 'JO', name: 'Jordan', phone: '962' },
        { code: 'JP', name: 'Japan', phone: '81', suggested: true, },
        { code: 'KE', name: 'Kenya', phone: '254' },
        { code: 'KG', name: 'Kyrgyzstan', phone: '996' },
        { code: 'KH', name: 'Cambodia', phone: '855' },
        { code: 'KI', name: 'Kiribati', phone: '686' },
        { code: 'KM', name: 'Comoros', phone: '269' },
        { code: 'KN', name: 'Saint Kitts and Nevis', phone: '1-869', },
        { code: 'KP', name: "Korea, Democratic People's Republic of", phone: '850' },
        { code: 'KR', name: 'Korea, Republic of', phone: '82' },
        { code: 'KW', name: 'Kuwait', phone: '965' },
        { code: 'KY', name: 'Cayman Islands', phone: '1-345' },
        { code: 'KZ', name: 'Kazakhstan', phone: '7' },
        { code: 'LA', name: "Lao People's Democratic Republic", phone: '856', },
        { code: 'LB', name: 'Lebanon', phone: '961' },
        { code: 'LC', name: 'Saint Lucia', phone: '1-758' },
        { code: 'LI', name: 'Liechtenstein', phone: '423' },
        { code: 'LK', name: 'Sri Lanka', phone: '94' },
        { code: 'LR', name: 'Liberia', phone: '231' },
        { code: 'LS', name: 'Lesotho', phone: '266' },
        { code: 'LT', name: 'Lithuania', phone: '370' },
        { code: 'LU', name: 'Luxembourg', phone: '352' },
        { code: 'LV', name: 'Latvia', phone: '371' },
        { code: 'LY', name: 'Libya', phone: '218' },
        { code: 'MA', name: 'Morocco', phone: '212' },
        { code: 'MC', name: 'Monaco', phone: '377' },
        { code: 'MD', name: 'Moldova, Republic of', phone: '373', },
        { code: 'ME', name: 'Montenegro', phone: '382' },
        { code: 'MF', name: 'Saint Martin (French part)', phone: '590', },
        { code: 'MG', name: 'Madagascar', phone: '261' },
        { code: 'MH', name: 'Marshall Islands', phone: '692' },
        { code: 'MK', name: 'Macedonia, the Former Yugoslav Republic of', phone: '389', },
        { code: 'ML', name: 'Mali', phone: '223' },
        { code: 'MM', name: 'Myanmar', phone: '95' },
        { code: 'MN', name: 'Mongolia', phone: '976' },
        { code: 'MO', name: 'Macao', phone: '853' },
        { code: 'MP', name: 'Northern Mariana Islands', phone: '1-670', },
        { code: 'MQ', name: 'Martinique', phone: '596' },
        { code: 'MR', name: 'Mauritania', phone: '222' },
        { code: 'MS', name: 'Montserrat', phone: '1-664' },
        { code: 'MT', name: 'Malta', phone: '356' },
        { code: 'MU', name: 'Mauritius', phone: '230' },
        { code: 'MV', name: 'Maldives', phone: '960' },
        { code: 'MW', name: 'Malawi', phone: '265' },
        { code: 'MX', name: 'Mexico', phone: '52' },
        { code: 'MY', name: 'Malaysia', phone: '60' },
        { code: 'MZ', name: 'Mozambique', phone: '258' },
        { code: 'NA', name: 'Namibia', phone: '264' },
        { code: 'NC', name: 'New Caledonia', phone: '687' },
        { code: 'NE', name: 'Niger', phone: '227' },
        { code: 'NF', name: 'Norfolk Island', phone: '672' },
        { code: 'NG', name: 'Nigeria', phone: '234' },
        { code: 'NI', name: 'Nicaragua', phone: '505' },
        { code: 'NL', name: 'Netherlands', phone: '31' },
        { code: 'NO', name: 'Norway', phone: '47' },
        { code: 'NP', name: 'Nepal', phone: '977' },
        { code: 'NR', name: 'Nauru', phone: '674' },
        { code: 'NU', name: 'Niue', phone: '683' },
        { code: 'NZ', name: 'New Zealand', phone: '64' },
        { code: 'OM', name: 'Oman', phone: '968' },
        { code: 'PA', name: 'Panama', phone: '507' },
        { code: 'PE', name: 'Peru', phone: '51' },
        { code: 'PF', name: 'French Polynesia', phone: '689' },
        { code: 'PG', name: 'Papua New Guinea', phone: '675' },
        { code: 'PH', name: 'Philippines', phone: '63' },
        { code: 'PK', name: 'Pakistan', phone: '92' },
        { code: 'PL', name: 'Poland', phone: '48' },
        { code: 'PM', name: 'Saint Pierre and Miquelon', phone: '508', },
        { code: 'PN', name: 'Pitcairn', phone: '870' },
        { code: 'PR', name: 'Puerto Rico', phone: '1' },
        { code: 'PS', name: 'Palestine, State of', phone: '970', },
        { code: 'PT', name: 'Portugal', phone: '351' },
        { code: 'PW', name: 'Palau', phone: '680' },
        { code: 'PY', name: 'Paraguay', phone: '595' },
        { code: 'QA', name: 'Qatar', phone: '974' },
        { code: 'RE', name: 'Reunion', phone: '262' },
        { code: 'RO', name: 'Romania', phone: '40' },
        { code: 'RS', name: 'Serbia', phone: '381' },
        { code: 'RU', name: 'Russian Federation', phone: '7' },
        { code: 'RW', name: 'Rwanda', phone: '250' },
        { code: 'SA', name: 'Saudi Arabia', phone: '966' },
        { code: 'SB', name: 'Solomon Islands', phone: '677' },
        { code: 'SC', name: 'Seychelles', phone: '248' },
        { code: 'SD', name: 'Sudan', phone: '249' },
        { code: 'SE', name: 'Sweden', phone: '46' },
        { code: 'SG', name: 'Singapore', phone: '65' },
        { code: 'SH', name: 'Saint Helena', phone: '290' },
        { code: 'SI', name: 'Slovenia', phone: '386' },
        { code: 'SJ', name: 'Svalbard and Jan Mayen', phone: '47', },
        { code: 'SK', name: 'Slovakia', phone: '421' },
        { code: 'SL', name: 'Sierra Leone', phone: '232' },
        { code: 'SM', name: 'San Marino', phone: '378' },
        { code: 'SN', name: 'Senegal', phone: '221' },
        { code: 'SO', name: 'Somalia', phone: '252' },
        { code: 'SR', name: 'Suriname', phone: '597' },
        { code: 'SS', name: 'South Sudan', phone: '211' },
        { code: 'ST', name: 'Sao Tome and Principe', phone: '239', },
        { code: 'SV', name: 'El Salvador', phone: '503' },
        { code: 'SX', name: 'Sint Maarten (Dutch part)', phone: '1-721', },
        { code: 'SY', name: 'Syrian Arab Republic', phone: '963', },
        { code: 'SZ', name: 'Swaziland', phone: '268' },
        { code: 'TC', name: 'Turks and Caicos Islands', phone: '1-649', },
        { code: 'TD', name: 'Chad', phone: '235' },
        { code: 'TF', name: 'French Southern Territories', phone: '262', },
        { code: 'TG', name: 'Togo', phone: '228' },
        { code: 'TH', name: 'Thailand', phone: '66' },
        { code: 'TJ', name: 'Tajikistan', phone: '992' },
        { code: 'TK', name: 'Tokelau', phone: '690' },
        { code: 'TL', name: 'Timor-Leste', phone: '670' },
        { code: 'TM', name: 'Turkmenistan', phone: '993' },
        { code: 'TN', name: 'Tunisia', phone: '216' },
        { code: 'TO', name: 'Tonga', phone: '676' },
        { code: 'TR', name: 'Turkey', phone: '90' },
        { code: 'TT', name: 'Trinidad and Tobago', phone: '1-868', },
        { code: 'TV', name: 'Tuvalu', phone: '688' },
        { code: 'TW', name: 'Taiwan', phone: '886', },
        { code: 'TZ', name: 'United Republic of Tanzania', phone: '255', },
        { code: 'UA', name: 'Ukraine', phone: '380' },
        { code: 'UG', name: 'Uganda', phone: '256' },
        { code: 'US', name: 'United States', phone: '1', suggested: true, },
        { code: 'UY', name: 'Uruguay', phone: '598' },
        { code: 'UZ', name: 'Uzbekistan', phone: '998' },
        { code: 'VA', name: 'Holy See (Vatican City State)', phone: '379', },
        { code: 'VC', name: 'Saint Vincent and the Grenadines', phone: '1-784', },
        { code: 'VE', name: 'Venezuela', phone: '58' },
        { code: 'VG', name: 'British Virgin Islands', phone: '1-284', },
        { code: 'VI', name: 'US Virgin Islands', phone: '1-340', },
        { code: 'VN', name: 'Vietnam', phone: '84' },
        { code: 'VU', name: 'Vanuatu', phone: '678' },
        { code: 'WF', name: 'Wallis and Futuna', phone: '681' },
        { code: 'WS', name: 'Samoa', phone: '685' },
        { code: 'XK', name: 'Kosovo', phone: '383' },
        { code: 'YE', name: 'Yemen', phone: '967' },
        { code: 'YT', name: 'Mayotte', phone: '262' },
        { code: 'ZA', name: 'South Africa', phone: '27' },
        { code: 'ZM', name: 'Zambia', phone: '260' },
        { code: 'ZW', name: 'Zimbabwe', phone: '263' },
    ];

    function handleAddressChange(e) {
        setAddress(e.target.value);
    }

    function handleCityChange(e) {
        setCity(e.target.value);
    }

    function handlePostalCodeChange(e) {
        setPostalCode(e.target.value);
    }

    function updateUserDetail(e) {
        e.preventDefault();
        enqueueSnackbar('User details updated successfully', { variant: 'success' });
    }

    //GET ALL ORDERS
    const getAllOrders = async () => {

        try {
            const config = {
                method: "get",
                // ${user.email}
                url: `http://localhost:3000/api/orders/${user.email}`
            };

            await axios.request(config).then(response => {
                setOrderList(response.data.data);
                console.log(response.data.data);
                enqueueSnackbar('Orders fetched successfully', { variant: 'success' });
            }).catch(error => {
                enqueueSnackbar('Failed to fetch orders', { variant: 'error' });
            });

        } catch {
            enqueueSnackbar('Failed to fetch orders', { variant: 'error' });
        }
    }

    //SET USER DETAILS
    const setUserDetails = () => {
        console.log("Set User Details")
        if (user) {
            setUserEmail(user.email);
            setUserName(user.name);
            setAddress(user.address);
            setCity(user.city);
            setPostalCode(user.postalCode);
            setUserProfile(user.profileUrl);
            setCreatedAt(user.createdAt);
        }
    }

    const uploadProfileImage = async (e) => {
        enqueueSnackbar('uploading image', { variant: 'success' });
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profileImage', file);

            try {
                const response = await axios.post(`http://localhost:3000/api/users/profile_image/${user.email}`, formData);
                setUserProfile(response.data.profileUrl);
                console.log(response.data);
                if(response.status == 200){
                    console.log(response.data.data.photoURL);
                    setUserProfile(response.data.data.photoURL);
                }
                enqueueSnackbar('Profile image updated successfully', { variant: 'success' });
            } catch (error) {
                enqueueSnackbar('Failed to upload image', { variant: 'error' });
            }
        }
    };

    const handleFileInputClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        enqueueSnackbar('button action triggered', { variant: 'success' });
        const fileInput = document.getElementById('profile-image-upload');
        fileInput?.click();
    };

    useEffect(() => {
        setUserDetails();
        getAllOrders();
    }, []);


    return (
        <Box className='bg-[#F8FAFA] px-[13.33vw]' sx={{ p: 3, minHeight: '93vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Grid className=' mt-5 w-full px-[13.33vw] ' >
                <Card className='inline-block text-left px-10 text-5xl bg-white w-full'>
                    User Details
                </Card>
            </Grid>


            <Grid container className='min-h-[80vh]  mt-5 px-[13.33vw] ' spacing={3} sx={{ minHeight: 'fit' }}>

                {/* Profile Section */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}

                    >
                        <Avatar
                            alt={userName}
                            src={userProfile}
                            sx={{ width: 120, height: 120, mb: 2 }}
                        />
                        <input
                            accept="image/*"
                            type="file"
                            onChange={uploadProfileImage}
                            style={{ display: 'none' }}
                            id="profile-image-upload"
                        />
                        <Button variant="text" component="span" onClick={handleFileInputClick}>
                            Upload Profile Image
                        </Button>
                        <Typography variant="h6" gutterBottom>
                            {userName}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Member Since: {new Date(user.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Last Seen: 2 days ago
                        </Typography>

                        <CardContent sx={{ width: '100%' }}>
                            <TextField
                                size='small'
                                value={userEmail}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>


                {/* Billing Information Section */}
                <Grid item xs={12} md={8}>
                    {/* <Grid container spacing={3} sx={{ maxWidth: '1200px', mb: 3 }}>
                        {stats.map((stat, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                                    <Typography variant="h4" component="div" sx={{ color: stat.color }}>
                                        {stat.number}
                                    </Typography>
                                    <Typography variant="body1" component="div" gutterBottom>
                                        {stat.label}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {stat.percentage}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>  */}
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Box textAlign={'left'} sx={{ fontWeight: 'medium', }}>
                                Billing Information
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body1" textAlign={'left'} component="div" sx={{ width: '25%' }}>
                                        Address Line
                                    </Typography>
                                    <TextField
                                        size="small"
                                        label="No. 123, 4th Street"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        onChange={handleAddressChange}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body1" textAlign={'left'} component="div" sx={{ width: '25%' }}>
                                        City
                                    </Typography>
                                    <TextField
                                        size="small"
                                        label="Colombo"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        onChange={handleCityChange}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body1" textAlign={'left'} component="div" sx={{ width: '25%' }}>
                                        Postal Code
                                    </Typography>
                                    <TextField
                                        size="small"
                                        label="12345"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        onChange={handlePostalCodeChange}
                                    />
                                </Box>

                                <Box className=' py-2' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body1" textAlign={'left'} component="div" sx={{ width: '25%' }}>
                                        Country
                                    </Typography>
                                    {/* <Autocomplete
                                        fullWidth
                                        size='small'
                                        id="country-customized-option-demo"
                                        options={countries}
                                        // disableCloseOnSelect
                                        getOptionLabel={(option: CountryType) =>
                                            `${option.name} (${option.code}) +${option.phone}`
                                        }
                                        defaultValue={countries[0]}

                                        renderInput={(params) => <TextField {...params} label="" />}
                                    /> */}
                                </Box>

                                <Box className='pt-2 flex flex-row justify-end' >
                                    <Button size='small' variant="outlined" color="primary" onClick={updateUserDetail} >
                                        Save Changes
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Box textAlign={'left'} sx={{ fontWeight: 'medium', }}>
                                Recent Orders
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Total Orders : {orderList.length}
                                </Typography>
                                {/* <Button variant="outlined" size="small">Invoices</Button> */}
                                {/* total */}
                            </Box>
                            {

                                (orderList && orderList.length > 0) ? orderList.map((appointment, index) => (
                                    <Box
                                        key={index}
                                        className=' py-2'
                                    >
                                        <OrderAccordian element={appointment} />
                                        {/* <Box>
                                        <Typography variant="body1">{appointment.date}</Typography>
                                        <Typography variant="body2" color="textSecondary">{appointment.service}</Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ color: appointment.color }}>
                                        {appointment.status}
                                    </Typography>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="body1">{appointment.cost}</Typography>
                                        <Typography variant="body2" color="textSecondary">{appointment.rate}</Typography>
                                    </Box> */}

                                    </Box>

                                )) : <Card className='' sx={{ maxWidth: 345, textAlign: 'center', padding: 2 }}>
                                    <CardMedia
                                        component="img"
                                        alt="No Orders"
                                        height="140"
                                        image="https://cdn.dribbble.com/users/2241516/screenshots/6444657/________.gif" // Replace with your image URL
                                        title="No Orders"
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            No orders yet !
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            It looks like you have place any orders yet.
                                        </Typography>
                                        <Button variant="outlined" size="small">
                                            Place an order
                                        </Button>
                                    </CardContent>
                                </Card>
                            }

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Box>
    );
}



export default function ManageUserPage() {
    return (
        <SnackbarProvider maxSnack={3}
            anchorOrigin={
                { vertical: 'top', horizontal: 'right' }
            }
        >
            <ManageUser />
        </SnackbarProvider>
    );
}