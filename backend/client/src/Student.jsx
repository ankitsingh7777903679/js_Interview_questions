import { Button, Label, TextInput } from "flowbite-react";
import { useState } from 'react';
import StudentTable from './StudentTable';
import axios from 'axios';

function Student() {
    let [student, setStudent] = useState({}) // Stores current student being edited
    const [refresh, setRefresh] = useState(false) // Triggers table reload
    
    const [formData, setFormData] = useState({
        name: '',
        rollno: '',
        email: '',
        phone: ''
    })
    
    const [errors, setError] = useState({})

    const getValue = (e) => {
        let inputValue = e.target.value;
        let inputName = e.target.name;
        setFormData({ ...formData, [inputName]: inputValue })
        
        // Clear error when typing
        if (errors[inputName]) {
            setError({ ...errors, [inputName]: '' })
        }
    }

    const validateForm = (values) => {
        let error = {}
        if (!values.name) error.name = "Name is required";
        if (!values.email) {
            error.email = "Email is required";
        } else if (!/\S+@\S+\.com$/.test(values.email)) {
            error.email = "Email is invalid";
        }
        if (!values.rollno) error.rollno = "Roll Number is required";
        if (values.phone.length !== 10) error.phone = "Phone must be 10 digits";
        
        return error;
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm(formData);
        setError(formErrors)

        if (Object.keys(formErrors).length === 0) {
            submitData();
        }
    }

    const submitData = async () => {
        if(student._id){
            // UPDATE MODE
            await axios.put(`http://localhost:8000/api/web/student/update/${student._id}`, formData)
            .then((res) => {
                if (res.data.status === 1) {
                    alert('Student updated successfully!');
                    setStudent({}); // Exit edit mode
                    setFormData({ name: '', rollno: '', email: '', phone: '' });
                    setRefresh(!refresh); // Reload Table
                } else {
                    alert(res.data.message || 'Error updating student');
                }
            }).catch((err) => alert('Error: ' + err.message));
        } else {
            // INSERT MODE
            await axios.post(`http://localhost:8000/api/web/student/insert`, formData)
            .then((res) => {
                if (res.data.status === 1) {
                    alert('Student added successfully!');
                    setFormData({ name: '', rollno: '', email: '', phone: '' });
                    setRefresh(!refresh); // Reload Table
                } else {
                    // This will show "Email already exists"
                    alert(res.data.message || 'Error adding student');
                }
            }).catch((err) => alert('Error: ' + err.message));
        }
    }

    // Cancel Edit Button Logic
    const cancelEdit = () => {
        setStudent({});
        setFormData({ name: '', rollno: '', email: '', phone: '' });
    }

    return (
        <div className='grid grid-cols-[30%_auto] gap-4 p-2'>
            <div className='bg-gray-500 p-4 rounded h-fit'>
                <h1 className='text-3xl font-bold text-center mb-3 text-white'>
                    {student._id ? 'Edit Student' : 'Add Student'}
                </h1>
                
                <form className="flex max-w-md flex-col gap-4" onSubmit={formSubmit}>
                    <div>
                        <div className="mb-2 block"><Label htmlFor="name" value="Your Name" className='text-white' /></div>
                        <TextInput id="name" type="text" name='name' value={formData.name} onChange={getValue} placeholder="Your Name" required />
                        {errors.name && <p className='text-red-300 text-sm mt-1'>{errors.name}</p>}
                    </div>
                    <div>
                        <div className="mb-2 block"><Label htmlFor="rollno" value="Roll Number" className='text-white' /></div>
                        <TextInput id="rollno" name='rollno' value={formData.rollno} onChange={getValue} type="number" placeholder="Roll Number" required />
                        {errors.rollno && <p className='text-red-300 text-sm mt-1'>{errors.rollno}</p>}
                    </div>
                    <div>
                        <div className="mb-2 block"><Label htmlFor="email" value="Email" className='text-white' /></div>
                        <TextInput id="email" name='email' value={formData.email} onChange={getValue} type="email" placeholder="name@company.com" required />
                        {errors.email && <p className='text-red-300 text-sm mt-1'>{errors.email}</p>}
                    </div>
                    <div>
                        <div className="mb-2 block"><Label htmlFor="phone" value="Phone" className='text-white' /></div>
                        <TextInput id="phone" name='phone' value={formData.phone} onChange={getValue} type="number" placeholder="Phone" required />
                        {errors.phone && <p className='text-red-300 text-sm mt-1'>{errors.phone}</p>}
                    </div>
                    
                    <div className='flex gap-2'>
                        <Button type="submit" className="bg-blue-600 w-full">
                            {student._id ? 'Update' : 'Submit'}
                        </Button>
                        {student._id && (
                             <Button type="button" onClick={cancelEdit} className="bg-gray-600 w-full">Cancel</Button>
                        )}
                    </div>
                </form>
            </div>

            <div className='bg-[#626f85] p-4 rounded'>
                <h2 className='text-[20px] font-bold px-3 text-white mb-4'>Student List</h2>
                <StudentTable 
                    setFormData={setFormData} 
                    setStudent={setStudent} 
                    refresh={refresh} 
                    setRefresh={setRefresh} 
                />
            </div>
        </div>
    )
}

export default Student