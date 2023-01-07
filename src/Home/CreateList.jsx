  import React, { useState } from 'react';
  import { Button, Modal, DatePicker, Form, Input,Select } from 'antd';
  import moment from 'moment';

  const { Option } = Select;
  const CreateList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const options = [];
    const showModal = () => {setIsModalOpen(true);};
    
    const handleCancel = () => {setIsModalOpen(false);};
    const onFinish = (values) => {
      // fetch("/addlist", {  // Path for API call
      //   method: 'POST',  
      //   body: JSON.stringify(values) // Sending Data to API from req body
      // });
      console.log('Success:', values);setIsModalOpen(false);
    };
    const onFinishFailed = (errorInfo) => {console.log('Failed:', errorInfo);};
  

    
    //const dateFormat = 'YYYY/MM/DD';
    return (
      <>
        <Button type="primary" style={{ marginLeft: '4px'}}
        onClick={showModal}>+ New Task</Button>
        <Modal title="Add Task" open={isModalOpen}  onCancel={handleCancel} footer={null}>
        <Form name="Task" labelCol={{span: 8,}} wrapperCol={{span: 16,}}initialValues={{remember: true,}}
        onFinish={onFinish}onFinishFailed={onFinishFailed}autoComplete="off"
      >
      <Form.Item label="Task" name="username" rules={[{required: true,message: 'Please input your Task!',},]}>
      <Input />
      </Form.Item>
      <Form.Item label="DueDate" name="duedate"rules={[{required: true,message: 'Please input Date',},]}>
      <DatePicker disabledDate={(current) => { return moment().add(-1, 'days')  >= current}}/>
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{required: true,message: 'Please input Description',
        },]}>
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
       <Form.Item label="Tag" name="tag" rules={[{required: true,message: 'Please input your Tag!',},]}>
        <Select mode="tags" style={{width: '100%',}}placeholder="Tags Mode" options={options}/>
       </Form.Item>
        <Form.Item name="Status" label="Status" rules={[{required: true,message: 'Please Select Status!',},]}>
          <Select placeholder="Select Your Status">
            <Option value="Open">OPEN</Option>
            <Option value="Working">WORKING</Option>
            <Option value="Done">DONE</Option>
            <Option value="OverDue">OVERDUE</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8,span: 16,}}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      </Modal>
      </>
    );
  };
  export default CreateList;