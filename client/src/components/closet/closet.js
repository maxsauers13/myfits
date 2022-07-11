import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Card from '../card/card'
import './closetStyles.scss'
import previous from '../../img/previous.png'
import next from '../../img/next.png'
import ClothesContext from '../../context/closet-context'

export default function Closet(props) {
    const closetCtx = useContext(ClothesContext);

    useEffect(() => {
        closetCtx.getClothesCount("shirt", closetCtx.setMaxTopIndex);
        closetCtx.getClothesCount("pants", closetCtx.setMaxBottomIndex);
    }, [])

    useEffect(() => {
        closetCtx.getClosetClothing(closetCtx.topIndex, "shirt", closetCtx.setTopImage);
    }, [closetCtx.topIndex])

    useEffect(() => {
        closetCtx.getClosetClothing(closetCtx.bottomIndex, "pants", closetCtx.setBottomImage);
    }, [closetCtx.bottomIndex])

    return (
        <div className="wrapper">
            <Card>
                <div className="title">
                    {props.username}'s Closet
                </div>
                <div className="closet-container">
                    <div className="closet-column">
                        Tops
                        <div className="img-container">
                            <img className="closet-icon" src={previous} alt="previous" onClick={closetCtx.handleDecreaseTop}></img>
                            <img className="clothes-img closet-img" src={closetCtx.topImage} alt="shirt"></img>
                            <img className="closet-icon" src={next} alt="next" onClick={closetCtx.handleIncreaseTop}></img>
                        </div>
                    </div>
                    <div className="closet-column">
                        Bottoms
                        <div className="img-container">
                            <img className="closet-icon" src={previous} alt="previous" onClick={closetCtx.handleDecreaseBottom}></img>
                            <img className="clothes-img closet-img" src={closetCtx.bottomImage} alt="pants"></img>
                            <img className="closet-icon" src={next} alt="next" onClick={closetCtx.handleIncreaseBottom}></img>
                        </div>
                    </div>
                </div>
                <div className="add-wrapper">
                    <Link className="add-button" to="/closet/add">Add to Closet</Link>
                </div>
            </Card>
        </div>
    )
}

// create little arrow buttons to swap through the clothes