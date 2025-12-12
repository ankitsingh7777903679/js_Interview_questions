import React from 'react'
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import EnquiryList from './components/EnquiryList';
import axios from 'axios';
export default function Enquiry() {
    let saveEnquiry = (e) => {
        e.preventDefault();

        let formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            message: e.target.message.value,
        }
        axios.post(`http://localhost:8000/api/website/enquiry/insert`, formData).then((res)=>{
            console.log(res.data);
        })

    }
    return (
        <>

            <h1 className='text-3xl font-bold text-center py-6'>User Enquiry</h1>
            <div className='grid grid-cols-[30%_auto] gap-10'>
                <div className=' p-4 bg-[#626f85] rounded'>
                    <h2 className='text-[20px] font-bold'>Enquire Form</h2>
                    <form className="flex max-w-md flex-col gap-4" onSubmit={saveEnquiry}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name">Your Name</Label>
                            </div>
                            <TextInput id="name" name="name" type="text" placeholder="Your Name" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email">Your Email</Label>
                            </div>
                            <TextInput id="email" name="email" type="email" placeholder="name@flowbite.com" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone">Your Phone</Label>
                            </div>
                            <TextInput id="phone" name="phone" type="tel" placeholder="Your Phone" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="message">Message</Label>
                            </div>
                            <Textarea id="message" name="message" placeholder="Leave a message..." required rows={4} />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <Button type="submit" >Submit</Button>
                    </form>
                </div>
                <div className='bg-[#626f85] p-4 rounded '>
                    <h2 className='text-[20px] font-bold'>Enquire List</h2>
                    <EnquiryList />
                </div>
            </div>

        </>
    )
}


