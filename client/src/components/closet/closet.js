import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Card from '../card/card'
import './closetStyles.scss'
import shirt from '../../img/shirt.jpeg'
import pants from '../../img/pants.jpeg'
import previous from '../../img/previous.png'
import next from '../../img/next.png'

export default function Closet(props) {
    const [topImage, setTopImage] = useState();

    useEffect(() => {
        Axios.get('http://localhost:3001/clothes', {
        }).then((response) => {
            const imageURL = response.data[0].image;
            setTopImage(imageURL);
        })
    }, [])

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
                            <img className="closet-icon" src={previous} alt="previous"></img>
                            <img className="clothes-img closet-img" src={topImage} alt="shirt"></img>
                            <img className="closet-icon" src={next} alt="next"></img>
                        </div>
                    </div>
                    <div className="closet-column">
                        Bottoms
                        <div className="img-container">
                            <img className="closet-icon" src={previous} alt="previous"></img>
                            <img className="clothes-img closet-img" src={pants} alt="pants"></img>
                            <img className="closet-icon" src={next} alt="next"></img>
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