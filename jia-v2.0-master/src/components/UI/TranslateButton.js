import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';

import "./TranslateButton.css"

let lang = localStorage.getItem("language")
let colour = localStorage.getItem("colour")

if (lang == null) {
    localStorage.setItem("language", "English")
}

if (colour == null) {
    localStorage.setItem("colour", "green")
}

// console.log(localStorage)
// console.log(lang)

const TranslateButton = () => {
    const [status, setStatus] = useState(lang)

    const handleClickEN = () => {
        localStorage.setItem("language", "English")
        localStorage.setItem("colour", "green")
        setStatus('English')
        window.location.reload()
    }

    const handleClickFR = () => {
        localStorage.setItem("language", "French")
        localStorage.setItem("colour", "blue")
        setStatus('French')
        window.location.reload()
    }

    return (
        <div className='translate-btn'>
            <div className="translate-btn-container">
                {status === 'English'  && <Button className="translate-btn-english" onClick={handleClickFR}>Français</Button>}
                {status === 'French' && <Button className="translate-btn-french" onClick={handleClickEN}>English</Button>}
            </div>
        </div>
    );
}

export default TranslateButton