import React from 'react'
import Home from './Home'
import Form from '../componenet/Form';
import Table from '../componenet/Table';



import { Tabs } from 'antd';
import Showonmap from './Showonmap';


const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: 'Doctors',
      children:<Home/>,
    },
    {
      key: '2',
      label: 'Patient Registration',
      children: <Form/>,
    },
    // {
    //   key: '3',
    //   label: 'Registerd Customer',
    //   children: <Table/>,
    // },
  
    {
      key: '3',
      label: 'Location Map',
      children:<Showonmap/>,
    }
  ];

export default function Generaltabs({ activeTabKey, setActiveTabKey }) {
  return (
    <div className=' mt-3  m-3 box_shadow_3 p-3' style={{background:'#ffff',borderRadius:'12px'}}>
        {/* <h1 className='text-center'>Admin Panel</h1> */}
       <Tabs activeKey={activeTabKey} items={items} onChange={setActiveTabKey} className='tabs_titel'/>
    </div>
  )
}
