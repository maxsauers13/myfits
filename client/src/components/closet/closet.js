import React from 'react'
import './closetStyles.scss'
import shirt from '../../img/shirt.jpeg'
import pants from '../../img/pants.jpeg'

export default function Closet(props) {
    return (
        <div className="wrapper">
            <div className="title">
                {props.username}'s Closet
            </div>
            <div className="closet-container">
                <div className="closet-column">
                    Tops
                    <img className="clothes-img closet-img" src={shirt} alt="shirt"></img>
                </div>
                <div className="closet-column">
                    Bottoms
                    <img className="clothes-img closet-img" src={pants} alt="pants"></img>
                </div>
            </div>
            <button className="add-button">Add to Closet</button>
        </div>
    )
}

// create little arrow buttons to swap through the clothes