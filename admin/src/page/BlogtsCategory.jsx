import { Table } from 'antd'
import './blogList.scss'
import {useDispatch, useSelector} from 'react-redux'
import {getBCategories} from './../features/blogCategory/BcategorySlice';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useEffect } from 'react';
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
  useEffect(() => {
    dispatch(getBCategories());
  }, [dispatch]);
  const bCategoriesState = useSelector(state => state.bCategory.BCategories);
  console.log(bCategoriesState);
  const data1 = [];
  for (let i = 0; i < bCategoriesState.length; i++) {
    data1.push({
      key: i + 1,
      title:bCategoriesState[i].title,
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
        <h3> Category Blogs</h3>
        <div>

        <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default BlogsCategory;
