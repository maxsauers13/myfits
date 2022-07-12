import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Card from '../card/card'
import './closetStyles.scss'
import previous from '../../img/previous.png'
import next from '../../img/next.png'
import ClothesContext from '../../context/clothes-context'

export default function Closet(props) {
    const clothesCtx = useContext(ClothesContext);

    useEffect(() => {
        clothesCtx.getClothesCount("shirt", clothesCtx.setMaxTopIndex);
        clothesCtx.getClothesCount("pants", clothesCtx.setMaxBottomIndex);
    }, [clothesCtx])

    useEffect(() => {
        clothesCtx.getClosetClothing(clothesCtx.topIndex, "shirt", clothesCtx.setTopClosetImage);
    }, [clothesCtx, clothesCtx.topIndex])

    useEffect(() => {
        clothesCtx.getClosetClothing(clothesCtx.bottomIndex, "pants", clothesCtx.setBottomClosetImage);
    }, [clothesCtx, clothesCtx.bottomIndex])

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
                            <img className="closet-icon" src={previous} alt="previous" onClick={clothesCtx.handleDecreaseTop}></img>
                            <img className="clothes-img closet-img" src={clothesCtx.topClosetImage} alt="shirt"></img>
                            <img className="closet-icon" src={next} alt="next" onClick={clothesCtx.handleIncreaseTop}></img>
                        </div>
                    </div>
                    <div className="closet-column">
                        Bottoms
                        <div className="img-container">
                            <img className="closet-icon" src={previous} alt="previous" onClick={clothesCtx.handleDecreaseBottom}></img>
                            <img className="clothes-img closet-img" src={clothesCtx.bottomClosetImage} alt="pants"></img>
                            <img className="closet-icon" src={next} alt="next" onClick={clothesCtx.handleIncreaseBottom}></img>
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