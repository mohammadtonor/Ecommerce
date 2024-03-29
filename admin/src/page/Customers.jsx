import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Full Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
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
      mobile: customersState[i].mobile
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