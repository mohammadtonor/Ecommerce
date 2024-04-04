import { Button, Select, Table } from 'antd';
import './enquries.scss'
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {deleteEnquary, getEnquary, resetState, updateEnquary} from './../features/enquary/enqSlice';
import { FaRegEye } from "react-icons/fa6";
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
    {
      title: 'Status',
      dataIndex:'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    }
  ];
const Enquaries = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enquaryId, setEnquaryId] = useState('');
  useEffect(() => {
    dispatch(resetState())
    setTimeout(() => dispatch(getEnquary()),50)
  } , [])

  const {
    isSuccess,
    isError,
    message,
    updatedEnquary
  } = useSelector((state) => state.enquary);

  useEffect(() => {
    if ((isSuccess && updatedEnquary)) {
      toast.success("Enquary updated successfully!")
    }
    if (isError) {
      toast.error("Something went wrong!!!")
    }
  }, [isSuccess, isError,updatedEnquary])

  const handleOk = () => {
    dispatch(deleteEnquary(enquaryId))
    setIsModalOpen(false);
    
    setTimeout(() => {
      dispatch(getEnquary());
    }, 1000)
  };

  const showModal = (id) => {
    setEnquaryId(id)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e, id) => {
    dispatch(updateEnquary({id: id, enqData: e.target.value}))
    setTimeout(() => dispatch(getEnquary()),200)
  }

  const EnquaryState = useSelector(state => state.enquary.enquary);
  const data1 = [];
  for (let i = 0; i < EnquaryState.length ; i++) {
    data1.push({
      name: EnquaryState[i].name,
      email: EnquaryState[i].email,
      mobile: EnquaryState[i].mobile,
      comment: EnquaryState[i].comment,
      status: <select
                name="status" 
                id="status" 
                className="select-enquary"
                placeholder="Select status Category"
                defaultValue={EnquaryState[i].status}
                onChange={(e) => handleChange(e, EnquaryState[i]._id)}
            >
                <option value='Submitted'>Submitted</option>
                <option key='Contacted'>Contacted</option>
                <option key='In Progress'>In Progress</option>
                <option key='Resolved'>Resolved</option>
            </select>,
      action: (
        <>
          <Link to={`/admin/enquary/${EnquaryState[i]._id}`} className='table-action'>
            <FaRegEye size={20} />
          </Link>
          <Button 
            type="link" 
            className="table-action" 
            onClick={() => showModal(EnquaryState[i]._id)}
          >
            <MdDelete size={20} />
          </Button>
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
        <CustomModal
          content='Are you sure for delete this Item?'
          title='Delete Enquary'
          open={isModalOpen}
          handleCancel={handleCancel}
          performAction={handleOk}
        />
    </div>
  )
}

export default Enquaries