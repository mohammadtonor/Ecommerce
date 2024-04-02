import { Modal } from 'antd';
const CustomModal = ({title , open, content, performAction, handleCancel}) => {
  return (
    <Modal
    title={title}
    open={open}
    onOk={performAction}
    onCancel={handleCancel}
    okText="Ok"
    cancelText="Cancel"
    >
        <p>{content}</p>
    </Modal>
  )
}

export default CustomModal