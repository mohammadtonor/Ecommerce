import { Table } from 'antd'
import './blogList.scss'
import { useDispatch, useSelector} from 'react-redux';
import { getBlogs } from '../features/blogs/BlogsSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

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

  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  const blogsState = useSelector((state) => state.blog.blogs)
  const data1 = [];
  for (let i = 0; i < blogsState.length ; i++) {
    data1.push({
      image: blogsState[i].images !== undefined 
      && blogsState[i].images.length > 0 
      &&  <img width={40} height={40} src={ blogsState[i].images[0].url}/>,
      title: blogsState[i]?.title,
      category:blogsState[i].category,
      description:blogsState[i].description,
      views:blogsState[i].numViews,
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
    <div className='blogs-container'>
        <h3>Blogs</h3>
        <div>

        <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default BlogList