import React, { useContext, useEffect } from 'react'
import Card from '../card/card'
import './homeStyles.scss'
import questionMark from '../../img/questionmark.jpg'
import logoIcon from '../../img/logoIcon.png'
import ClothesContext from '../../context/clothes-context'

export default function Home() {
    const clothesCtx = useContext(ClothesContext);
    var loading = 15;

    useEffect(() => {
        clothesCtx.getClothesCount("shirt", clothesCtx.setMaxTopIndex);
        clothesCtx.getClothesCount("pants", clothesCtx.setMaxBottomIndex);
    }, [clothesCtx])

    function handleGenerateRandomFit() {
        setTimeout(() => {
            clothesCtx.generateRandomFit(clothesCtx.maxTopIndex, "shirt", clothesCtx.setTopFitImage);
            clothesCtx.generateRandomFit(clothesCtx.maxBottomIndex, "pants", clothesCtx.setBottomFitImage);
            if (--loading) {
                handleGenerateRandomFit(loading);
            }
        }, 200);
    }

    return (
        <div className="wrapper">
            <Card>
                <div className="title">
                    Create A Fit!
                </div>
                <div className="padding">
                    <img className="clothes-img shirt-img" src={clothesCtx.topFitImage ? clothesCtx.topFitImage : logoIcon} alt="Shirt"></img>
                </div>
                <div className="padding">
                    <img className="clothes-img pants-img" src={clothesCtx.bottomFitImage ? clothesCtx.bottomFitImage : logoIcon} alt="Pants"></img>
                </div>
                <div className="padding">
                    <button className="fit-button" onClick={handleGenerateRandomFit}>Fit</button>
                </div>
            </Card>
        </div>
    )
}

// create multi-check list to toggle on/off a type of clothing