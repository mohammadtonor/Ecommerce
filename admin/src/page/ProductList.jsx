import { Table } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getProducts} from './../features/products/ProductSlice';
import {Link} from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
      title: "Price",
      dataIndex: "price",
      sorter: (a,b) => a.price - b.price
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a,b) => a.category.length - b.category.length
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a,b) => a.brand && b.brand && a.brand.length - b.brand.length
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  
const ProductList = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProducts())
  } , [])
  const productState = useSelector(state => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length ; i++) {
    data1.push({
      image: productState[i].images !== undefined 
      && productState[i].images.length > 0 
      &&  <img width={40} height={40} src={ productState[i].images[0].url}/>,
      title: productState[i]?.title,
      category:productState[i].category,
      price: productState[i].price,
      brand:productState[i].brand,
      color:productState[i].color !== undefined 
      && productState[i].color.length > 0 
      && productState[i].color.reduce((acc, cur, indx) => {
        if (indx === productState[i].color.length - 1) {
          return acc.concat(cur.title)
        }
        return acc.concat(cur.title, ', ')
      }, ''),
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
        <h3>Product List</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  )
}

export default ProductList