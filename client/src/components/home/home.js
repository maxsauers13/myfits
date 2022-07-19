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
            <Card width="25%">
                <div className="home-container">
                    <div className="column">
                        <img src={logoIcon}></img>
                        <p>
                            Welcome to MyFits! This is an application that allows you to create outfits right out of your closet. <br /><br />
                            1. Submit photos of your clothing items to your Closet.<br />
                            2. Apply as many filters to your Fit as you'd like.<br />
                            3. Press the "Fit!" button to generate your optimal outfit!
                        </p>
                    </div>
                </div>
            </Card>
            <Card width="35%">
                <div className="title">
                    Your Fit
                </div>
                <div className="home-container">
                    <div className="column">
                        <div className="clothes-container">
                            Top:
                            <img className="clothes-img shirt-img" src={clothesCtx.topFitImage ? clothesCtx.topFitImage : logoIcon} alt="Shirt"></img>
                        </div>
                        <div className="clothes-container">
                            Bottom:
                            <img className="clothes-img pants-img" src={clothesCtx.bottomFitImage ? clothesCtx.bottomFitImage : logoIcon} alt="Pants"></img>
                        </div>
                    </div>
                    <div className="column">
                        <div className="clothes-container">
                            Outerwear:
                            <img className="clothes-img shirt-img" src={clothesCtx.topFitImage ? clothesCtx.topFitImage : logoIcon} alt="Shirt"></img>
                        </div>
                        <div className="clothes-container">
                            Shoes:
                            <img className="clothes-img pants-img" src={clothesCtx.bottomFitImage ? clothesCtx.bottomFitImage : logoIcon} alt="Pants"></img>
                        </div>
                    </div>
                </div>
            </Card>
            <Card width="25%">
                <div className="title">
                    Filter Your Fit
                </div>
                <div className="home-container">
                    <div className="column">
                        <div className="clothes-container">
                            <div className="label">
                                Category:
                            </div>
                            <select className="select">
                                <option value="Any">Any</option>
                                <option value="Casual">Casual</option>
                                <option value="Professional">Professional</option>
                            </select>
                        </div>
                        <div className="clothes-container">
                            <div className="label">
                                Weather:
                            </div>
                            <select className="select">
                                <option value="Any">Any</option>
                                <option value="Warm">Warm</option>
                                <option value="Cold">Cold</option>
                            </select>
                        </div>
                        <div className="clothes-container">
                            <div className="checkbox-label">
                                Toggle Clothing Items:
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" />
                                Top
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" />
                                Bottom
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" />
                                Outerwear
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" />
                                Shoes
                            </div>
                        </div>
                        <div className="clothes-container">
                            <button className="fit-button" onClick={handleGenerateRandomFit}>Create Fit</button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

// create multi-check list to toggle on/off a type of clothing