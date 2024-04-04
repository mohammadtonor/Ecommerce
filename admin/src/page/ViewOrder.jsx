import { Table } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByUser} from '../features/auth/authSlice';
import {Link, useLocation} from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {format} from 'date-fns';

const columns = [
    {
      title: "SNO",
      dataIndex: "key",
    },
    {
      title: "Products",
      dataIndex: "products",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "OrderBy",
      dataIndex: "orderBy",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      name: `Edward King ${i}`,
      product: 32,
      staus: `London, Park Lane no. ${i}`,
    });
  }
const ViewOrders = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split('/')[3];

  useEffect(() => {
    dispatch(getOrderByUser(userId))
  } , [userId])

  const orderState = useSelector(state => state.auth.orderByUsers);
  const data1 = [];
  for (let i = 0; i < orderState?.length ; i++) {
    data1.push({
      products: orderState[i]?.products?.length > 0 
      && orderState[i].products.reduce((acc, cur, indx) => {
        if (indx === orderState[i].products.length - 1) {
          return acc.concat(`${cur.product.title} NO ${cur.count}`)
        }
        return acc.concat(`${cur.product.title} NO ${cur.count}`, ', ')
      }, ''),
      status: orderState[i].orderStatus,
      totlaPrice: orderState[i].paymentIntent.amount,
      orderBy: orderState[i].orderBy.firstName + " " + orderState[i].orderBy.lastName,
      date: format(orderState[i].createdAt, "EEE dd MMM yyyy 'T' HH:mm bb"),
      action: (
        <>
          <Link to='/' className='table-action'>
            <FaEdit size={20} />
          </Link>
          <Link to='/' className='table-action'>
            <MdDelete size={20} />
          </Link>
        </>
      ),
      key: i + 1,
    });
  }
  return (
    <div className='blogs-container'>
        <h3>Orders</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default ViewOrders