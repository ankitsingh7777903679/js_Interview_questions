import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from 'react';
import StudentTable from './StudentTable';
import axios from 'axios';


function Student() {

    const [formData, setFormData] = useState({
        name: '',
        rollno: '',
        email: '',
        phone: ''
    })
    const [errors, setError] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [editId, setEditId] = useState(null)

    const getValue = (e) => {
        let inputValue = e.target.value;
        // console.log(inputValue);
        let inputName = e.target.name;
        // console.log(inputName);
        let oldData = { ...formData }
        oldData[inputName] = inputValue;
        setFormData(oldData)
        if(errors[inputName]){
            setError({...errors, [inputName]:''})
        }

    }

    const validateForm = (values) => {
        let error = {}
        if (!values.name) {
            error.name = "Name is required"
        }
        if (!values.email) {
            error.email = "Email is required"
            // !/\S+@\S+\.com$/.test(values.email)
        } else if (!/\S+@\S+\.com$/.test(values.email)) {
            error.email = "Email is invalid"
        }
        if (!values.rollno) {
            error.rollno = "Roll Number is required"
        }
        if (values.phone.length !== 10) {
            error.phone = "Phone is required"
        }
        else if (!/^[6-9]\d{9}$/.test(values.phone)) {
            error.phone = "Phone number is invalid"
        }
        return error;
    }


    const formSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm(formData);
        setError(formErrors)
        if (Object.keys(formErrors).length === 0) {
            
            if(editMode) {
                updateData();
            } else {
                submitData();
            }
            
        }
        else {
            // alert(JSON.stringify(formErrors));
        }
    }

    const submitData = async () => {
        await axios.post(`http://localhost:8000/api/web/student/insert`, formData).then((res) => {
            console.log(res.data);
            let data = res.data;
            if(res.data.status === 1) {
                alert('Student added successfully!');
                setFormData({ name: '', rollno: '', email: '', phone: '' });
            } else {
                alert(res.data.message || 'Failed to add student');
            }
        }).catch((err) => {
            alert('Error: ' + err.message);
            
        });
    }

    const updateData = async () => {
        await axios.put(`http://localhost:8000/api/web/student/update/${editId}`, formData).then((res) => {
            console.log(res.data);
            if(res.data.status === 1) {
                alert('Student updated successfully!');
                setFormData({ name: '', rollno: '', email: '', phone: '' });
                setEditMode(false);
                setEditId(null);
            } else {
                alert(res.data.message || 'Failed to update student');
            }
        }).catch((err) => {
            alert('Error: ' + err.message);
        });
    }

    return (
        <>

            <div className='grid grid-cols-[30%_auto] '>
                <div className='bg-gray-500 p-4 rounded'>
                    <h1 className='text-3xl font-bold text-center mb-3'>Student</h1>
                    <form className="flex max-w-md flex-col gap-4" onSubmit={formSubmit}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name">Your Name</Label>
                            </div>
                            <TextInput id="name" type="text" name='name' value={formData.name} onChange={(e) => getValue(e)} placeholder="Your Name" required />
                             {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}   
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="rollno">Your Roll Number</Label>
                            </div>
                            <TextInput id="rollno" name='rollno' value={formData.rollno} onChange={(e) => getValue(e)} type="number" placeholder="Your Roll Number" required />
                            {errors.rollno && <p className='text-red-500 text-sm mt-1'>{errors.rollno}</p>} 
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1">Your email</Label>
                            </div>
                            <TextInput id="email1" name='email' value={formData.email} onChange={(e) => getValue(e)} type="email" placeholder="name@flowbite.com" required />
                            {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>} 
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone">Your phone</Label>
                            </div>
                            
                            <TextInput id="phone" name='phone' value={formData.phone} onChange={(e) => getValue(e)} type="number" placeholder="Your phone" required />
                            {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>} 
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <Button type="submit" className="bg-blue-500">{editMode ? 'Update' : 'Submit'}</Button>
                    </form>
                </div>

                <div className='bg-[#626f85] p-4 rounded'>
                    <h2 className='text-[20px] font-bold px-3'>Student List</h2>
                    <StudentTable formSubmit={formSubmit} setFormData={setFormData} setEditMode={setEditMode} setEditId={setEditId} />
                </div>
            </div>
        </>

    )
}

export default Student
