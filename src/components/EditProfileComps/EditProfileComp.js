import React, { useEffect } from 'react'
import AddEditDelAwardComp from './AddEditDelAwardsComp';
import AddEditDelCertificationComp from './AddEditDelCertificationComp';
import AddEditDelCourseComp from './AddEditDelCourseComp';
import AddEditDelEducationComp from './AddEditDelEducationComp';
import AddEditDelProjectComp from './AddEditDelProjectsComp';
import AddEditDelSkillsComp from './AddEditDelSkillsComp';
import AddEditDelVolunteerComp from './AddEditDelVolunteerComp';
import EditAboutComp from './EditAboutComp';
import { useNavigate } from 'react-router-dom'
import AddEditDelHeroImageComp from './AddEditDelHeroImageComp';

const EditProfileComp = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {

        }
        else {
            navigate("/login");
        }
    }, [])
    return (
        <>
            <AddEditDelHeroImageComp />
            <EditAboutComp />
            <AddEditDelEducationComp />
            <AddEditDelCertificationComp />
            <AddEditDelVolunteerComp />
            <AddEditDelSkillsComp />
            <AddEditDelCourseComp />
            <AddEditDelProjectComp />
            <AddEditDelAwardComp />
        </>
    )
}

export default EditProfileComp
