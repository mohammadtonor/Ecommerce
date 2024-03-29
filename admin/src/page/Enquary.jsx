import { Table } from 'antd';
import './enquries.scss'
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getEnquary} from './../features/enquary/enqSlice'
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "comment",
      dataIndex: "comment",
    },
  ];
const Enquaries = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getEnquary())
  } , [])
  const EnquaryState = useSelector(state => state.enquary.enquary);
  const data1 = [];
  for (let i = 0; i < EnquaryState.length ; i++) {
    data1.push({
      name: EnquaryState[i].name,
      email: EnquaryState[i].email,
      mobile: EnquaryState[i].mobile,
      comment: EnquaryState[i].comment,
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
    <div className='enquries-container'>
        <h3>Enquaries</h3>
        <div>

        <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default Enquaries