import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Card from '../card/card'
import './closetStyles.scss'
import pants from '../../img/pants.jpeg'
import previous from '../../img/previous.png'
import next from '../../img/next.png'

export default function Closet(props) {
    const [topImage, setTopImage] = useState();
    const [topIndex, setTopIndex] = useState(1);
    const [maxtopIndex, setMaxTopIndex] = useState();

    useEffect(() => {
        Axios.post('http://localhost:3001/clothesSum', {
            owner: localStorage.getItem('token')
        }).then((response) => {
            console.log(response);
            setMaxTopIndex(response.data[0].totalItems);
        })
    }, [])

    useEffect(() => {
        Axios.post('http://localhost:3001/clothes', {
            index: topIndex,
            owner: localStorage.getItem('token')
        }).then((response) => {
            console.log(response);
            const imageURL = response.data[0].image;
            setTopImage(imageURL);
        })
    }, [topIndex])

    function handleDecreaseTop() {
        if (topIndex > 1) {
            setTopIndex(topIndex - 1);
        } else {
            setTopIndex(maxtopIndex);
        }
        console.log(topIndex);
    }

    function handleIncreaseTop() {
        if (topIndex < maxtopIndex) {
            setTopIndex(topIndex + 1);
        } else {
            setTopIndex(1);
        }
        console.log(topIndex);
    }

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
                            <img className="closet-icon" src={previous} alt="previous" onClick={handleDecreaseTop}></img>
                            <img className="clothes-img closet-img" src={topImage} alt="shirt"></img>
                            <img className="closet-icon" src={next} alt="next" onClick={handleIncreaseTop}></img>
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