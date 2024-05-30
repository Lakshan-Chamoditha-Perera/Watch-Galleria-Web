import { Button } from '@mui/material'
import React from 'react'

const ManageUserPage = () => {
    return (
        <div className="bg-[#FEFEFE] border border-red-500 px-[13.33vw] flex h-[93vh] py-6">
            <div className="w-full border flex flex-col items-center">
                <div className='border w-full'>
                    <h1 className="text-4xl text-left font-bold">Profile</h1>
                    <p className="text-lg text-left ">
                        Manage your profile
                    </p>
                </div>

                <div className="w-full h-full flex flex-row justify-between mt-4">
                    {/* Left side for user personal information */}
                    <div className="w-1/3 h-full border p-4">
                        <div className="flex flex-col items-center">
                            {/* Profile Image */}
                            <div className="max-w-[250px] max-h-[250px] rounded-full border overflow-hidden flex justify-center items-center relative mb-4">
                                <label htmlFor="profile-picture" className="cursor-pointer">
                                    <img
                                        src='https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                                        className="rounded-full"
                                    />
                                    <input
                                        id="profile-picture"
                                        type="file"
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            </div>
                            {/* User Personal Information */}
                            <div className="w-full">
                                <div className="mb-2">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                    <input type="text" id="username" className="mt-1 p-2 border w-full rounded-md" />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" className="mt-1 p-2 border w-full rounded-md" />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                    <input type="tel" id="mobile" className="mt-1 p-2 border w-full rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right side for billing information */}
                    <div className="w-2/3 h-full border p-4">
                        <div className="flex flex-col items-center">
                            {/* Billing Information */}
                            <div className="w-full">
                                <div className="mb-2">
                                    <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">Billing Address</label>
                                    <input type="text" id="billingAddress" className="mt-1 p-2 border w-full rounded-md" />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700">City</label>
                                    <input type="text" id="billingCity" className="mt-1 p-2 border w-full rounded-md" />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="billingZip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                                    <input type="text" id="billingZip" className="mt-1 p-2 border w-full rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageUserPage;
