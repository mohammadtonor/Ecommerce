import { Button, Table } from 'antd'
import './blogList.scss'
import {useDispatch, useSelector} from 'react-redux'
import {deleteBCategory, getBCategories, resetState} from './../features/blogCategory/BcategorySlice';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useEffect, useState } from 'react';
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
const BlogsCategory = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bCategoryId, setBCategoryId] = useState('');

  useEffect(() => {
    dispatch(getBCategories());
  }, []);

  const {
    BCategories: bCategoriesState,
    message,
    isError,
    isSuccess,
  } = useSelector((state) => state.bCategory);
  const isDeleted = message?.message?.split(' ').includes("Deleted!");

  useEffect(() => {
    if (isSuccess && isDeleted && message ) {
      toast.success(message?.message, {autoClose: 3000})
    }
    if (isError) {
      toast.error("Something went wrong!!!")
    }
  }, [isSuccess, isDeleted, message])

  const handleOk = () => {
    dispatch(deleteBCategory(bCategoryId))
    setIsModalOpen(false);
    
    setTimeout(() => {
      dispatch(getBCategories());
    }, 1000)
  };

  const showModal = (id) => {
    setBCategoryId(id)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const data1 = [];
  for (let i = 0; i < bCategoriesState.length; i++) {
    data1.push({
      key: i + 1,
      title:bCategoriesState[i].title,
      action: (
        <>
          <Link to={`/admin/blog-category/${bCategoriesState[i]._id}`} className='table-action'>
            <FaEdit size={20} />
          </Link>
          <Button 
            type="link" 
            className="table-action" 
            onClick={() => showModal(bCategoriesState[i]._id)}
          >
            <MdDelete size={20} />
          </Button>
        </>
      ),
    });
  }
  return (
    <div className='blogs-container'>
        <h3> Category Blogs</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          content='Are you sure for delete this Item?'
          title='Delete Blog Category'
          open={isModalOpen}
          handleCancel={handleCancel}
          performAction={handleOk}
        />
    </div>
  )
}

export default BlogsCategory;
