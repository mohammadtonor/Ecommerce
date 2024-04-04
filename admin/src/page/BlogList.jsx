import { Button, Table } from 'antd'
import './blogList.scss'
import { useDispatch, useSelector} from 'react-redux';
import { deleteBlog, getBlogs, resetState } from '../features/blogs/BlogsSlice';
import { useEffect, useState } from 'react';
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
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a,b) => a.title.length - b.title.length
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: (a,b) => a.description.length - b.description.length
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a,b) => a.category.length - b.category.length
  },
  {
    title: "Views",
    dataIndex: "views",
    sorter: (a,b) => a.views - b.views
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const BlogList = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogId, setBlogId] = useState('');

  useEffect(() => {
    setTimeout(() => {
      dispatch(getBlogs());
    }, 50)
  }, []);

  const {
    isSuccess,
    isError,
    message,
  } = useSelector((state) => state.blog);

  const isDeleted = message?.message?.split(' ').includes('deleted!');

  useEffect(() => {
    if(isSuccess && isDeleted && message) {
      toast.success(message?.message);
    }
    if (isError) {
      toast.error("Somthing went wrong")
    }
  }, [isSuccess, isError, message])

  const handleOk = () => {
    dispatch(deleteBlog(blogId))
    setIsModalOpen(false);
    
    setTimeout(() => {
      dispatch(getBlogs());
    }, 1000)
  };

  const showModal = (id) => {
    setBlogId(id)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const blogsState = useSelector((state) => state.blog.blogs);

  const data1 = [];
  for (let i = 0; i < blogsState.length ; i++) {
    data1.push({
      image: blogsState[i].images !== undefined 
      && blogsState[i].images.length > 0 
      &&  <img width={40} height={40} src={ blogsState[i].images[0].url}/>,
      title: blogsState[i]?.title,
      category:blogsState[i].category?.title,
      description:blogsState[i].description,
      views:blogsState[i].numViews,
      action: (
        <>
          <Link to={`/admin/blogs/${blogsState[i]._id}`} className='table-action'>
            <FaEdit size={20} />
          </Link>
          <Button 
            type="link" 
            className="table-action" 
            onClick={() => showModal(blogsState[i]._id)}
          >
            <MdDelete size={20} />
          </Button>
        </>
      ),
      key: i + 1,
    });
  }
  
  return (
    <div className='blogs-container'>
        <h3>Blogs</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          content='Are you sure for delete this Item?'
          title='Delete Blog'
          open={isModalOpen}
          handleCancel={handleCancel}
          performAction={handleOk}
        />
    </div>
  )
}

export default BlogList