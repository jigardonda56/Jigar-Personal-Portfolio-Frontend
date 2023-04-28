import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/notes/myContext'
import blank_profile_pic from '../../images/blank-profile-picture.jpg'
import '../../css/Volunteering.css'

const VolunteerComp = () => {
    const context = useContext(myContext);
    const { volunteer, getVolunteer } = context;

    useEffect(() => {
        getVolunteer();
    }, [])

    const [visibleClass, setvisibleClass] = useState("");
    let breakCondition = false;
    window.addEventListener('scroll', function () {
        var element = document.querySelector('.volunteer-img');
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
            <h2 className='volunteering-h2'>Volunteering</h2>
            <div className='volunteering-background-div'>
                {
                    volunteer.map((data, index) => {
                        return <div key={index} className={"card mb-3 volunteering-div " + visibleClass} >
                            <div className="row g-0">
                                <div className="volunteering-image-div">
                                    <img src={data.image || blank_profile_pic} className="img-fluid rounded-start volunteer-img" alt="..." />
                                </div>
                                <div className="volunteering-text-div">
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

export default VolunteerComp
