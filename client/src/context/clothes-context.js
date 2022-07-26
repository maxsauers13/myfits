import { createContext, useState, useEffect } from "react";
import Axios from 'axios';

const ClothesContext = createContext({
    topFitImage: "",
    bottomFitImage: "",
    topClosetImage: "",
    bottomClosetImage: "",
    topClosetNextImage: "",
    topClosetPrevImage: "",
    bottomClosetNextImage: "",
    bottomClosetPrevImage: "",
    topIndex: 0,
    bottomIndex: 0,
    maxTopIndex: 0,
    maxBottomIndex: 0,

    outerFitImage: "",
    shoesFitImage: "",
    outerClosetImage: "",
    shoesClosetImage: "",
    outerClosetNextImage: "",
    outerClosetPrevImage: "",
    shoesClosetNextImage: "",
    shoesClosetPrevImage: "",
    outerIndex: 0,
    shoesIndex: 0,
    maxOuterIndex: 0,
    maxShoesIndex: 0,

    casualCount: 0,
    professionalCount: 0,
    warmCount: 0,
    coldCount: 0,

    topCache: {}
});

export function ClothesContextProvider(props) {
    const [topFitImage, setTopFitImage] = useState();
    const [bottomFitImage, setBottomFitImage] = useState();
    const [topClosetImage, setTopClosetImage] = useState();
    const [bottomClosetImage, setBottomClosetImage] = useState();
    const [topClosetNextImage, setTopClosetNextImage] = useState();
    const [topClosetPrevImage, setTopClosetPrevImage] = useState();
    const [bottomClosetNextImage, setBottomClosetNextImage] = useState();
    const [bottomClosetPrevImage, setBottomClosetPrevImage] = useState();
    const [topIndex, setTopIndex] = useState(0);
    const [bottomIndex, setBottomIndex] = useState(1);
    const [maxTopIndex, setMaxTopIndex] = useState();
    const [maxBottomIndex, setMaxBottomIndex] = useState();

    const [outerFitImage, setOuterFitImage] = useState();
    const [shoesFitImage, setShoesFitImage] = useState();
    const [outerClosetImage, setOuterClosetImage] = useState();
    const [shoesClosetImage, setShoesClosetImage] = useState();
    const [outerClosetNextImage, setOuterClosetNextImage] = useState();
    const [outerClosetPrevImage, setOuterClosetPrevImage] = useState();
    const [shoesClosetNextImage, setShoesClosetNextImage] = useState();
    const [shoesClosetPrevImage, setShoesClosetPrevImage] = useState();
    const [outerIndex, setOuterIndex] = useState(1);
    const [shoesIndex, setShoesIndex] = useState(1);
    const [maxOuterIndex, setMaxOuterIndex] = useState();
    const [maxShoesIndex, setMaxShoesIndex] = useState();

    const [casualCount, setCasualCount] = useState();
    const [professionalCount, setProfessionalCount] = useState();
    const [warmCount, setWarmCount] = useState();
    const [coldCount, setColdCount] = useState();

    const [topCache, setTopCache] = useState({});

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

    function getInventoryCount(input, setMaxIndex) {
        Axios.post('http://localhost:3001/inventoryCount', {
            owner: localStorage.getItem('token'),
            input: input
        }).then((response) => {
            if (input == "shirt") {
                setMaxIndex(response.data[0].totalItems - 1);
            } else {
                setMaxIndex(response.data[0].totalItems);
            }
        })
    }

    function getClosetClothing(index, maxIndex, category, setImage, setNextImage, setPrevImage) {
        if (maxIndex) {
            const nextIndex = (index + 1) % (maxIndex + 1) ? (index + 1) % (maxIndex + 1) : (index + 1) % (maxIndex + 1) + 1;
            const prevIndex = (index - 1) ? (index - 1) : maxIndex;

            Axios.post('http://localhost:3001/clothes', {
                index: index,
                owner: localStorage.getItem('token'),
                category: category
            }).then((response) => {
                const imageURL = response.data[0].image;
                setImage(imageURL);
            })

            Axios.post('http://localhost:3001/clothes', {
                index: nextIndex,
                owner: localStorage.getItem('token'),
                category: category
            }).then((response) => {
                const imageURL = response.data[0].image;
                setNextImage(imageURL);
            })

            Axios.post('http://localhost:3001/clothes', {
                index: prevIndex,
                owner: localStorage.getItem('token'),
                category: category
            }).then((response) => {
                const imageURL = response.data[0].image;
                setPrevImage(imageURL);
            })
        }
    }

    function cacheClothing(index, maxIndex, category, setImage, setNextImage, setPrevImage) {
        if (maxIndex) {
            const nextIndex = (index + 1) % (maxIndex + 1) ? (index + 1) % (maxIndex + 1) : (index + 1) % (maxIndex + 1) + 1;
            const prevIndex = index ? (index - 1) : maxIndex;

            Axios.post('http://localhost:3001/allClothes', {
                owner: localStorage.getItem('token'),
                category: category
            }).then((response) => {
                setTopCache(response.data);

                const imageURL = response.data[0].image;
                const nextImageURL = response.data[nextIndex].image;
                const prevImageURL = response.data[prevIndex].image;
                setImage(imageURL);
                setNextImage(nextImageURL);
                setPrevImage(prevImageURL);
            })
        }
    }

    function handleDecreaseTop() {
        var prevIndex;
        if (topIndex > 0) {
            setTopIndex(topIndex - 1);
            if (topIndex - 1 > 0) {
                prevIndex = topIndex - 2;
            } else {
                prevIndex = maxTopIndex;
            }
        } else {
            setTopIndex(maxTopIndex);
            if (maxTopIndex) {
                prevIndex = maxTopIndex - 1;
            } else {
                prevIndex = 0;
            }
        }

        setTopClosetNextImage(topClosetImage);
        setTopClosetImage(topClosetPrevImage);
        setTopClosetPrevImage(topCache[prevIndex].image);
    }

    function handleIncreaseTop() {
        var nextIndex;
        if (topIndex < maxTopIndex) {
            setTopIndex(topIndex + 1);
            if (topIndex + 1 < maxTopIndex) {
                nextIndex = topIndex + 2;
            } else {
                nextIndex = 0;
            }
        } else {
            setTopIndex(0);
            if (maxTopIndex) {
                nextIndex = 1;
            } else {
                nextIndex = 0;
            }
        }

        setTopClosetNextImage(topCache[nextIndex].image);
        setTopClosetPrevImage(topClosetImage);
        setTopClosetImage(topClosetNextImage);
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

    function handleDecreaseOuter() {
        if (outerIndex > 1) {
            setOuterIndex(outerIndex - 1);
        } else {
            setOuterIndex(maxOuterIndex);
        }
    }

    function handleIncreaseOuter() {
        if (outerIndex < maxOuterIndex) {
            setOuterIndex(outerIndex + 1);
        } else {
            setOuterIndex(1);
        }
    }

    function handleDecreaseShoes() {
        if (shoesIndex > 1) {
            setShoesIndex(shoesIndex - 1);
        } else {
            setShoesIndex(maxShoesIndex);
        }
    }

    function handleIncreaseShoes() {
        if (shoesIndex < maxShoesIndex) {
            setShoesIndex(shoesIndex + 1);
        } else {
            setShoesIndex(1);
        }
    }

    const context = {
        topFitImage: topFitImage,
        bottomFitImage: bottomFitImage,
        topClosetImage: topClosetImage,
        bottomClosetImage: bottomClosetImage,
        topClosetNextImage: topClosetNextImage,
        topClosetPrevImage: topClosetPrevImage,
        bottomClosetNextImage: bottomClosetNextImage,
        bottomClosetPrevImage: bottomClosetPrevImage,
        topIndex: topIndex,
        bottomIndex: bottomIndex,
        maxTopIndex: maxTopIndex,
        maxBottomIndex: maxBottomIndex,
        outerFitImage: outerFitImage,
        shoesFitImage: shoesFitImage,
        outerClosetImage: outerClosetImage,
        shoesClosetImage: shoesClosetImage,
        outerClosetNextImage: outerClosetNextImage,
        outerClosetPrevImage: outerClosetPrevImage,
        shoesClosetNextImage: shoesClosetNextImage,
        shoesClosetPrevImage: shoesClosetPrevImage,
        outerIndex: outerIndex,
        shoesIndex: shoesIndex,
        maxOuterIndex: maxOuterIndex,
        maxShoesIndex: maxShoesIndex,
        casualCount: casualCount,
        professionalCount: professionalCount,
        warmCount: warmCount,
        coldCount: coldCount,
        topCache: topCache,

        setTopFitImage: setTopFitImage,
        setBottomFitImage: setBottomFitImage,
        setTopClosetImage: setTopClosetImage,
        setBottomClosetImage: setBottomClosetImage,
        setTopClosetNextImage: setTopClosetNextImage,
        setTopClosetPrevImage: setTopClosetPrevImage,
        setBottomClosetNextImage: setBottomClosetNextImage,
        setBottomClosetPrevImage: setBottomClosetPrevImage,
        setTopIndex: setTopIndex,
        setBottomIndex: setBottomIndex,
        setMaxTopIndex: setMaxTopIndex,
        setMaxBottomIndex: setMaxBottomIndex,
        setOuterFitImage: setOuterFitImage,
        setShoesFitImage: setShoesFitImage,
        setOuterClosetImage: setOuterClosetImage,
        setShoesClosetImage: setShoesClosetImage,
        setOuterClosetNextImage: setOuterClosetNextImage,
        setOuterClosetPrevImage: setOuterClosetPrevImage,
        setShoesClosetNextImage: setShoesClosetNextImage,
        setShoesClosetPrevImage: setShoesClosetPrevImage,
        setOuterIndex: setOuterIndex,
        setShoesIndex: setShoesIndex,
        setMaxOuterIndex: setMaxOuterIndex,
        setMaxShoesIndex: setMaxShoesIndex,
        setCasualCount: setCasualCount,
        setProfessionalCount: setProfessionalCount,
        setWarmCount: setWarmCount,
        setColdCount: setColdCount,
        setTopCache: setTopCache,

        generateRandomFit: generateRandomFit,
        getInventoryCount: getInventoryCount,
        getClosetClothing: getClosetClothing,
        handleDecreaseTop: handleDecreaseTop,
        handleIncreaseTop: handleIncreaseTop,
        handleDecreaseBottom: handleDecreaseBottom,
        handleIncreaseBottom: handleIncreaseBottom,
        handleDecreaseOuter: handleDecreaseOuter,
        handleIncreaseOuter: handleIncreaseOuter,
        handleDecreaseShoes: handleDecreaseShoes,
        handleIncreaseShoes: handleIncreaseShoes,
        cacheClothing: cacheClothing
    }

    return (
        <ClothesContext.Provider value={context}>
            {props.children}
        </ClothesContext.Provider>
    )
}

export default ClothesContext;