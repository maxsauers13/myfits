import React from 'react'
import shirt from '../../img/shirt.jpeg'
import pants from '../../img/pants.jpeg'
import './homeStyles.scss'

export default function Home() {
    return (
        <body>
            <div className="wrapper">
                <div className="title">
                    Create A Fit!
                </div>
                <div className="padding">
                    <img className="shirt-img" src={shirt} alt="Shirt"></img>
                </div>
                <div className="padding">
                    <img className="pants-img" src={pants} alt="Pants"></img>
                </div>
                <div className="padding">
                    <button className="fit-button">Fit</button>
                </div>
            </div>
        </body>
    )
}

// create multi-check list to toggle on/off a type of clothing