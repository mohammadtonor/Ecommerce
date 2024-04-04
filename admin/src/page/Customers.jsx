import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      sorter: (a,b) => a.name.length - b.name.length
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: 'Action',
      dataIndex: "action",
    },
  ];
   
const Custumers = () => {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(getUsers());
  } ,[]);

  const customersState = useSelector(state => state.customer.customers)
  const data1 = [];
  for (let i = 0; i < customersState.length; i++) {
    data1.push({
      key: i + 1,
      name: customersState[i].firstName + " " + customersState[i].lastName,
      email: customersState[i].email,
      mobile: customersState[i].mobile,
      action: (
        <>
          <Link to='/' className='table-action'>
            <FaEdit size={20} />
          </Link>
          <Link to={`/admin/orders/${customersState[i]._id}`}>
            <FaClipboardList className='table-action' size={20}/>
          </Link>
          <Link to='/' className='table-action'>
            <MdDelete size={20} />
          </Link>
        </>
      ),
    })
  }
  return (
    <div className='blogs-container'>
        <h3>Customers</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default Custumers