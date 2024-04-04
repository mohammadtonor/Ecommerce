import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { getOneEnquary, updateEnquary } from '../features/enquary/enqSlice';
import {Select} from 'antd';
import {BiArrowBack} from 'react-icons/bi'

const ViewEnquary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const enquaryId = location.pathname.split('/')[3];
  const navigte = useNavigate()
  useEffect(() => {
      dispatch(getOneEnquary(enquaryId))
  }, [enquaryId])

  
  const handleChange = (e, id) => {
      dispatch(updateEnquary({id: id, enqData: e}))
      setTimeout(() => dispatch(getOneEnquary(enquaryId)),50)
    }
    
const { enquaryData } = useSelector((state) => state.enquary);
  return (
    <div>
        <div className='d-flex justify-content-between align-items-center'>
            <h3 className='mb-2'>View Enquary</h3>
            <button className='btn btn-primary d-flex gap-2 align-items-center' onClick={()=> navigte(-1)}>
                <BiArrowBack className='mr-4' size={20}/>
                <span>go Back</span>
            </button>
        </div>
        <div className='bg-white p-4 mt-4'>
            <div className='enquary-card'>
                <div className='d-flex gap-2 aling-items-center'>
                    <h6 className='m-0'>Name:</h6>
                    <span className='mb-0 text-gray'>{enquaryData?.name}</span>
                </div>
                <div className='d-flex gap-2 aling-items-center'>
                    <h6 className='m-0'>Mobile:</h6>
                    <a href={`mobile=${enquaryData?.mobile}`}>{enquaryData?.mobile}</a>
                </div>
                <div className='d-flex gap-2 aling-items-center'>
                    <h6 className='m-0'>Email:</h6>
                    <a href={`mailito=${enquaryData?.email}`} >{enquaryData?.email}</a >
                </div>
                <div className='d-flex gap-2 aling-items-center'>
                    <h6 className='m-0'>Comment:</h6>
                    <span className='mb-0 text-gray'>{enquaryData?.comment}</span>
                </div>
                <div className='d-flex gap-2 aling-items-center'>
                    <h6 className='m-0'>Status:</h6>
                    <Select
                        name="status" 
                        id="status" 
                        className="p-2 w-100"
                        placeholder="Select status Category"
                        defaultValue={enquaryData?.status}
                        value={enquaryData?.status}
                        onChange={(e) => handleChange(e , enquaryId)}
                    >
                        <Select.Option key='Submitted'>Submitted</Select.Option>
                        <Select.Option key='Contacted'>Contacted</Select.Option>
                        <Select.Option key='In Progress'>In Progress</Select.Option>
                        <Select.Option key='Resolved'>Resolved</Select.Option>
                    </Select>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewEnquary