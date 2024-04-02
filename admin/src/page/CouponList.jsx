import { Table } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { getCoupons } from '../features/coupons/couponSlice';
import { format } from 'date-fns';

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: 'Expire',
      dataIndex: "expiry",
      sorter: (a,b) => a.expiry - b.expiry
    },
    {
      title: 'Discount',
      dataIndex: "discount",
      sorter: (a,b) => new Date(a.discount) - new Date(b.discount)
    }
  ];
  
const Coupons = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons())
  }, [])

  const couponState = useSelector(state => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      name: couponState[i].name,
      expiry: format(couponState[i].expiry, 'EE dd MMM yyyy'),
      discount: couponState[i].discount,
      key: i + 1,
      action: (
        <>
          <Link to='/' className='table-action'>
            <FaEdit size={20} />
          </Link>
          <Link to='/' className='table-action'>
            <MdDelete size={20} />
          </Link>
        </>
      )
    });
  }
  return (
    <div className='blogs-container'>
        <h3>Coupons</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default Coupons