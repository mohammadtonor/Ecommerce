import { Table } from 'antd';
import './enquries.scss'

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
  
const Enquaries = () => {
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