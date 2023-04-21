import React, { useState } from 'react'

export default function Toggle({ children, index, item }) {
    const [toggle, setToggle] = useState(false)
    return (
        <>
            <div className="card__show">
                <button className='toggle_btn' onClick={() => setToggle(prev => !prev)}>
                    <i class="fa fa-star"></i>
                </button>
                <h1 id='no_of_task' style={!toggle ? { display: 'block' } : { display: 'none' }}>{item}</h1>
                <div key={index} className='task__card card__show-container' style={!toggle ? { height: '0px' } : { height: 'auto' }}>
                    {children}
                </div>
            </div>


        </>
    )
}
