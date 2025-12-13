import React, { use } from 'react'
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import EnquiryList from './components/EnquiryList';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default function Enquiry() {

    const [enquiries, setEnquiries] = useState([]);

    let [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })
    let getValue = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value
        let oldData = { ...formData };
        oldData[inputName] = inputValue;
        setFormData(oldData)
    }


    let saveEnquiry = (e) => {
        e.preventDefault();

        if (formData._id) {
            axios.put(`http://localhost:8000/api/website/enquiry/update/${formData._id}`, formData)
                .then((res) => {
                    console.log(res.data);
            
                if (res.data.status === 1) {
                        toast.success(res.data.message || "Enquiry update successfully!");
                        setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            message: "",
                            _id: ""
                        });
                    }
                    else {
                        alert(res.data.message || "Failed to update enquiry");
                    }
                })
        }
        else {
            axios.post(`http://localhost:8000/api/website/enquiry/insert`, formData)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status === 1) {
                        toast.success(res.data.message || "Enquiry submitted successfully!");
                        setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            message: "",
                            _id: ""
                        });
                    }
                })

        }

    }

    let enquiryFetch = async () => {
        let res = await axios.get(`http://localhost:8000/api/website/enquiry/list`);
        console.log(res.data); // {status: 1, data: Array(10)}
        if (res.data.status === 1) {
            setEnquiries(res.data.data); // Access the array at res.data.data
        }
    }

    useEffect(() => {
        enquiryFetch();
    }, []);
    useEffect(() => { enquiryFetch(); }, [formData]);



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <h1 className='text-3xl font-bold text-center py-6'>User Enquiry</h1>
            <div className='grid grid-cols-[30%_auto] gap-10'>
                <div className=' p-4 bg-[#626f85] rounded'>
                    <h2 className='text-[20px] font-bold'>Enquire Form</h2>
                    <form className="flex max-w-md flex-col gap-4" onSubmit={saveEnquiry}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name">Your Name</Label>
                            </div>
                            <TextInput id="name" value={formData.name} onChange={getValue} name="name" type="text" placeholder="Your Name" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email">Your Email</Label>
                            </div>
                            <TextInput id="email" value={formData.email} onChange={getValue} name="email" type="email" placeholder="name@flowbite.com" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone">Your Phone</Label>
                            </div>
                            <TextInput id="phone" value={formData.phone} onChange={getValue} name="phone" type="tel" placeholder="Your Phone" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="message">Message</Label>
                            </div>
                            <Textarea id="message" value={formData.message} onChange={getValue} name="message" placeholder="Leave a message..." required rows={4} />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <Button type="submit" >{
                            formData._id ? "Update" : "Submit"}
                        </Button>

                    </form>
                </div>
                <div className='bg-[#626f85] p-4 rounded '>
                    <h2 className='text-[20px] font-bold'>Enquire List</h2>
                    <EnquiryList enquiries={enquiries} enquiryFetch={enquiryFetch} Swal={Swal} formData={formData} setFormData={setFormData} />
                </div>
            </div>

        </>
    )
}


