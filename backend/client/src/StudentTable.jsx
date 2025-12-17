import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import SetStudentStatus from './Components/SetStudentStatus';

function StudentTable({ setFormData, setStudent, refresh, setRefresh }) {
  const tableRows = ["Name", "RollNo", "Email", "Phone", "Edit", "Delete", "Status"];
  const [students, setStudents] = useState([])

  const fetchStudents = async () => {
    try {
      let res = await axios.get(`http://localhost:8000/api/web/student/list`);
      if (res.data.status === 1) {
        setStudents(res.data.data)
      }
    } catch (err) {
      console.log("Error fetching", err);
    }
  }

  // Reload data when 'refresh' changes
  useEffect(() => {
    fetchStudents()
  }, [refresh])

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to move this student to Trash?")) return;

    try {
      // Calls the Soft Delete API
      let res = await axios.delete(`http://localhost:8000/api/web/student/delete/${id}`);
      if (res.data.status === 1) {
        setRefresh(!refresh); // Trigger reload
      }
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  }

  const editStudent = (studentData) => {
    setFormData(studentData);
    setStudent(studentData);
  }

  return (
    <div className="overflow-x-auto rounded p-3">
      <Table hoverable>
        <TableHead>
          {tableRows.map((row, index) => (
            <TableHeadCell key={index} className='bg-gray-700 text-white'>{row}</TableHeadCell>
          ))}
        </TableHead>
        <TableBody className="divide-y">
          {
            students.map((student, index) => {
              // LOGIC: If status is 'delete'
              const isDeleted = student.status === 'delete';

              return (
                <TableRow
                  key={index}
                  className={`bg-white dark:border-gray-700 dark:bg-gray-800 
                        ${isDeleted ? 'bg-gray-300 opacity-60' : ''}`} // Gray out if deleted
                >
                  <TableCell className="font-medium text-white">{student.name}</TableCell>
                  <TableCell>{student.rollno}</TableCell>
                  {/* Strike through email if deleted */}
                  <TableCell className={isDeleted ? 'line-through text-red-700' : ''}>
                    {student.email}
                  </TableCell>
                  <TableCell>{student.phone}</TableCell>

                  {/* EDIT BUTTON */}
                  <TableCell>
                    <button
                      onClick={() => !isDeleted && editStudent(student)}
                      className={`font-medium ${isDeleted ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'}`}
                      disabled={isDeleted}
                    >
                      Edit
                    </button>
                  </TableCell>

                  {/* DELETE BUTTON */}
                  <TableCell>
                    <button
                      onClick={() => !isDeleted && deleteStudent(student._id)}
                      className={`font-medium ${isDeleted ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:underline'}`}
                      disabled={isDeleted}
                    >
                      {isDeleted ? 'Deleted' : 'Delete'}
                    </button>
                  </TableCell>

                  {/* STATUS DROPDOWN */}
                  <TableCell>
                    <SetStudentStatus
                      studentStatus={student.status}
                      student={student}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default StudentTable