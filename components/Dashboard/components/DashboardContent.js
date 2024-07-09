import React from 'react';


const dashboardCtData=[
    {
        title:'কবিতা',
        text:'মোট কবিতা সংখ্যা',
        number:'100',
        color:'#f58807',
    },
    {
        title:'উপন্যাস',
        text:'মোট উপন্যাস সংখ্যা',
        number:'85',
        color:'#00CFE8',
    },
    {
        title:'প্রবন্ধ',
        text:'মোট প্রবন্ধ সংখ্যা',
        number:'90',
        color:'#FCD200',
    },
    {
        title:'গল্প',
        text:'মোট গল্প সংখ্যা',
        number:'200',
        color:'#fcab36',
    },
    {
        title:'জীবনী',
        text:'মোট জীবনী সংখ্যা',
        number:'250',
        color:'#00736B',
    },
    {
        title:'ছোট গল্প',
        text:'মোট ছোট গল্প সংখ্যা',
        number:'230',
        color:'#5DE3FF',
    },
    {
        title:'অনুগল্প',
        text:'মোট অনুগল্প সংখ্যা',
        number:'120',
        color:'#FF9F43',
    },
    {
        title:'শিশুসাহিত্য',
        text:'মোট শিশুসাহিত্য সংখ্যা',
        number:'150',
        color:'#ECFF43',
    },
    {
        title:'বিজ্ঞান ',
        text:'মোট বিজ্ঞান সংখ্যা',
        number:'150',
        color:'#28C76F',
    },
    {
        title:'ইসলামিক ',
        text:'মোট ইসলামিক সংখ্যা',
        number:'150',
        color:'#F96E6F',
    },
]

const AudioCategoryData=[
    {
        title:'রোমান্টিক',
        text:'মোট রোমান্টিক সংখ্যা',
        number:'100',
        color:'#FF5555',
    },
    {
        title:'সাইন্স ফিকশন',
        text:'মোট সাইন্স ফিকশন সংখ্যা',
        number:'85',
        color:'#59C1B9',
    },
    {
        title:'উপন্যাস',
        text:'মোট উপন্যাস সংখ্যা',
        number:'90',
        color:'#585EDF',
    },
    {
        title:'কবিতা',
        text:'মোট কবিতা সংখ্যা',
        number:'200',
        color:'#00D67C',
    },
    {
        title:'কিশোর উপন্যাস',
        text:'মোট কিশোর উপন্যাস সংখ্যা',
        number:'250',
        color:'#F247C2',
    },
    {
        title:'ভ্রমণ',
        text:'মোট ছোট গল্প সংখ্যা',
        number:'230',
        color:'#B741FF',
    },
    {
        title:'জীবনী',
        text:'মোট জীবনী সংখ্যা',
        number:'120',
        color:'#FC3939',
    },
    {
        title:'গল্প',
        text:'মোট গল্প সংখ্যা',
        number:'150',
        color:'#FFC700',
    },
    {
        title:'ইতিহাস ',
        text:'মোট ইতিহাস সংখ্যা',
        number:'150',
        color:'#FFC700',
    },
    {
        title:'ইসলামিক ',
        text:'মোট ইসলামিক সংখ্যা',
        number:'150',
        color:'#585EDF',
    },
    {
        title:'রোমান্টিক ',
        text:'মোট রোমান্টিক সংখ্যা',
        number:'150',
        color:'#59C1B9',
    },
    {
        title:'ক্লাসিকস ',
        text:'মোট ক্লাসিকস সংখ্যা',
        number:'150',
        color:'#B741FF',
    },
]

function DashboardContent() {
    return (
        <div className='dashboard__component'>
            <div className='dashboard__category clearfix'>
                <h3>Lekharpoka</h3>
                <ul>
                    {dashboardCtData.map((item,index)=>(
                      <li key={index}>
                        <div className='dashboard__cmpt__grid' style={{backgroundColor:`${item.color}`}}>
                            <div>
                                <h5>{item.title}</h5>
                                <p>{item.text}</p>
                            </div>
                            <strong>{item.number}</strong>
                        </div>
                      </li>
                    ))}
                </ul>
            </div>
            <div className='dashboard__category clearfix'>
                <h3>Audio Book</h3>
                <ul>
                    {AudioCategoryData.map((item,index)=>(
                      <li key={index + 9}>
                        <div className='dashboard__cmpt__grid' style={{backgroundColor:`${item.color}`}}>
                            <div>
                                <h5>{item.title}</h5>
                                <p>{item.text}</p>
                            </div>
                            <strong>{item.number}</strong>
                        </div>
                      </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DashboardContent;