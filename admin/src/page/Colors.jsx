import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {deleteColor, getColors, resetState} from './../features/colors/ColorSlice';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colorId, setColorId] = useState('');

  useEffect(() => {
    dispatch(resetState());
    setTimeout(()=> {
      dispatch(getColors());
    }, 50)
  }, []);

  const {colors: colorState, isSuccess, isError, isLoading, message} = useSelector(state => state.color);
  const deleted = message?.message?.split(" ").includes('Deleted!');

  useEffect(() => {
    if (isSuccess && message?.message?.split(" ")?.includes('Deleted!')) {
      toast.success(message?.message , { autoClose: 2000, delay: 1500, });
    }
    if (isError) {
      toast.error("Something went wrong!!!")
    }
  }, [isError, message ])

  const handleOk = () => {
    dispatch(deleteColor(colorId))
    setIsModalOpen(false);
    
    setTimeout(() => {
      dispatch(getColors());
    }, 500)
  };

  const showModal = (id) => {
    setColorId(id)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const data1 = [];
  for (let i = 0; i < colorState.length ; i++) {
    data1.push({
      title:colorState[i].title,
      key: i + 1,
      action: (
        <>
          <Link to={`/admin/colors/${colorState[i]._id}`}className='table-action'>
            <FaEdit size={20} />
          </Link>
          <Button 
            type="link" 
            className="table-action" 
            onClick={() => showModal(colorState[i]._id)}
          >
            <MdDelete size={20} />
          </Button>
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
        <CustomModal
          content='Are you sure for delete this Item?'
          title='Delete Color'
          open={isModalOpen}
          handleCancel={handleCancel}
          performAction={handleOk}
        />
    </div>
  )
}

export default Colors