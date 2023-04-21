import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/notes/myContext'
import blank_profile_pic from '../../images/blank-profile-picture.jpg'
import '../../css/Awards.css'

const AwardsComp = () => {
    const context = useContext(myContext);
    const { award, getAward } = context;

    useEffect(() => {
        getAward();
    }, [])

    const [visibleClass, setvisibleClass] = useState("");
    let breakCondition = false;
    window.addEventListener('scroll', function () {
        var element = document.querySelector('.award-text-div');
        var position = element.getBoundingClientRect();
        // checking for partial visibility
        if (position.top >= 0 && position.bottom <= window.innerHeight && !breakCondition) {
            breakCondition = true
        }
        if (breakCondition === true) {
            if (visibleClass === "") {
                setvisibleClass("visible")
            }
        }
    });
    return (
        <>
            <h2 className='award-h2'>Awards</h2>
            <div className='award-background-div'>
                {
                    award.map((data, index) => {
                        return <div key={index} className={"card mb-3 award-div " + visibleClass} >
                            <div className="row g-0">
                                <div className="award-image-div">
                                    <img src={data.image || blank_profile_pic} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="award-text-div">
                                    <h5 className="card-title">{data.title}</h5>
                                    <p className="card-text"><small className="text-muted">{data.subtitle}</small></p>
                                    <pre className="card-text" style={{ whiteSpace: 'pre-wrap' }} >{data.description}</pre>
                                    <pre className="card-text" style={{ whiteSpace: 'pre-wrap' }} >{data.associatedwith}</pre>
                                </div>
                            </div>
                        </div>;
                    })
                }
            </div>
        </>
    )
}

export default AwardsComp
