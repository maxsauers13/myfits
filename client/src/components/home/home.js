import React, { useContext, useEffect } from 'react'
import Card from '../card/card'
import './homeStyles.scss'
import logoIcon from '../../img/logoIcon.png'
import ClothesContext from '../../context/clothes-context'

export default function Home() {
    const clothesCtx = useContext(ClothesContext);
    var loading = 15;

    useEffect(() => {
        clothesCtx.getInventoryCount("shirt", clothesCtx.setMaxTopIndex);
        clothesCtx.getInventoryCount("pants", clothesCtx.setMaxBottomIndex);
        clothesCtx.getInventoryCount("outerwear", clothesCtx.setMaxOuterIndex);
        clothesCtx.getInventoryCount("shoes", clothesCtx.setMaxShoesIndex);
    }, [clothesCtx])

    function handleGenerateFit() {
        setTimeout(() => {
            clothesCtx.generateFit("shirt", clothesCtx.styleSelect, clothesCtx.weatherSelect, clothesCtx.setTopFitImage);
            clothesCtx.generateFit("pants", clothesCtx.styleSelect, clothesCtx.weatherSelect, clothesCtx.setBottomFitImage);
            clothesCtx.generateFit("outerwear", clothesCtx.styleSelect, clothesCtx.weatherSelect, clothesCtx.setOuterFitImage);
            clothesCtx.generateFit("shoes", clothesCtx.styleSelect, clothesCtx.weatherSelect, clothesCtx.setShoesFitImage);
            if (--loading) {
                handleGenerateFit(loading);
            }
        }, 200);
    }

    return (
        <div className="wrapper">
            <Card width="25%">
                <div className="home-container">
                    <div className="column">
                        <img src={logoIcon} alt="MyFits"></img>
                        <p>
                            Welcome to MyFits! This is an application that allows you to create outfits right out of your closet. <br /><br />
                            1. Submit photos of your clothing items to your Closet.<br />
                            2. View your clothes in the Closet tab.<br />
                            3. Apply as many filters to your Fit as you'd like.<br />
                            4. Press the "Fit!" button to generate your optimal outfit!
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
                            <img className="clothes-img shirt-img" src={clothesCtx.outerFitImage ? clothesCtx.outerFitImage : logoIcon} alt="Outerwear"></img>
                        </div>
                        <div className="clothes-container">
                            Shoes:
                            <img className="clothes-img pants-img" src={clothesCtx.shoesFitImage ? clothesCtx.shoesFitImage : logoIcon} alt="Shoes"></img>
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
                                Style:
                            </div>
                            <select className="select" onChange={(e) => { clothesCtx.setStyleSelect(e.target.value) }}>
                                <option value="any">Any</option>
                                <option value="casual">Casual</option>
                                <option value="professional">Professional</option>
                            </select>
                        </div>
                        <div className="clothes-container">
                            <div className="label">
                                Weather:
                            </div>
                            <select className="select" onChange={(e) => { clothesCtx.setWeatherSelect(e.target.value) }}>
                                <option value="any">Any</option>
                                <option value="warm">Warm</option>
                                <option value="cold">Cold</option>
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
                            <button className="button" onClick={handleGenerateFit}>Create Fit</button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}