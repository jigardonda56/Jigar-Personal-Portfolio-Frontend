import React, { useContext } from 'react'
import AboutComp from '../DisplayProfileComps/AboutComp'
import CertificationComp from '../DisplayProfileComps/CertificationComp'
import VolunteerComp from '../DisplayProfileComps/VolunteerComp'
import SkillsComp from '../DisplayProfileComps/SkillsComp'
import CoursesComp from '../DisplayProfileComps/CoursesComp'
import ProjectsComp from '../DisplayProfileComps/ProjectsComp'
import AwardsComp from '../DisplayProfileComps/AwardsComp'
import EducationComp from '../DisplayProfileComps/EducationComp'
import HeroImageComp from '../DisplayProfileComps/HeroImageComp'

import * as ReactBootStrap from 'react-bootstrap';
import myContext from '../../context/notes/myContext'

const Profile = () => {

  const context = useContext(myContext);
  const { GetRequestSuccess } = context;

  console.log("getRequestSuccess==" , GetRequestSuccess);
  return (
<>
    { GetRequestSuccess === true ? (<><HeroImageComp /><AboutComp /><EducationComp /><CertificationComp /><VolunteerComp /><SkillsComp /><CoursesComp /><ProjectsComp /><AwardsComp /></>) : (<ReactBootStrap.Spinner animation="border" />)}
</>
  )
}

export default Profile