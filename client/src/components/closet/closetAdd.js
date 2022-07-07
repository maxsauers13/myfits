import React, { useState } from 'react'
import Axios from 'axios'
import Card from '../card/card'
import './closetStyles.scss'

export default function ClosetAdd() {
    const [file, setfile] = useState();
    const [fileName, setFileName] = useState("");
    const [category, setCategory] = useState("shirt");
    const [style, setStyle] = useState("casual");

    const closetAdd = async () => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('filename', fileName)

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
            <Card>
                <div className="title">
                    Add to Closet
                </div>
                <div className="form" >
                    <div className="form-input">
                        <label>Submit file:</label><br></br>
                        <input type="file" onChange={(e) => {
                            setfile(e.target.files[0])
                            setFileName(e.target.files[0].name)
                        }} />
                    </div>
                    <div className="form-input">
                        <label>Select Category:</label><br></br>
                        <select value={category} onChange={(e) => {
                            setCategory(e.target.value)
                        }}>
                            <option value="shirt">Shirt</option>
                            <option value="pants">Pants</option>
                        </select>
                    </div>
                    <div className="form-input">
                        <label>Select Style:</label><br></br>
                        <select value={style} onChange={(e) => {
                            setStyle(e.target.value)
                        }}>
                            <option value="casual">Casual</option>
                            <option value="professional">Professional</option>
                        </select>
                    </div>
                    <button onClick={closetAdd}>Submit</button>
                </div>
            </Card>
        </div>
    )
}