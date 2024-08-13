import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { AdminContext } from '../store/adminpanel-context';

const Sidebar = () => {
    const router = useRouter();
    const { setCurrentComponentIndex, currentindex } = useContext(AdminContext);

    const [activeMenu, setActiveMenu] = useState(currentindex || 0); // State to track the active menu
    const [openSubMenus, setOpenSubMenus] = useState({ 0: true }); // State to track open sub-menus
    const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

    const sidebarRef = useRef(null);

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
        { textA: 'Create Audio Book', iconA: 'ri-progress-8-fill', href: '' },
        { textA: 'Edit Audio Book', iconA: 'ri-progress-8-fill', href: '' },
        { textA: 'Create Category', iconA: 'ri-progress-8-fill', href: '/admin/allcategory' },
        { textA: 'Create Quote', iconA: 'ri-progress-8-fill', href: '/admin/slider' },
        { textA: 'Add Audio', iconA: 'ri-progress-8-fill', href: '/admin/writerlist' },
        { textA: 'Delete Category', iconA: 'ri-progress-8-fill', href: '' },
        { textA: 'Delete Audiobook', iconA: 'ri-progress-8-fill', href: '' },
    ];

    const handleIndexClick = (index, page) => {
        setCurrentComponentIndex(index, page);
        setActiveMenu(index); // Set the clicked menu as active
        setIsOpen(false); // Close the sidebar on item click (for better UX on mobile)
    };

    const toggleSubMenu = (index) => {
        setOpenSubMenus((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const ToggleSidebar = (e) => {
        e.stopPropagation(); // Stop click event from propagating to document
        setIsOpen((prevIsOpen) => !prevIsOpen); // Toggle the sidebar visibility
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
            setIsOpen(false); // Close the sidebar if click is outside and the sidebar is open
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <div className="sidebar__toggle__menu">
                <button onClick={ToggleSidebar}><i className="ri-menu-line"></i></button>
            </div>
            <div ref={sidebarRef} className={`d__sidebar ${isOpen ? 'addActive' : ''}`}>
                <div className="d__sidebar__menu">
                    <ul>
                        <li>
                            <a onClick={() => toggleSubMenu(0)}>Lekhar Poka <i className="ri-arrow-down-s-line"></i></a>
                            {openSubMenus[0] && (
                                <ul>
                                    {menuItems.map((item, index) => (
                                        <li key={index} className={`text-black ${activeMenu === index ? 'active' : ''}`}>
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
                            <a onClick={() => toggleSubMenu(1)}>Audio Book <i className="ri-arrow-down-s-line"></i></a>
                            {openSubMenus[1] && (
                                <ul>
                                    {menuItemsAudio.map((item, index) => (
                                        <li key={index + menuItems.length} className={`text-black ${activeMenu === index + menuItems.length ? 'active' : ''}`}>
                                            <button onClick={() => handleIndexClick(index + menuItems.length, item.textA)}>
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
        </>
    );
};

export default Sidebar;
