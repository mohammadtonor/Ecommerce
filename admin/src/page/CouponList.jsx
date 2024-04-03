import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { deleteCoupon, getCoupons, resetState } from '../features/coupons/couponSlice';
import { format } from 'date-fns';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';

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
    },
    {
      title: "Action",
      dataIndex: "action",
    }
  ];
  
const Coupons = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponId, setCouponId] = useState('');

  useEffect(() => {
    setTimeout(()=> {
      dispatch(getCoupons());
    }, 50)
  }, [])

  const {
    isSuccess,
    isError,
    isLoading,
    message,
  } = useSelector((state) => state.coupon);

  const isDeleted = message?.message?.split(' ').includes("Deleted!")

  useEffect(() => {
    if (isSuccess && isDeleted && message ) {
      toast.success(message?.message)
    }
    if (isError) {
      toast.error("Something went wrong!!!")
    }
  }, [isSuccess, isError, message])

  const handleOk = () => {
    dispatch(deleteCoupon(couponId))
    setIsModalOpen(false);
    
    setTimeout(() => {
      dispatch(getCoupons());
    }, 1000)
  };

  const showModal = (id) => {
    setCouponId(id)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
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
          <Link to={`/admin/coupons/${couponState[i]._id}`} className='table-action'>
            <FaEdit size={20} />
          </Link>
          <Button 
            type="link" 
            className="table-action" 
            onClick={() => showModal(couponState[i]._id)}
          >
            <MdDelete size={20} />
          </Button>
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
        <CustomModal
          content='Are you sure for delete this Item?'
          title='Delete Coupon'
          open={isModalOpen}
          handleCancel={handleCancel}
          performAction={handleOk}
        />
    </div>
  )
}

export default Coupons