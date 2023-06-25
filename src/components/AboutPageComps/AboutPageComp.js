import React, { useContext, useEffect } from 'react'
import myContext from '../../context/notes/myContext'
import '../../css/AboutPage.css'
import aboutheroimage from '../../images/jigar-profile-pic-1.png'
const AboutComp = () => {

    const context = useContext(myContext);
    const { about, getAbout } = context;

    useEffect(() => {
        getAbout();
    }, [])

    return (
        <>

            <div className="about-page-div">
                <div className="about-page-content">
                    <h2 className='about-page-h2'>About</h2>
                    <pre className="about-page-text" style={{ whiteSpace: 'pre-wrap' }} >{about[0].description}</pre>
                </div>

                <div className="about-hero-image-div">
                    <img src={aboutheroimage} className="img-fluid rounded-start" alt="..." />
                </div>
            </div>

        </>
    )
}

export default AboutComp