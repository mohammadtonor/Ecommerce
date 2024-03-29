import { Table } from 'antd';
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getcategories} from './../features/category/categorySlice';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
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
  useEffect(() => {
    dispatch(getcategories());
  }, []);
  const categoriesState = useSelector(state => state.category.categories);
  const data1 = [];
  for (let i = 0; i < categoriesState.length; i++) {
    data1.push({
      key: i + 1,
      title:categoriesState[i].name,
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
    });
  }
  return (
    <div className='blogs-container'>
        <h3>Product Category</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default ProductCategory