import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
function EnquiryList({ enquiries, enquiryFetch, Swal, formData, setFormData }) {

    let deleteRow = (id) => {

        Swal.fire({
            title: "Do you want to delete the data?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:8000/api/website/enquiry/delete/${id}`)
                        .then((res) => {
                            if (res.data.status === 1) {
                                // alert(res.data.message || "Enquiry deleted successfully");
                                // window.location.reload();
                                toast.success(res.data.message || "Enquiry deleted successfully");
                                enquiryFetch();
                            } else {
                                alert(res.data.message || "Failed to delete enquiry");
                            }
                        })
                    // Swal.fire("Deleted!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });


        // alert("Delete ID: " + id);

    }

    let editRow = (id) => {
        // alert("Edit ID: " + id);
        axios.get(`http://localhost:8000/api/website/enquiry/singleRow/${id}`)
            .then((res) => {
                if (res.data.status === 1) {
                    let resData = res.data;
                    console.log(res.data);
                    setFormData(resData.data);
                } else {
                    alert(res.data.message || "Failed to delete enquiry");
                }
            })

    }



    return (
        <div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Sr No</TableHeadCell>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Email</TableHeadCell>
                            <TableHeadCell>Phone</TableHeadCell>
                            <TableHeadCell>Message</TableHeadCell>
                            <TableHeadCell>
                                Edit
                            </TableHeadCell>
                            <TableHeadCell>
                                Delete
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {enquiries.length > 0 ? (
                            enquiries.map((enquiry, index) => (
                                <TableRow key={enquiry._id || index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{enquiry.name}</TableCell>
                                    <TableCell>{enquiry.email}</TableCell>
                                    <TableCell>{enquiry.phone}</TableCell>
                                    <TableCell>{enquiry.message}</TableCell>
                                    <TableCell>
                                        <a href="#" onClick={() => editRow(enquiry._id)} className="font-medium hover:underline text-white bg-blue-500 px-3 py-2 rounded">
                                            Edit
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <a href="#" onClick={() => deleteRow(enquiry._id)} className="font-medium hover:underline text-white bg-red-500 px-3 py-2 rounded">
                                            Delete
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="7" className="text-center">
                                    No enquiries found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default EnquiryList
