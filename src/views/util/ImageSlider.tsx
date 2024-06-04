import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import 'tailwindcss/tailwind.css';

const items = [
    {
        name: "Luxury Watch 1",
        description: "Experience the elegance and precision.",
        image: "https://via.placeholder.com/800x400?text=Luxury+Watch+1"
    },
    {
        name: "Luxury Watch 2",
        description: "Crafted with the finest materials.",
        image: "https://via.placeholder.com/800x400?text=Luxury+Watch+2"
    },
    {
        name: "Luxury Watch 3",
        description: "A timeless piece for the modern individual.",
        image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

const ImageSlider: React.FC = () => {
    return (
        <div className="flex border px-[13.33vw] flex-col border-red-500 items-center justify-center min-h-screen py-10 bg-gray-50">
            <h2 className="text-3xl font-bold mb-6">Our Collection</h2>
            <Carousel NextIcon PrevIcon className='w-full h-full border'>
                {items.map((item, i) => (
                    <Item key={i} item={item} />
                ))}
            </Carousel>
        </div>
    );
}

const Item = (props: { item: { name: string; description: string; image: string } }) => {
    return (
        <Paper className="">
            <img src={props.item.image} alt={props.item.name} className="w-full h-[800px] object-cover  mb-4" />
            <h3 className="text-2xl font-semibold">{props.item.name}</h3>
            <p className="text-gray-600">{props.item.description}</p>
        </Paper>
    );
}

export default ImageSlider;
