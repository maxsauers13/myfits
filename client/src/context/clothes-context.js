import { createContext, useState } from "react";
import Axios from 'axios';
import question from '../img/question.png';

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
    coldCount: 0
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
    const [topIndex, setTopIndex] = useState(1);
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

    const [styleSelect, setStyleSelect] = useState("any");
    const [weatherSelect, setWeatherSelect] = useState("any");
    const [topToggle, setTopToggle] = useState(false);
    const [bottomToggle, setBottomToggle] = useState(false);
    const [outerToggle, setOuterToggle] = useState(false);
    const [shoesToggle, setShoesToggle] = useState(false);

    function generateFit(category, style, weather, setImage) {
        Axios.post('http://localhost:3001/fit', {
            owner: localStorage.getItem('token'),
            category: category,
            style: style,
            weather: weather
        }).then((response) => {
            if (response.data.length > 0) {
                const index = Math.floor((Math.random() * response.data.length));
                const imageURL = response.data[index].image;
                setImage(imageURL);
            } else {
                setImage(question);
            }
        })
    }

    function generateRandomFit(maxIndex, category, setImage) {
        Axios.post('http://localhost:3001/randomFit', {
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
            setMaxIndex(response.data[0].totalItems);
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

    function handleDecreaseTop() {
        setTopClosetPrevImage();
        if (topIndex > 1) {
            setTopIndex(topIndex - 1);
        } else {
            setTopIndex(maxTopIndex);
        }
    }

    function handleIncreaseTop() {
        setTopClosetNextImage();
        if (topIndex < maxTopIndex) {
            setTopIndex(topIndex + 1);
        } else {
            setTopIndex(1);
        }
    }

    function handleDecreaseBottom() {
        setBottomClosetPrevImage();
        if (bottomIndex > 1) {
            setBottomIndex(bottomIndex - 1);
        } else {
            setBottomIndex(maxBottomIndex);
        }
    }

    function handleIncreaseBottom() {
        setBottomClosetNextImage();
        if (bottomIndex < maxBottomIndex) {
            setBottomIndex(bottomIndex + 1);
        } else {
            setBottomIndex(1);
        }
    }

    function handleDecreaseOuter() {
        setOuterClosetPrevImage();
        if (outerIndex > 1) {
            setOuterIndex(outerIndex - 1);
        } else {
            setOuterIndex(maxOuterIndex);
        }
    }

    function handleIncreaseOuter() {
        setOuterClosetNextImage();
        if (outerIndex < maxOuterIndex) {
            setOuterIndex(outerIndex + 1);
        } else {
            setOuterIndex(1);
        }
    }

    function handleDecreaseShoes() {
        setShoesClosetPrevImage();
        if (shoesIndex > 1) {
            setShoesIndex(shoesIndex - 1);
        } else {
            setShoesIndex(maxShoesIndex);
        }
    }

    function handleIncreaseShoes() {
        setShoesClosetNextImage();
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
        styleSelect: styleSelect,
        weatherSelect: weatherSelect,
        topToggle: topToggle,
        bottomToggle: bottomToggle,
        outerToggle: outerToggle,
        shoesToggle: shoesToggle,

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
        setStyleSelect: setStyleSelect,
        setWeatherSelect: setWeatherSelect,
        setTopToggle: setTopToggle,
        setBottomToggle: setBottomToggle,
        setOuterToggle: setOuterToggle,
        setShoesToggle: setShoesToggle,

        generateFit: generateFit,
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
        handleIncreaseShoes: handleIncreaseShoes
    }

    return (
        <ClothesContext.Provider value={context}>
            {props.children}
        </ClothesContext.Provider>
    )
}

export default ClothesContext;