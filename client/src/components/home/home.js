import React, { useContext, useState, useEffect } from 'react'
import Card from '../card/card'
import './homeStyles.scss'
import logoIcon from '../../img/logoIcon.png'
import question from '../../img/question.png'
import loadingAnimation from '../../img/loading-animation.gif'
import ClothesContext from '../../context/clothes-context'

export default function Home() {
    const clothesCtx = useContext(ClothesContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        clothesCtx.getInventoryCount("shirt", clothesCtx.setMaxTopIndex);
        clothesCtx.getInventoryCount("pants", clothesCtx.setMaxBottomIndex);
        clothesCtx.getInventoryCount("outerwear", clothesCtx.setMaxOuterIndex);
        clothesCtx.getInventoryCount("shoes", clothesCtx.setMaxShoesIndex);
    }, [clothesCtx])

    function handleGenerateFit() {
        setLoading(true);
        clothesCtx.generateFit("shirt", clothesCtx.styleSelect, clothesCtx.weatherSelect, clothesCtx.setTopFitImage);
        clothesCtx.generateFit("pants", clothesCtx.styleSelect, clothesCtx.weatherSelect, clothesCtx.setBottomFitImage);
        clothesCtx.generateFit("outerwear", clothesCtx.styleSelect, clothesCtx.weatherSelect, clothesCtx.setOuterFitImage);
        clothesCtx.generateFit("shoes", clothesCtx.styleSelect, clothesCtx.weatherSelect, clothesCtx.setShoesFitImage);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
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
                            3. Apply as many filters and clothing item toggles to your Fit as you'd like.<br />
                            4. Press the "Create Fit" button to generate your optimal outfit!
                        </p>
                    </div>
                </div>
            </Card>
            <Card width="37%">
                <div className="title">
                    Home
                </div>
                <div className="home-container">
                    <div className="column">
                        <div className="clothes-container">
                            Top:
                            <img className="clothes-img home-img"
                                src={clothesCtx.topToggle ? question : (loading ? loadingAnimation : (clothesCtx.topFitImage ? clothesCtx.topFitImage : question))} alt="Shirt" />
                        </div>
                        <div className="clothes-container">
                            Bottom:
                            <img className="clothes-img home-img"
                                src={clothesCtx.bottomToggle ? question : (loading ? loadingAnimation : (clothesCtx.bottomFitImage ? clothesCtx.bottomFitImage : question))} alt="Pants" />
                        </div>
                    </div>
                    <div className="column">
                        <div className="clothes-container">
                            Outerwear:
                            <img className="clothes-img home-img"
                                src={clothesCtx.outerToggle ? question : (loading ? loadingAnimation : (clothesCtx.outerFitImage ? clothesCtx.outerFitImage : question))} alt="Outerwear" />
                        </div>
                        <div className="clothes-container">
                            Shoes:
                            <img className="clothes-img home-img"
                                src={clothesCtx.shoesToggle ? question : (loading ? loadingAnimation : (clothesCtx.shoesFitImage ? clothesCtx.shoesFitImage : question))} alt="Shoes" />
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
                                <input type="checkbox" onChange={(e) => { clothesCtx.setTopToggle(e.target.checked) }} />
                                Top
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" onChange={(e) => { clothesCtx.setBottomToggle(e.target.checked) }} />
                                Bottom
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" onChange={(e) => { clothesCtx.setOuterToggle(e.target.checked) }} />
                                Outerwear
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" onChange={(e) => { clothesCtx.setShoesToggle(e.target.checked) }} />
                                Shoes
                            </div>
                        </div>
                        <div className="clothes-container">
                            <button className="button" onClick={handleGenerateFit} disabled={loading ? true : false} style={{ cursor: loading ? "default" : "pointer" }}>{loading ? "Loading..." : "Create Fit"}</button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}