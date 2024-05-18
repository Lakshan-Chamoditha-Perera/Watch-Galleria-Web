import React from 'react';
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { AiFillStar } from 'react-icons/ai';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { FiEye } from 'react-icons/fi';  // Importing view icon

const Products = () => {
    return (
        <Card isFooterBlurred className="w-[300px] h-[480px] col-span-12 sm:col-span-5">
            <CardHeader className="absolute z-10 flex-col items-start">
                <p className="text-tiny w-[40px] border-2 border-red-200 rounded text-red-500 uppercase font-bold">New</p>
            </CardHeader>
            <Image
                alt="Card example background"
                className="z-0 w-full h-full scale-85  top-3 -translate-y-2 object-cover hover:scale-100 transition-transform duration-300 ease-in-out"
                src="https://www.casio.com/content/dam/casio/product-info/locales/intl/en/timepiece/product/watch/G/GA/GA1/GA-1000-1A/assets/GA-1000-1A_Seq1.png.transform/main-visual-pc/image.png"
            />
            <CardFooter className="p-3 flex flex-col align-baseline items-start bg-white/30 border-t-1 border-zinc-100/50 z-10">
                <div className="flex w-full h-full py-0 justify-between items-center">
                    <h4 className="text-black p-0 font-bold text-xl">XRay Jr Dark</h4>
                    <strong className='text-[25px] text-red-500'>
                        $55.00
                    </strong>
                </div>
                <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                        <AiFillStar key={index} className="text-yellow-500" />
                    ))}
                </div>
                <p className="text-black text-xs mb-2">
                    Lorem ipsum dolor sit</p>
                <div className="flex justify-end w-full">
                    <Button color="primary" className='rounded-full ' radius="full" size="sm">
                        <BsFillBagHeartFill className="text-xl cursor-pointer" />
                    </Button>
                </div>2222222222222222222
            </CardFooter>
        </Card>
    );
}

export default Products;
