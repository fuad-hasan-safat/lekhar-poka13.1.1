import React from 'react';
import Link from 'next/link';

const dashboard = () => {
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
                    <div className='d__account__wrap'>
                        <span><img src='/images/dashboard/profile-img.jpg' alt='Profile Img' /></span>
                        <ul>
                            <li><a href='#'><i class="ri-men-line"></i> Md Milon Sarker</a></li>
                            <li><a href='#'><i class="ri-user-3-line"></i>My Profile</a></li>
                            <li><a href='#'><i class="ri-settings-2-line"></i>Setting</a></li>
                            <li><a href='#'><i class="ri-login-circle-line"></i>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default dashboard;