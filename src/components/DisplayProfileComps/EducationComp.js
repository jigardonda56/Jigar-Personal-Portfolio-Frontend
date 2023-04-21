import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/notes/myContext'
import blank_profile_pic from '../../images/blank-profile-picture.jpg'
import '../../css/Education.css'

const EducationComp = () => {
    const context = useContext(myContext);
    const { education, getEducation } = context;
    
    useEffect(() => {
        getEducation();
    }, [])
    
    
    const [visibleClass, setvisibleClass] = useState("");
    let breakCondition = false;
    window.addEventListener('scroll', function () {
        var element = document.querySelector('.education-text-div');
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
            <h2 className='education-h2'>Education</h2>
            <div className='education-background-div'>
                {
                    education.map((data, index) => {
                        return <div key={index} className={"card mb-3 education-main-div " + visibleClass}>
                            <div className="education-div2">
                                <div className="education-image-div">
                                    <img src={data.image || blank_profile_pic} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="education-text-div">
                                    <h5 className="card-title">{data.title}</h5>
                                    <p className="card-text"><small className="text-muted">{data.subtitle}</small></p>
                                    <p className="card-text"><small className="text-muted">{data.date}</small></p>
                                    <pre className="card-text education-desc" style={{ whiteSpace: 'pre-wrap' }} >{data.description}</pre>
                                </div>
                            </div>
                        </div>;
                    })
                }
            </div>
        </>
    )

}

export default EducationComp