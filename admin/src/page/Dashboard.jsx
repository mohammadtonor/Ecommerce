import './dashboard.scss';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import { Column } from "@ant-design/plots";
import { Table } from "antd";

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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "staus",
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

const data = [
  {
    type: "Jan",
    sales: 38,
  },
  {
    type: "Feb",
    sales: 52,
  },
  {
    type: "Mar",
    sales: 61,
  },
  {
    type: "Apr",
    sales:140,
  },
  {
    type: "May",
    sales: 48,
  },
  {
    type: "Jun",
    sales: 38,
  },
  {
    type: "July",
    sales: 38,
  },
  {
    type: "Aug",
    sales: 38,
  },
  {
    type: "Sept",
    sales: 38,
  },
  {
    type: "Oct",
    sales: 38,
  },
  {
    type: "Nov",
    sales: 38,
  },
  {
    type: "Dec",
    sales: 38,
  },
];
const Dashboard = () => {
  
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <div className="dashboard-card">
      <div className='dashboard-card-top'>
        <h3 className=''>Dashboard</h3>
        <div>
          <button
            
            className='dashboard-card-item-button'
            >test</button>
        </div>  
      </div>

      <div className='dashboard-card-items'>
        <div>
          <div className='dashboard-card-item-left'>
           <h3>Total</h3>
            <p>$37900.00</p>
          </div>
          <div className='dashboard-card-item-right'>
            <BsThreeDotsVertical size={20}/>
            <h3 className='green'><IoMdTrendingUp /> %20</h3>
            <p>This is a hight grow</p>
          </div>
        </div>
        <div>
          <div className='dashboard-card-item-left'>
            <h3>Total</h3>
            <p>100</p>
          </div>
          <div className='dashboard-card-item-right'>
            <BsThreeDotsVertical size={20}/>
            <h3 className='red'><IoMdTrendingDown /> %20</h3>
            <p>This is a hight grow</p>
          </div>
        </div>
        <div>
          <div className='dashboard-card-item-left'>
            <h3>Total</h3>
            <p>10000000</p>
          </div>
          <div className='dashboard-card-item-right'>
            <BsThreeDotsVertical size={20}/>
            <h3 className='green'><IoMdTrendingUp /> %20</h3>
            <p>This is a hight grow</p>
          </div>
        </div>
      </div>

      <div className='dashboard-chart'>
        <h3>Income Chart</h3>
        <div className='dashboard-chart-card'>
            <Column {...config} />
        </div>
      </div>
      <div className='dashboard-table'>
        <h3>Resent Orders</h3>
        
          <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default Dashboard