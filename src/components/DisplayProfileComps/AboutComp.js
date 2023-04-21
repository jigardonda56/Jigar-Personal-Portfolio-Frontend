import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/notes/myContext'
import '../../css/About.css'
const AboutComp = () => {

    const context = useContext(myContext);
    const { about, getAbout } = context;
    const [dynamicClass, setdynamicClass] = useState("");
    const [btnText, setbtnText] = useState("...see more");
    const [hideBtn, sethideBtn] = useState("");


    useEffect(() => {
        getAbout();
    }, [])


    //to set class name dynamically
    const readMoreBtnClick = () => {
        if (dynamicClass === "") {
            setdynamicClass("expended")
            sethideBtn('btn-hide')
        } else {
            setdynamicClass("")
            setbtnText('...see more')
        }
    }
    return (
        <>

            <div className="about-div">
                <h2 className='about-h2'>About</h2>
                <pre className={"about-text " + dynamicClass} style={{ whiteSpace: 'pre-wrap' }} >{about[0].description}</pre>
                <button className={"read-more-less btn btn-link " + hideBtn} onClick={readMoreBtnClick}>{btnText}</button>
            </div>

        </>
    )
}

export default AboutComp