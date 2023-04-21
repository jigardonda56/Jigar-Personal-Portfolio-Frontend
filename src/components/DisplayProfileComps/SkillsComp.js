import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/notes/myContext'
import blank_profile_pic from '../../images/blank-profile-picture.jpg'
import '../../css/Skills.css'

const SkillsComp = () => {
    const context = useContext(myContext);
    const { skills, getSkills } = context;

    useEffect(() => {
        getSkills();
    }, []);

    const [visibleClass, setvisibleClass] = useState("");
    let breakCondition = false;
    window.addEventListener('scroll', function () {
        var element = document.querySelector('.skill-div');
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
            <h2 className='skills-h2'>Skills</h2>
            <div className='skills-background-div'>
                {skills.map((data, index) => {
                    return <div key={index} className={"card mb-3 skill-div " + visibleClass} >
                        <div className="row g-0 skill-div-2">
                            <div className="col-md-2 skill-image">
                                <img src={data.image || blank_profile_pic} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-10">
                                <li className="list-group-item">{data.skill}</li>
                            </div>
                        </div>
                    </div>;
                })}
            </div>
        </>
    )
}

export default SkillsComp
