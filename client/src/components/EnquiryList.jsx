import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

function EnquiryList() {
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
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        1
                                    </TableCell>
                                    <TableCell>Ankit</TableCell>
                                    <TableCell>ankit123@gmail.com</TableCell>
                                    <TableCell>1234567890</TableCell>
                                    <TableCell>Hello, I am interested in your product.</TableCell>
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
                                
                            </TableBody>
                        </Table>
        </div>
    </div>
  )
}

export default EnquiryList
