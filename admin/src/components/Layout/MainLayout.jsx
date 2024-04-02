import React, { useEffect, useState } from 'react';
import './mainLayout.scss'
import { ToastContainer } from 'react-toastify';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DashboardOutlined,
    ShoppingCartOutlined,
    PoweroffOutlined,
    TranslationOutlined,
    LockOutlined,
    SolutionOutlined,
} from '@ant-design/icons';
import { SiBrandfolder } from "react-icons/si";
import { FaBoxOpen, FaClipboard, FaClipboardList  } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoMdColorFill } from "react-icons/io";
import { FaBlog } from "react-icons/fa6";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { useMediaQuery } from "@uidotdev/usehooks";
import { RiCoupon4Line } from "react-icons/ri";

import 'react-toastify/dist/ReactToastify.css';

import { Layout, Menu, Button, theme, Breadcrumb, Avatar, Dropdown } from 'antd';
const { Header, Sider, Content, Footer } = Layout;

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem("Dashbord", "", <DashboardOutlined className='fs-4'/>),
    getItem("Customers", "customers", <UserOutlined className='fs-4'/>),
    getItem("Catalog", "sub1", <ShoppingCartOutlined className='fs-4'/>, [
      getItem("Add Products", "products/new", <FaBoxOpen className='fs-4'/>),
      getItem("Product List", "products", <FaBoxOpen className='fs-4'/>),
      getItem("New Brand", "brand/new", <SiBrandfolder className='fs-4'/>),
      getItem("Brand List", "brands", <SiBrandfolder className='fs-4'/>),
      getItem("New Category", "product-category/new", <BiCategory className='fs-4'/>),
      getItem("Category List", "product-category", <BiCategory className='fs-4'/>),
      getItem("New Color", "colors/new", <IoMdColorFill className='fs-4'/>),
      getItem("Color List", "colors", <IoMdColorFill className='fs-4'/>),
    ]),
    getItem("Marketing", "marketing", <RiCoupon4Line className='fs-4'/>, [
      getItem("Add Coupon", "coupons/new",  <RiCoupon4Line  className='fs-4'/>),
      getItem("Coupon List", "coupons",  <RiCoupon4Line className='fs-4'/>),
    ]),
    getItem("Orders", "orders", <FaClipboardList  className='fs-4'/>),
    getItem("Blogs", "blogs", <FaBlog className='fs-4'/>, [
      getItem("Add Blog", "blogs/new",  <FaBlog  className='fs-4'/>),
      getItem("Blog List", "blogs",  <FaBlog className='fs-4'/>),
      getItem("Add Blog Category", "blog-category/new",  <ImBlog  className='fs-4'/>),
      getItem("Blog category List", "blogs-category",  <ImBlog className='fs-4'/>),
    ]),
    getItem("Enquries", "enquary", <FaClipboard className='fs-4'/>),
  ];

  const widgetMenu = (
    <Menu>
      <Menu.Item className='d-flex gap-4'>
        <SolutionOutlined className="icon" />
        <Link to={'/profile'}>profile</Link>
      </Menu.Item>
      <Menu.Item>
        <LockOutlined className="icon" />
        change password
      </Menu.Item>
      <Menu.Item>
        <TranslationOutlined className="icon" />
        change language
      </Menu.Item>
      <Menu.Item>
        <PoweroffOutlined className="icon" />
        <Link to={'/signout'}>sign out</Link>
      </Menu.Item>
    </Menu>
  );

const MainLayout = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const isMediumDevice = useMediaQuery(
    "only screen and  (max-width : 992px)"
  );

  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 993px)"
  );

  useEffect(() => {
    if (isMediumDevice) {
      setCollapsed(true);
    }

    if (isLargeDevice) {
      setCollapsed(false);
    }
  } , [isMediumDevice, isLargeDevice]);

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo">
          {collapsed && <span className='sm-logo'>Dc</span>}
          {!collapsed && <span className='lg-logo'>Dev Corner</span>}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={({key}) => {
            if(key === "signout") {

            } else {
              navigate(key);
            }
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className='header-right'>
            <div className='header-right-notification'>
              <IoIosNotifications size={25}/>
              <span cl>1</span>
            </div>
            <div>
              <img 
                src='https://res-console.cloudinary.com/dajdunc2w/thumbnails/v1/image/upload/v1710781545/YTJudWV1cmdvcXVnaW9teG45bTU=/drilldown' 
                alt=''
              />
            </div>
            <Dropdown overlay={widgetMenu}>
              <div className='d-flex gap-2 flex-column lh-1 mt-3 fs-lg'>
                <span>mtonor</span>
                <span>mtonor@gmail.com</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className='panel-layout-content'
            style={{
              padding: 24,
              minHeight: 360,
              background: "transparent",
              borderRadius: borderRadiusLG,
            }}
          >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayout;