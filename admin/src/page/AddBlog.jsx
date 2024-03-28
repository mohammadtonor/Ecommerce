import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import { Select } from 'antd'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { InboxOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import Dragger from 'antd/es/upload/Dragger';

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

const AddBlog = () => {
  const [desc, setDesc] = useState("");
  const handleDesc = (e) => {
    setDesc(e)
  }

  return (
    <div className='w-100'>
      <h3 className="mb-4">Add Blog</h3>
      
      <div className="flex-grow">
      
        <form action="" className="w-100">
            <Dragger {...props} className='mb-3' rootClassName=''>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
          </Dragger>
          <div className='mt-4'/>
          <CustomInput id="title" label={"Enter Blog Title"} type={"text"} className=''/>
          <Select name="" id="" className="p-6">
            <option selected value="">
              Select Blog Category
            </option>
            <option value="">Select Blog Category</option>
            <option value="">Select Blog Category</option>
          </Select>
          <ReactQuill theme="snow" value={desc} onChange={handleDesc} />
          <button className="add-blog-button">Add Blog</button>
        </form>
      </div>
    </div>
  );
}

export default AddBlog