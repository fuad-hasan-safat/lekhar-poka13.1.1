import React from 'react'
import Login from '../../../sidebar/login-sidebar/Login'
import PlayList from '../audioPlaylist/PlayList'
import Link from 'next/link'
import { audioPlaylist } from '../sampleData/audioPlaylist'

import AudioSidebarLekhok from './AudioSidebarLekhok'

export default function AudioDetailsSideBar() {
    return (
        <>
            <div className="flex flex-col pr-[]">

                <div className="sidebar__iteam__wrap">
                    <Login />
                </div>
                <div className='sidebar__iteam__wrap'>
                    <h2 className='audio__sidebar__heading'>সর্বশেষ প্লেলিস্ট</h2>
                    <div className='py-[10px]'>
                        <hr></hr>
                    </div>
                    <PlayList audioPlaylist={audioPlaylist} />
                    <div className='hm__audio__see__more'>
                        <Link className='sidebar__audio__common__btn' href='#'>সব দেখুন</Link>
                    </div>
                </div>
                <div className='sidebar__iteam__wrap'>
                    <h2 className='audio__sidebar__heading'>লেখক</h2>
                    <div className='py-[10px]'>
                        <hr></hr>
                    </div>
                    <AudioSidebarLekhok />
                    <div className='hm__audio__see__more'>
                        <Link className='sidebar__audio__common__btn' href='/allwriter'>সব দেখুন</Link>
                    </div>
                </div>

                <div className='sidebar__iteam__wrap'>
                    <h2 className='audio__sidebar__heading'>আমার প্লেলিস্ট</h2>
                    <div className='py-[10px]'>
                        <hr></hr>
                    </div>
                    <PlayList audioPlaylist={audioPlaylist}/>
                    <div className='hm__audio__see__more'>
                        <Link className='sidebar__audio__common__btn' href='#'>সব দেখুন</Link>
                    </div>
                </div>
            </div>


        </>
    )
}
