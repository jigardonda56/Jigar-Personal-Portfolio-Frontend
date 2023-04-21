import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/notes/myContext'
import blank_profile_pic from '../../images/blank-profile-picture.jpg'
import '../../css/Certification.css'

const CertificationComp = () => {

    const context = useContext(myContext);
    const { certification, getCertification } = context;

    useEffect(() => {
        getCertification();
    }, [])

    const [visibleClass, setvisibleClass] = useState("");
    let breakCondition = false;
    window.addEventListener('scroll', function () {
        var element = document.querySelector('.certification-text-div');
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
            <h2 className='certification-h2'>Take a look at my certifications</h2>
            <div className='certification-background-div'>
                {
                    certification.map((data, index) => {
                        return <div key={index} className={"card mb-3 certification-div " + visibleClass} >
                            <div className="row g-0">
                                <div className="certification-image-div">
                                    <img src={data.image || blank_profile_pic} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="certification-text-div">
                                    <h5 className="card-title">{data.title}</h5>
                                    <p className="card-text"><small className="text-muted">{data.subtitle}</small></p>
                                    <p className="card-text"><small className="text-muted">{data.date}</small></p>
                                    <pre className="card-text" style={{ whiteSpace: 'pre-wrap' }} >{data.description}</pre>
                                </div>
                            </div>
                        </div>;
                    })
                }
            </div>
        </>
    )
}

export default CertificationComp