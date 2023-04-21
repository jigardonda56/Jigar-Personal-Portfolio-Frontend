import React, { useContext, useEffect } from 'react'
import myContext from '../../context/notes/myContext'
import '../../css/Hero.css'

const HeroImageComp = () => {
    const context = useContext(myContext);
    const { heroimage, getHero } = context;

    useEffect(() => {
        getHero();
    }, [])
    return (
        <>
            <div className="hero-main-div">

                <div className="hero-divs">
                    <div className="hero-image-div">
                        <img src={heroimage[0].image} className="img-fluid rounded-start" alt="..." />
                    </div>

                    <div className="hero-line-div">
                        <p className="hero-lines-small"><small className="text-muted">{heroimage[0].line1}</small></p>
                        <p className="hero-lines-large">{heroimage[0].line2}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default HeroImageComp
