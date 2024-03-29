import { Table } from 'antd';
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getColors} from './../features/colors/ColorSlice';
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
  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      name: `Edward King ${i}`,
      product: 32,
      staus: `London, Park Lane no. ${i}`,
    });
  }
const Colors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColors());
  }, []);
  const colorState = useSelector(state => state.color.colors);
  const data1 = [];
  console.log(colorState);
  for (let i = 0; i < colorState.length ; i++) {
    data1.push({
      title:colorState[i].title,
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
      ),
    });
  }
  return (
    <div className='blogs-container'>
        <h3>Colors</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default Colors