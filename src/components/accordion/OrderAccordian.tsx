import * as React from 'react';
import Accordion, { AccordionSlots } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import { Box, Card, CardContent, Container, CssBaseline, Divider } from '@mui/material';

export default function OrderAccordian(props) {
  const element = props.element;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const StyledCard = styled(Card)`
  @apply bg-white rounded-lg shadow-lg p-4;
`;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          backgroundColor: 'white',
          '& .MuiTypography-root': {
            flexBasis: '33.33%',
          },
        }}
      >

        <div className="gap-3 border w-full  flex flex-row text-black">
          <div className="text-[18px]  border text-black">
            Order Id 
          </div>
            
          <div className="text-[10px] border justify-around flex items-center text-black">
            {
              element._id
            }
          </div>
        </div>
        <Typography className="pr-4">{new Date(element.createdAt).toDateString()}</Typography>
        <Typography className="pr-4">${Number(element.totalPrice).toFixed(2)}</Typography>
      </AccordionSummary>

      <CssBaseline />

      <Container className='m-4' maxWidth="sm">
        <StyledCard>
          <CardContent>

            <Box textAlign={'left'} sx={{ fontWeight: 'medium', }}>
              Order ID: {element._id}
            </Box>

            {/* text color ->  */}
            <Typography textAlign={'right'} variant="body2" gutterBottom>
              Order date: <p className='text-[#4CAF50] inline-block'>{new Date(element.createdAt).toDateString()}</p>
            </Typography>
            {/* <Typography textAlign={'right'} variant="body2" color="textSecondary" gutterBottom>
              Estimated delivery: May 14, 2022
            </Typography> */}
            <Divider className="" />

            <div className="space-y-2 my-3 ">
              {
                element.itemList.map((item) => {
                  return (
                    <div key={item.itemCode} className="flex my-2 items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img

                          src={item.image}
                          alt={item.itemCode}
                          className="w-16 bg-slate-100 p-1 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <Typography textAlign={'left'} variant="body2">{item.itemCode}</Typography>
                          <Typography textAlign={'left'} variant="body2" color="textSecondary">
                            {item.quantity} x $ {Number(item.price).toFixed(2)}
                          </Typography>
                        </div>
                      </div>
                      <Box textAlign={'left'} sx={{ fontWeight: 'medium' }}>
                        $ {Number(item.price * item.quantity).toFixed(2)}
                      </Box>
                    </div>
                  );
                })

              }

            </div>

            <Divider className="my-2" />

            {/* <div className="space-y-2">
              <Typography variant="body2">Payment</Typography>
              <Typography variant="body2">Visa **56</Typography>
              <Typography variant="body2">Address</Typography>
              <Typography variant="body2">
                847 Jewess Bridge Apt. 174
                <br />
                London, UK
                <br />
                474-769-3919
              </Typography>
            </div> */}

            {/* <Divider className="my-2" /> */}

            <div className="space-y-2 my-5">
              <Box textAlign={'left'} sx={{ fontWeight: 'medium', }}>
                Order Summary
              </Box>

              <div className="flex justify-between">
                <Typography variant="body2">Subtotal</Typography>
                <Typography variant="body2">${Number(element.totalPrice).toFixed(2)}</Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="body2">Discount</Typography>
                <Typography variant="body2">-$ 0.00</Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="body2">Delivery</Typography>
                <Typography variant="body2">$ 0.00</Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="body2">Tax</Typography>
                <Typography variant="body2">$ 0.00</Typography>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between">
                <Box sx={{ fontWeight: 'medium', fontSize: '1.1rem' }}>
                  Total
                </Box>
                <Box sx={{ fontWeight: 'medium', fontSize: '1.1rem' }}>
                  $ {Number(element.totalPrice).toFixed(2)}
                </Box>
              </div>
            </div>
          </CardContent>
        </StyledCard>
      </Container>


    </Accordion>
  );
}
