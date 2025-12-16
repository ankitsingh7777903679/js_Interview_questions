import React, { useEffect } from 'react'
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useState } from 'react';
import SetStudentStatus from './Components/SetStudentStatus';
// import { set } from 'mongoose';
function StudentTable({ formSubmit, setFormData, setEditMode, setEditId }) {
  const tableRows = ["Name", "RollNo", "Email", "Phone", "Delete", "Edit", "Status"];
  const status = true;

  const [students, setStudents] = useState([])


  const fatchStudents = async () => {
    let res = await axios.get(`http://localhost:8000/api/web/student/list`);
    // console.log(res.data.data);
    if (res.data.status === 1) {
      setStudents(res.data.data)
    }
  }
  useEffect(() => {
    fatchStudents()
  }, [])
  useEffect(() => {
    fatchStudents()
  }, [formSubmit])

  const deleteStudent = async (id) => {
    let res = await axios.delete(`http://localhost:8000/api/web/student/delete/${id}`);
    console.log(res.data);
    fatchStudents()

  }

  const editeStudent = (id) => {
    let studentData = students.find((student) => student._id === id);
    console.log("Edit Student Data:", studentData);
    
    setFormData({
      name: studentData.name,
      rollno: studentData.rollno,
      email: studentData.email,
      phone: studentData.phone
    });
    setEditMode(true);
    setEditId(id);
  }


  return (
    <div>
      <div className="overflow-x-auto rounded p-3">
        <Table className=''>
          <TableHead className=''>
            <TableRow>
              {
                tableRows.map((row, index) => {
                  return (
                    <TableHeadCell key={index} className='py-2 px-4 text-xl text-start'>{row}</TableHeadCell>
                  )

                })
              }
            </TableRow>
          </TableHead>
          <TableBody className="divide-y w-full">
            {
              students.map((student, index) => {
                return (
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 text-start" key={index}>
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-start p-2">
                      {student.name}
                    </TableCell>
                    <TableCell className="text-start">{student.rollno}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>
                      <a href="#" onClick={() => { editeStudent(student._id) }} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Edit
                      </a>
                    </TableCell>
                    <TableCell>
                      <a href="#" onClick={() => { deleteStudent(student._id) }} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Delete

                      </a>
                    </TableCell>
                    <TableCell className='bg-none'>
                      <SetStudentStatus className="bg-red-500" studentStatus={student.status} student={student} fatchStudents={fatchStudents} />
                    </TableCell>
                  </TableRow>
                )
              })
            }


          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default StudentTable
