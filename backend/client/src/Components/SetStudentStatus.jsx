import React, { useState } from 'react'
import { Label, Select } from "flowbite-react";
import axios from 'axios';


function SetStudentStatus({studentStatus, student, fatchStudents}) {
    const [studentStatusValue, setStudentsStatusValue] = useState(studentStatus || 'default');
    const statusOptions = [
        { value: 'default', label: 'Default' },
        { value: 'active', label: 'Active' },
        { value: 'deactive', label: 'Deactive' }
    ]
    // console.log("Current Status:", student?._id);
    const getStatusStyle = (status) => {
        switch(status) {
            case 'active':
                return 'bg-white text-green-500 border-green-800';
            case 'deactive':
                return 'bg-white text-red-500 border-red-300';
            case 'default':
                return 'bg-white text-blue-500 border-blue-300';
            default:
                return 'bg-white text-blue-500 border-blue-300';
        }
    }

    const statusChange = (e) =>{
        let newStatus = e.target.value;
        console.log("Selected Status:", newStatus);
        console.log(student?._id);
        setStudentsStatusValue(newStatus);
        axios.put(`http://localhost:8000/api/web/student/setStatus/${student?._id}`, {status: newStatus})
        .then((res)=>{
            console.log("Status updated successfully:", res.data);
        })
        .catch((err)=>{
            console.error("Error updating status:", err);
        });

        fatchStudents();


    }

    return (
       
            <div className="max-w-md">
                <select 
                    id="status" 
                    required 
                    value={studentStatusValue}
                    // onChange={(e) => setStudentsStatusValue(e.target.value)}
                    onChange={statusChange}
                    className={`font-medium ${getStatusStyle(studentStatusValue)} rounded text-xl`
                }
                >
                    {statusOptions.map((option) => (
                        <option key={option.value} value={option.value} onSelect={()=>console.log(option.value)}>
                            {option.label}
                        </option>
                       
                    ))}
                    
                </select>
            </div>
     
    )
}

export default SetStudentStatus
