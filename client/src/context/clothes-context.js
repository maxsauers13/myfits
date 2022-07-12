import { createContext, useState } from "react";
import Axios from 'axios';

const ClothesContext = createContext({
    topFitImage: "",
    bottomFitImage: "",
    topClosetImage: "",
    bottomClosetImage: "",
    topIndex: 0,
    bottomIndex: 0,
    maxTopIndex: 0,
    maxBottomIndex: 0
});

export function ClothesContextProvider(props) {
    const [topFitImage, setTopFitImage] = useState();
    const [bottomFitImage, setBottomFitImage] = useState();
    const [topClosetImage, setTopClosetImage] = useState();
    const [bottomClosetImage, setBottomClosetImage] = useState();
    const [topIndex, setTopIndex] = useState(1);
    const [bottomIndex, setBottomIndex] = useState(1);
    const [maxTopIndex, setMaxTopIndex] = useState();
    const [maxBottomIndex, setMaxBottomIndex] = useState();

    function generateRandomFit(maxIndex, category, setImage) {
        Axios.post('http://localhost:3001/fit', {
            maxIndex: maxIndex,
            owner: localStorage.getItem('token'),
            category: category
        }).then((response) => {
            const imageURL = response.data[0].image;
            setImage(imageURL);
        })
    }

    function getClothesCount(category, setMaxIndex) {
        Axios.post('http://localhost:3001/clothesCount', {
            owner: localStorage.getItem('token'),
            category: category
        }).then((response) => {
            setMaxIndex(response.data[0].totalItems);
        })
    }

    function getClosetClothing(index, category, setImage) {
        Axios.post('http://localhost:3001/clothes', {
            index: index,
            owner: localStorage.getItem('token'),
            category: category
        }).then((response) => {
            const imageURL = response.data[0].image;
            setImage(imageURL);
        })
    }

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

    const context = {
        topFitImage: topFitImage,
        bottomFitImage: bottomFitImage,
        topClosetImage: topClosetImage,
        bottomClosetImage: bottomClosetImage,
        topIndex: topIndex,
        bottomIndex: bottomIndex,
        maxTopIndex: maxTopIndex,
        maxBottomIndex: maxBottomIndex,

        setTopFitImage: setTopFitImage,
        setBottomFitImage: setBottomFitImage,
        setTopClosetImage: setTopClosetImage,
        setBottomClosetImage: setBottomClosetImage,
        setTopIndex: setTopIndex,
        setBottomIndex: setBottomIndex,
        setMaxTopIndex: setMaxTopIndex,
        setMaxBottomIndex: setMaxBottomIndex,

        generateRandomFit: generateRandomFit,
        getClothesCount: getClothesCount,
        getClosetClothing: getClosetClothing,
        handleDecreaseTop: handleDecreaseTop,
        handleIncreaseTop: handleIncreaseTop,
        handleDecreaseBottom: handleDecreaseBottom,
        handleIncreaseBottom: handleIncreaseBottom
    }

    return (
        <ClothesContext.Provider value={context}>
            {props.children}
        </ClothesContext.Provider>
    )
}

export default ClothesContext;