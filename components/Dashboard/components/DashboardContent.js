import React from 'react';


const dashboardCtData=[
    {
        title:'কবিতা',
        text:'Total Kobita',
        number:'100',
        color:'#f58807',
    },
    {
        title:'কবিতা',
        text:'Total Kobita',
        number:'85',
        color:'#00CFE8',
    },
    {
        title:'কবিতা',
        text:'Total Kobita',
        number:'90',
        color:'#FCD200',
    },
    {
        title:'কবিতা',
        text:'Total Kobita',
        number:'200',
        color:'#1B2850',
    },
    {
        title:'কবিতা',
        text:'Total Kobita',
        number:'250',
        color:'#FF9F43',
    },
    {
        title:'কবিতা',
        text:'Total Kobita',
        number:'230',
        color:'#FF9F43',
    },
    {
        title:'কবিতা',
        text:'Total Kobita',
        number:'120',
        color:'#FF9F43',
    },
    {
        title:'কবিতা',
        text:'Total Kobita',
        number:'150',
        color:'#FF9F43',
    },
]

function DashboardContent() {
    return (
        <div className='dashboard__component'>
            <div className='dashboard__category'>
                <ul>
                    {dashboardCtData.map((item,index)=>(
                      <li>
                        <div className='dashboard__cmpt__grid' style={{backgroundColor:`${item.color}`}}>
                            <strong>{item.number}</strong>
                            <h5>{item.title}</h5>
                            <p>{item.text}</p>
                        </div>
                      </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DashboardContent;