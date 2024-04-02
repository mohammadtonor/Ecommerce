import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getBrands, deleteBrand, resetState} from './../features/brands/BrandSlice';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Button } from 'antd';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: 'Action',
      dataIndex: "action",
    }
  ];
  
const Brands = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandId, setBrandId] = useState('');
  const [isDeleted, setIsDeleted] = useState('');

  const {
    isError,
    isSuccess,
    isLoading,
    message
  } = useSelector(state => state.brand); 

  useEffect(() => {
    dispatch(getBrands())
  }, [])

  useEffect(() => {
    
    if (isSuccess && message?.message?.split(" ")?.includes('Deleted!')) {
      toast.success(message?.message , { autoClose: 2000, delay: 1500, });
    }
    if (isError) {
      toast.error("Something went wrong!!!")
    }
    if(isLoading && message?.message?.split(" ")?.includes('Deleted!')){
      toast( `Pending please wait...`, { autoClose: 1000 })
    }
  }, [ isLoading, isError, isSuccess ])

  const handleOk = () => {
    dispatch(deleteBrand(brandId))
    setIsModalOpen(false);
    
    setTimeout(() => {
      dispatch(getBrands());
    }, 500)
  };

  const showModal = (id) => {
    setBrandId(id)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    brands:brandState,
  } = useSelector(state => state.brand);
  
  const deleted = message?.message?.split(" ").includes('Deleted!');

  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      title: brandState[i].title,
      key: i + 1,
      action: (
        <>
          <Link
            to={`/admin/brand/${brandState[i]._id}`}
            className="table-action"
          >
            <FaEdit size={20} />
          </Link>
          <Button 
            type="link" 
            className="table-action" 
            onClick={() => showModal(brandState[i]._id)}
          >
            <MdDelete size={20} />
          </Button>
        </>
      ),
    });
  }

  

  return (
    <div className='blogs-container'>
        <h3>Brands</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          content='Are you sure for delete this Item?'
          title='Delete Brand'
          open={isModalOpen}
          handleCancel={handleCancel}
          performAction={handleOk}
        />
    </div>
  )
}

export default Brands