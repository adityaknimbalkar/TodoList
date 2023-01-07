  /* eslint-disable jsx-a11y/anchor-is-valid */
  import React, {useState } from 'react';
  import CreateList from './CreateList';
  import { Form, Input, InputNumber, Popconfirm, Table, Typography,Tag ,Select,AutoComplete } from 'antd';
  const {options}=Select;
  const EditableCell = ({
    editing,dataIndex,title,inputType,record,index,children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },]}>
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}</td>);};
  const TodoList = () => {

    //  const[tasklist,setTasklist]=useState([]);
      
    //   useEffect(()=>{                                               //API Call 
    //    fetch("/todolist").then((res)=>res.json()).then((result)=>{
    //     setTodolist(result);
    //     setTasklist(result);
    //   });
    //  },[]);
    const dataScource=[];
        const TaskStatus=["OPEN","DONE","WORKING","OVERDUE"];
        const TaskTag=["STUDY","TIME","LAST","REQUIRED"];
        const Task=[
        " Rename the diagram into Request management by clicking in the blanck space around the pool","Rename the pool into Leave request management","Rename the lane into Manager","Rename the start event into New leave request","Since the submission of a new leave request happens at pool level (process instantiation)", "no need for a Submit request task","just rename the default human task into Validate request","Add a terminate end event that you can rename Happy end"
        ];
        
        for(var i=2;i<=150;i++){
          var j=i+1;
          dataScource.push(
            {
              key: i,
              title: `${(String.fromCharCode((i%25)+97)).toUpperCase()}${Task[(i%8)]}`,
              date: `201${(i%10).toString()}-0${(i%10===0?1:i%10).toString()}-${(i%30===0?1:i%30).toString()} `,
              duedate: `201${(i%10).toString()}-0${(i%10===0?1:i%10).toString()}-${(j%30===0?1:j%30).toString()}`,
              status: `${TaskStatus[i%4]}`,
              tags: [`${TaskTag[i%4]}`,`${TaskTag[(i+1)%4]}`],
              description:'Resize images using Adobe Photoshop Complete minor HTML/CSS coding as needed Research emerging design trends',
            },);
        }
    const [OriginData,setOriginData]=useState(dataScource);
    const[todolist,setTodolist]=useState(dataScource);
    // const[tasklist,setTasklist]=useState([OriginData]);
    
    const handleDelete = (key) => {
      const newData = OriginData.filter((item) => item.key !== key);
      setTodolist(newData); };
    const handleSearch = (value) => {
      const res = OriginData.filter(task => 
        task.title.toUpperCase().includes(value.toUpperCase()));
      if(res==''){setOriginData(dataScource);}
      else setOriginData(res); };
  
    const [form] = Form.useForm();
    //const [data, setData] = useState(OriginData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
    
      form.setFieldsValue({
        key: '',
        title: '',
        date: '',
        duedate: '',
        status: '',
        tags: '',
        description: '',
        ...record,
      });
      setEditingKey(record.key);
    };
    const cancel = () => {setEditingKey('');};
    const save = async (key) => {
      try {
        const row = await form.validateFields();const newData = [...OriginData];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });setTodolist(newData);setEditingKey('');
        } else {newData.push(row);setTodolist(newData);setEditingKey('');}
      } catch (errInfo) {console.log('Validate Failed:', errInfo); }
    };
    const columns = [
      { title: 'Date', dataIndex: 'date',key: 'date' ,editable:false,
      sorter: (a, b) => {return new Date(b.date) - new Date(a.date); },
    },
      {
        title: 'Task',dataIndex: 'title',width: '20%',editable: true,
        sorter: (a,b)=>{ return a.tittle<b.title;},
      },
      { title: 'Due_Date', dataIndex: 'duedate', key: 'date',editable:true,sorter: (a, b) => {
        return new Date(b.date) - new Date(a.date);
      }, },
      {
          title: 'Tags',key: 'tags',dataIndex: 'tags',width: '15%',editable: false,
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser'||tag==='OVERDUE') {color = 'volcano';}
                return (
                  <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>
                );})}
            </>
          ),},
      {
        title: 'Status',dataIndex: 'status',width: '10%',editable: false,   
        filters:[
          {text:'WORKING',value:true},{text:'OVERDUE',value:false},{text:'OPEN',value:false},
          {text:'DONE',value:false},
        ],
        onFilter:(value,record)=>{return record.status===value}
      },
      {
        title: 'Action',dataIndex: 'operation',width: '10%',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
          );},
      },
      {title: 'Action',dataIndex: 'operation',
          render: (_, record) =>
          todolist.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                <a>Delete</a>
              </Popconfirm>
            ) : null,
        },
    ];
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {return col;}
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === 'key' ? 'number' : 'text',
          dataIndex: col.dataIndex,title: col.title,editing: isEditing(record),
        }),
      };
    });
    return (
      <div>
        <div className='mx-4' style={{ marginLeft:'60px',marginTop: '20px',display:'flex'}}>
        <h3>TODO-LIST</h3><span></span>
        <AutoComplete
        style={{
          width: 200,
          marginLeft:'60%',
        }}
        onSearch={handleSearch} placeholder="Search here" options={options}
      /><span></span>
      <CreateList/>
        </div>
        
      <Form form={form} component={false}>
        <Table components={{body: {cell: EditableCell,},}}bordered expandable={{
              expandedRowRender: (record) => (
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {record.description}
                </p>
              ),
              rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
          dataSource={OriginData} columns={mergedColumns} rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      </div>
    );
  };
  export default TodoList;