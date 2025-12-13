import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import axios from 'axios';
function EnquiryList({enquiries}) {
    
  
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
                                                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                                    Edit
                                                </a>
                                            </TableCell>
                                            <TableCell>
                                                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
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
