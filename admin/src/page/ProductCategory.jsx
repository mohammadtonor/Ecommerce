import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {deletePCategory, getcategories} from './../features/category/categorySlice';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
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
    },
  ];
  
const ProductCategory = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pcatId, setPcatId] = useState('');

  useEffect(() => {
    dispatch(getcategories());
  }, []);

  const {categories:categoriesState , isSuccess, isError, message} = useSelector(state => state.category);
  const deleted = message?.message?.split(" ").includes('Deleted!');

  useEffect(() => {
      if(isSuccess && deleted ) {
        toast.success(message)
      }
      if (isError) {
        toast.error("Something went wrong!!!")
      }
    
  }, [isSuccess, isError, message])

  const handleOk = () => {
    dispatch(deletePCategory(pcatId))
    setIsModalOpen(false);
    
    setTimeout(() => {
      dispatch(getcategories());
    }, 500)
  };

  const showModal = (id) => {
    setPcatId(id)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const data1 = [];
  for (let i = 0; i < categoriesState.length; i++) {
    data1.push({
      key: i + 1,
      title:categoriesState[i].name,
      action: (
        <>
          <Link to={`/admin/product-category/${categoriesState[i]._id}`} className='table-action'>
            <FaEdit size={20} />
          </Link>
          <Button 
            type="link" 
            className="table-action" 
            onClick={() => showModal(categoriesState[i]._id)}
          >
            <MdDelete size={20} />
          </Button>
        </>
      ),
    });
  }
  return (
    <div className='blogs-container'>
        <h3>Product Category</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          content='Are you sure for delete this Item?'
          title='Delete PCategory'
          open={isModalOpen}
          handleCancel={handleCancel}
          performAction={handleOk}
        />
    </div>
  )
}

export default ProductCategory