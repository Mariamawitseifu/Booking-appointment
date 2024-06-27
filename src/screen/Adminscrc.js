import React from 'react'

import { Tabs } from 'antd';
import DocCreation from '../componenet/DocCreation';
import BranchForm from '../componenet/BranchCreation';
import ScheduleForm from '../componenet/ScheduleCreation';
import BookingPatient from '../componenet/BookingPatient'
import BotAccess from '../componenet/botAccess';



const onChange = (key) => {
  console.log(key);
};
const items = [

  {
    key: '1',
    label: 'Doctors Registeration',
    children: <DocCreation/>,
  },
  {
    key: '2',
    label: 'Brnach Registeration',
    children:<BranchForm/>,
  },
  {
    key: '3',
    label: 'Doctors Schedule',
    children:<ScheduleForm/>,
  },
  {
    key: '4',
    label: 'Booking List',
    children: <BookingPatient/>,
  },
  {
    key: '5',
    label: 'Bot Access',
    children: <BotAccess/>,
  },
];


export default function Adminscrc() {
  return (
    <div className=' mt-3  m-3 box_shadow_3 p-3 ' style={{background:'#ffff',fontWeight:'bold',borderRadius:'15px'}}>
        <h1 className='text-center ' style={{fontWeight:'bold'}}>Admin Panel</h1>
       <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}
