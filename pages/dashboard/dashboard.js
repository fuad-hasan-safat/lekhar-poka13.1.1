import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Sidebar from '../../components/Dashboard/Sidebar';
import { AdminContext } from '../../components/store/adminpanel-context';
import AllPost from '../../components/Dashboard/components/AllPost';


const notificationData =[
    {
     image:'/images/dashboard/profile-img.jpg',
     info:'John Doe added new task ',
     time:'40 Mintes Age',
    },
    {
    image:'/images/dashboard/profile-img.jpg',
    info:'John Doe added new task ',
    time:'40 Mintes Age',
    },
    {
    image:'/images/dashboard/profile-img.jpg',
    info:'John Doe added new task ',
    time:'40 Mintes Age',
    },
    {
    image:'/images/dashboard/profile-img.jpg',
    info:'John Doe added new task ',
    time:'40 Mintes Age',
    },
]

const Dashboard = ({children}) => {

    const {currentindex} = useContext(AdminContext)

    const [isOpen,setIsOpen] = useState(false);
    const [isNotifation,setIsNotifation] = useState(false);

    const toggleMenu=()=>{
        setIsOpen(!isOpen);
    }
    const toggleNoti=()=>{
        setIsNotifation(!isNotifation);
    }

    return (
        <div className='main-wrapper'>
            <div className='dashboard__header'>
                <div className='header-left'>
                    <div className="d-logo">
                        <Link href="/">
                            <img src='/images/svgs/lekhapokaBlack.svg' alt='lekhapo kaBlack' />
                        </Link>
                    </div>
                </div>
                <div className='header-rgt'>
                    <div className={`d__notifation__wrap ${isNotifation ? 'open' : ''}`}>
                        <p>2</p>
                        <span onClick={toggleNoti}><i class="ri-notification-fill"></i></span>
                        <ul>
                            {notificationData.map((item,index)=>(
                            <li key={index}>
                                <a href='#'>
                                    <div className='notification__item'>
                                        <img src={item.image} alt='lekhapo kaBlack' />
                                        <h5>{item.info}</h5>
                                        <span>{item.time}</span>
                                    </div>
                                </a>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`d__account__wrap ${isOpen ? 'open' : ''}`}>
                        <span onClick={toggleMenu}><img src='/images/dashboard/profile-img.jpg' alt='Profile Img' /></span>
                        <ul>
                            <li><a href='#'><i class="ri-men-line"></i> Md Milon Sarker</a></li>
                            <li><a href='#'><i class="ri-user-3-line"></i>My Profile</a></li>
                            <li><a href='#'><i class="ri-settings-2-line"></i>Setting</a></li>
                            <li><a href='#'><i class="ri-login-circle-line"></i>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Sidebar />
            <div className='page-wrapper'>
                <div className='page__content'>
                    {currentindex === 0 && <AllPost/>}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;