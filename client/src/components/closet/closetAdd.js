import React, { useState } from 'react'
import Axios from 'axios'
import Card from '../card/card'
import './closetStyles.scss'

export default function ClosetAdd() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [category, setCategory] = useState("shirt");
    const [style, setStyle] = useState("any");
    const [weather, setWeather] = useState("any");

    const closetAdd = async () => {
        const formData = new FormData()
        formData.append('file', file);
        formData.append('filename', fileName);
        formData.append('owner', localStorage.getItem('token'));
        formData.append('category', category);
        formData.append('style', style);
        formData.append('weather', weather);

        try {
            const res = await Axios.post(
                "http://localhost:3001/closetAdd",
                formData
            );
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="wrapper">
            <Card >
                <div className="title">
                    Add to Closet
                </div>
                <div className="form" >
                    <div className="form-input">
                        <label>Submit Image:</label><br></br>
                        <div className="submit-image">
                            <input className="submit-image-button" type="file" onChange={(e) => {
                                setFile(e.target.files[0])
                                setFileName(e.target.files[0].name)
                            }} />
                        </div>
                    </div>
                    <div className="form-input">
                        <label>Category:</label><br></br>
                        <select className="select" value={category} onChange={(e) => {
                            setCategory(e.target.value)
                        }}>
                            <option value="shirt">Shirt</option>
                            <option value="pants">Pants</option>
                            <option value="outerwear">Outerwear</option>
                            <option value="shoes">Shoes</option>
                        </select>
                    </div>
                    <div className="form-input">
                        <label>Style:</label><br></br>
                        <select className="select" value={style} onChange={(e) => {
                            setStyle(e.target.value)
                        }}>
                            <option value="any">Any</option>
                            <option value="casual">Casual</option>
                            <option value="professional">Professional</option>
                        </select>
                    </div>
                    <div className="form-input">
                        <label>Weather Worn In:</label><br></br>
                        <select className="select" value={weather} onChange={(e) => {
                            setWeather(e.target.value)
                        }}>
                            <option value="any">Any</option>
                            <option value="warm">Warm</option>
                            <option value="cold">Cold</option>
                        </select>
                    </div>
                    <button className="button" onClick={closetAdd}>Submit</button>
                </div>
            </Card>
        </div>
    )
}