import React, { useState, useEffect } from 'react'
import axios from 'axios';

function SetStudentStatus({studentStatus, student, refresh, setRefresh}) {
    const [statusValue, setStatusValue] = useState(studentStatus || 'pending');

    useEffect(() => {
        setStatusValue(studentStatus || 'pending');
    }, [studentStatus]);

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'active', label: 'Active' },
        { value: 'suspend', label: 'Suspend' },
        { value: 'delete', label: 'Delete' }
    ]

    const getStatusStyle = (status) => {
        switch(status) {
            case 'active': return 'text-green-600 border-green-600 bg-green-50';
            case 'suspend': return 'text-orange-500 border-orange-500 bg-orange-50';
            case 'delete': return 'text-red-600 border-red-600 bg-red-50';
            case 'pending': return 'text-blue-500 border-blue-500 bg-blue-50';
            default: return 'text-gray-500 border-gray-500';
        }
    }

    const statusChange = async (e) => {
        let newStatus = e.target.value;
        try {
            await axios.put(`http://localhost:8000/api/web/student/setStatus/${student._id}`, {status: newStatus});
            setStatusValue(newStatus);
            setRefresh(!refresh); // Update table immediately
        } catch(err) {
            console.error("Error updating status:", err);
        }
    }

    return (
        <div className="max-w-md">
            <select 
                value={statusValue}
                onChange={statusChange}
                className={`font-medium border rounded text-sm p-1 ${getStatusStyle(statusValue)}`}
            >
                {statusOptions.map((option) => (
                    <option key={option.value} value={option.value} className="text-black bg-white">
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SetStudentStatus