import React from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill'
import { Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const AddProducts = () => {
    const [desc, setDesc] = React.useState('');

    const handleDesc = (e) => {
        setDesc(e)
    }
  return (
    <div>
        <h3 className='mb-4 title'>Add Product</h3>
        <div>
            <form action="" className='w-100'>
                <CustomInput id="title" label={"Enter Product Title"} type={"text"} />
                <ReactQuill theme="snow" value={desc} onChange={handleDesc}/>
                <CustomInput id="price" label={"Enter Product Price"} type={"number"} />
                <Select
                    defaultValue="category1"
                    width='100%'
                    className='select-input'
                    options={[
                        { value: 'category1', label: 'Select Category1' },
                        { value: 'category2', label: 'Select Category2' },
                        { value: 'category3', label: 'Select Category3' },
                    ]}
                />
                <Select
                    defaultValue="Brand1"
                    width='100%'
                    className='select-input'
                    options={[
                        { value: 'Brand1', label: 'Select Brand1' },
                        { value: 'Brand2', label: 'Select Brand2' },
                        { value: 'Brand3', label: 'Select Brand3' },
                    ]}
                />
                <div className='mt-4'/>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
                <button className="add-blog-button">Add Product</button>
            </form>
        </div>
    </div>
  )
}

export default AddProducts