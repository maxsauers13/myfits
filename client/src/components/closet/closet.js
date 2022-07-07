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
    const [bottomImage, setBottomImage] = useState();
    const [topIndex, setTopIndex] = useState(1);
    const [bottomIndex, setBottomIndex] = useState(1);
    const [maxTopIndex, setMaxTopIndex] = useState();
    const [maxBottomIndex, setMaxBottomIndex] = useState();

    useEffect(() => {
        Axios.post('http://localhost:3001/clothesCount', {
            owner: localStorage.getItem('token'),
            category: "shirt"
        }).then((response) => {
            setMaxTopIndex(response.data[0].totalItems);
        })
    }, [])

    useEffect(() => {
        Axios.post('http://localhost:3001/clothes', {
            index: topIndex,
            owner: localStorage.getItem('token'),
            category: "shirt"
        }).then((response) => {
            const imageURL = response.data[0].image;
            setTopImage(imageURL);
        })
    }, [topIndex])

    useEffect(() => {
        Axios.post('http://localhost:3001/clothesCount', {
            owner: localStorage.getItem('token'),
            category: "pants"
        }).then((response) => {
            setMaxBottomIndex(response.data[0].totalItems);
        })
    }, [])

    useEffect(() => {
        Axios.post('http://localhost:3001/clothes', {
            index: bottomIndex,
            owner: localStorage.getItem('token'),
            category: "pants"
        }).then((response) => {
            const imageURL = response.data[0].image;
            setBottomImage(imageURL);
        })
    }, [bottomIndex])

    function handleDecreaseTop() {
        if (topIndex > 1) {
            setTopIndex(topIndex - 1);
        } else {
            setTopIndex(maxTopIndex);
        }
    }

    function handleIncreaseTop() {
        if (topIndex < maxTopIndex) {
            setTopIndex(topIndex + 1);
        } else {
            setTopIndex(1);
        }
    }

    function handleDecreaseBottom() {
        if (bottomIndex > 1) {
            setBottomIndex(bottomIndex - 1);
        } else {
            setBottomIndex(maxBottomIndex);
        }
    }

    function handleIncreaseBottom() {
        if (bottomIndex < maxBottomIndex) {
            setBottomIndex(bottomIndex + 1);
        } else {
            setBottomIndex(1);
        }
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
                            <img className="closet-icon" src={previous} alt="previous" onClick={handleDecreaseBottom}></img>
                            <img className="clothes-img closet-img" src={bottomImage} alt="pants"></img>
                            <img className="closet-icon" src={next} alt="next" onClick={handleIncreaseBottom}></img>
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