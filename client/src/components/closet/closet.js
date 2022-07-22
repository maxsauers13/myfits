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
        clothesCtx.getClothesCount("outerwear", clothesCtx.setMaxOuterIndex);
        clothesCtx.getClothesCount("shoes", clothesCtx.setMaxShoesIndex);
    }, [clothesCtx])

    useEffect(() => {
        clothesCtx.getClosetClothing(clothesCtx.topIndex, clothesCtx.maxTopIndex, "shirt", clothesCtx.setTopClosetImage, clothesCtx.setTopClosetNextImage, clothesCtx.setTopClosetPrevImage);
    }, [clothesCtx, clothesCtx.topIndex])

    useEffect(() => {
        clothesCtx.getClosetClothing(clothesCtx.bottomIndex, clothesCtx.maxBottomIndex, "pants", clothesCtx.setBottomClosetImage, clothesCtx.setBottomClosetNextImage, clothesCtx.setBottomClosetPrevImage);
    }, [clothesCtx, clothesCtx.bottomIndex])

    useEffect(() => {
        clothesCtx.getClosetClothing(clothesCtx.outerIndex, clothesCtx.maxOuterIndex, "outerwear", clothesCtx.setOuterClosetImage, clothesCtx.setOuterClosetNextImage, clothesCtx.setOuterClosetPrevImage);
    }, [clothesCtx, clothesCtx.outerIndex])

    useEffect(() => {
        clothesCtx.getClosetClothing(clothesCtx.shoesIndex, clothesCtx.maxShoesIndex, "shoes", clothesCtx.setShoesClosetImage, clothesCtx.setShoesClosetNextImage, clothesCtx.setShoesClosetPrevImage);
    }, [clothesCtx, clothesCtx.shoesIndex])

    return (
        <div className="wrapper">
            <Card width="70%">
                <div className="title">
                    {props.username}'s Closet
                </div>
                <div className="closet-container">
                    <div className="column">
                        <div className="closet-label">
                            Tops:
                        </div>
                        <div className="img-container">
                            <img className="closet-icon" src={previous} alt="previous" onClick={clothesCtx.handleDecreaseTop}></img>

                            <img className="clothes-img rotator-prev-img" src={clothesCtx.topClosetPrevImage} alt="shirt"></img>
                            <img className="clothes-img closet-img" src={clothesCtx.topClosetImage} alt="shirt"></img>
                            <img className="clothes-img rotator-next-img" src={clothesCtx.topClosetNextImage} alt="shirt"></img>

                            <img className="closet-icon" src={next} alt="next" onClick={clothesCtx.handleIncreaseTop}></img>
                        </div>
                        <div className="closet-label">
                            Bottoms:
                        </div>
                        <div className="img-container">
                            <img className="closet-icon" src={previous} alt="previous" onClick={clothesCtx.handleDecreaseBottom}></img>

                            <img className="clothes-img rotator-prev-img" src={clothesCtx.bottomClosetPrevImage} alt="pants"></img>
                            <img className="clothes-img closet-img" src={clothesCtx.bottomClosetImage} alt="pants"></img>
                            <img className="clothes-img rotator-next-img" src={clothesCtx.bottomClosetNextImage} alt="pants"></img>

                            <img className="closet-icon" src={next} alt="next" onClick={clothesCtx.handleIncreaseBottom}></img>
                        </div>
                    </div>
                    <div className="column">
                        <div className="closet-label">
                            Outerwear:
                        </div>
                        <div className="img-container">
                            <img className="closet-icon" src={previous} alt="previous" onClick={clothesCtx.handleDecreaseOuter}></img>

                            <img className="clothes-img rotator-prev-img" src={clothesCtx.outerClosetPrevImage} alt="outerwear"></img>
                            <img className="clothes-img closet-img" src={clothesCtx.outerClosetImage} alt="outerwear"></img>
                            <img className="clothes-img rotator-next-img" src={clothesCtx.outerClosetNextImage} alt="outerwear"></img>

                            <img className="closet-icon" src={next} alt="next" onClick={clothesCtx.handleIncreaseOuter}></img>
                        </div>
                        <div className="closet-label">
                            Shoes:
                        </div>
                        <div className="img-container">
                            <img className="closet-icon" src={previous} alt="previous" onClick={clothesCtx.handleDecreaseShoes}></img>

                            <img className="clothes-img rotator-prev-img" src={clothesCtx.shoesClosetPrevImage} alt="shoes"></img>
                            <img className="clothes-img closet-img" src={clothesCtx.shoesClosetImage} alt="shoes"></img>
                            <img className="clothes-img rotator-next-img" src={clothesCtx.shoesClosetNextImage} alt="shoes"></img>

                            <img className="closet-icon" src={next} alt="next" onClick={clothesCtx.handleIncreaseShoes}></img>
                        </div>
                    </div>
                </div>
            </Card>
            <Card width="20%">
                <div className="title">
                    Inventory
                </div>
                <div className="inventory-container">
                    <div className="inventory-counter">
                        Tops: {clothesCtx.maxTopIndex} Item(s)
                    </div>
                    <div className="inventory-counter">
                        Bottoms: {clothesCtx.maxBottomIndex} Item(s)
                    </div>
                    <div className="inventory-counter">
                        Outerwear: {clothesCtx.maxOuterIndex} Item(s)
                    </div>
                    <div className="inventory-counter">
                        Shoes: {clothesCtx.maxShoesIndex} Item(s)
                    </div>
                    <div className="inventory-counter">
                        Casual: {clothesCtx.maxTopIndex} Item(s)
                    </div>
                    <div className="inventory-counter">
                        Professional: {clothesCtx.maxBottomIndex} Item(s)
                    </div>
                    <div className="inventory-counter">
                        Warm: {clothesCtx.maxTopIndex} Item(s)
                    </div>
                    <div className="inventory-counter">
                        Cold: {clothesCtx.maxBottomIndex} Item(s)
                    </div>
                </div>
                <div className="add-wrapper">
                    <Link className="button" to="/closet/add">Add to Closet</Link>
                </div>
            </Card>
        </div>
    )
}

// create little arrow buttons to swap through the clothes