import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/notes/myContext'
import blank_profile_pic from '../../images/blank-profile-picture.jpg'
import '../../css/Course.css'

const CoursesComp = () => {

    const context = useContext(myContext);
    const { course, getCourse } = context;

    useEffect(() => {
        getCourse();
    }, [])

    const [visibleClass, setvisibleClass] = useState("");
    let breakCondition = false;
    window.addEventListener('scroll', function () {
        var element = document.querySelector('.course-text-div');
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
            <h2 className='course-h2'>Courses</h2>
            <div className='course-background-div'>
                {
                    course.map((data, index) => {
                        return <div key={index} className={"card mb-3 course-div " + visibleClass} >
                            <div className="row g-0">
                                <div className="course-image-div">
                                    <img src={data.image || blank_profile_pic} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="course-text-div">
                                    <h5 className="card-title">{data.title}</h5>
                                    <p className="card-text"><small className="text-muted">{data.coursecode}</small></p>
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

export default CoursesComp
