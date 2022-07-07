import React from 'react'
import Card from '../card/card'
import shirt from '../../img/shirt.jpeg'
import pants from '../../img/pants.jpeg'
import './homeStyles.scss'

export default function Home() {
    return (
        <div className="wrapper">
            <Card>
                <div className="title">
                    Create A Fit!
                </div>
                <div className="padding">
                    <img className="clothes-img shirt-img" src={shirt} alt="Shirt"></img>
                </div>
                <div className="padding">
                    <img className="clothes-img pants-img" src={pants} alt="Pants"></img>
                </div>
                <div className="padding">
                    <button className="fit-button">Fit</button>
                </div>
            </Card>
        </div>
    )
}

// create multi-check list to toggle on/off a type of clothing