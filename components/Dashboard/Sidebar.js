import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../store/adminpanel-context';
import { Link } from 'lucide-react';

const Sidebar = () => {
    const router = useRouter();

    const { setCurrentComponentIndex, currentindex } = useContext(AdminContext);
    const [activeMenu, setActiveMenu] = useState(0); // State to track the active menu
    const [openSubMenus, setOpenSubMenus] = useState({ 0: true }); // State to track open sub-menus

    useEffect(() => {
        // Set Lekhar Poka as active by default on the initial render
        setCurrentComponentIndex(0, 'Dashboard');
    }, []);

    const menuItems = [
        { text: 'Dashboard', icon: 'ri-dashboard-fill', href: '/admin/allposttable' },
        { text: 'All Post', icon: 'ri-progress-8-fill', href: '/admin/allposttable' },
        { text: 'All Category', icon: 'ri-progress-8-fill', href: '/admin/allcategory' },
        { text: 'Create Slider', icon: 'ri-progress-8-fill', href: '/admin/slider' },
        { text: 'All Writer', icon: 'ri-progress-8-fill', href: '/admin/writerlist' },
        { text: 'Slider List', icon: 'ri-progress-8-fill', href: '/admin/allslidertable' },
        { text: 'Designation List', icon: 'ri-progress-8-fill', href: '/admin/alldesignation' },
        { text: 'Bio List', icon: 'ri-progress-8-fill', href: '/admin/allWriterBio' },
    ];

    const menuItemsAudio = [
        { textA: 'Creat Ebook', iconA: 'ri-progress-8-fill', href: '/admin/createbook' },
        { textA: 'Create Category', iconA: 'ri-progress-8-fill', href: '/admin/allcategory' },
        { textA: 'Create Quote', iconA: 'ri-progress-8-fill', href: '/admin/slider' },
        { textA: 'All Writer', iconA: 'ri-progress-8-fill', href: '/admin/writerlist' },
        { textA: 'Slider List', iconA: 'ri-progress-8-fill', href: '/admin/allslidertable' },
        { textA: 'Designation List', iconA: 'ri-progress-8-fill', href: '/admin/alldesignation' },
        { textA: 'Bio List', iconA: 'ri-progress-8-fill', href: '/admin/allWriterBio' },
    ];

    const handleIndexClick = (index, page) => {
        setCurrentComponentIndex(index, page);
        setActiveMenu(index); // Set the clicked menu as active
    };

    const toggleSubMenu = (index) => {
        setOpenSubMenus({ [index]: !openSubMenus[index] });
    };

    return (
        <div className='d__sidebar'>
            <div className='d__sidebar__menu'>
                <ul>
                    <li>
                        <a onClick={() => toggleSubMenu(0)}>Lekhar Poka <i class="ri-arrow-down-s-line"></i></a>
                        {openSubMenus[0] && (
                            <ul>
                                {menuItems.map((item, index) => (
                                    <li key={index} className={`text-black ${currentindex === index ? 'active' : ''}`}>
                                        <button onClick={() => handleIndexClick(index, item.text)}>
                                            <i className={`ri ${item.icon} text-black`}></i>
                                            {item.text}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
                <ul>
                    <li>
                        <a onClick={() => toggleSubMenu(1)}>Audio Book <i class="ri-arrow-down-s-line"></i></a>
                        {openSubMenus[1] && (
                            <ul>
                                {menuItemsAudio.map((item, index) => (
                                    <li key={index + menuItems.length} className={`text-black ${currentindex === index + 8 ? 'active' : ''}`}>
                                        <button onClick={() => handleIndexClick(index + 8, item.text)}>
                                            <i className={`ri ${item.iconA} text-black`}></i>
                                            {item.textA}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;