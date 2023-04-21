import React from 'react'
import AboutComp from '../DisplayProfileComps/AboutComp'
import CertificationComp from '../DisplayProfileComps/CertificationComp'
import VolunteerComp from '../DisplayProfileComps/VolunteerComp'
import SkillsComp from '../DisplayProfileComps/SkillsComp'
import CoursesComp from '../DisplayProfileComps/CoursesComp'
import ProjectsComp from '../DisplayProfileComps/ProjectsComp'
import AwardsComp from '../DisplayProfileComps/AwardsComp'
import EducationComp from '../DisplayProfileComps/EducationComp'
import HeroImageComp from '../DisplayProfileComps/HeroImageComp'

const Profile = () => {
  return (
    <>

      <HeroImageComp />
      <AboutComp />
      <EducationComp />
      <CertificationComp />
      <VolunteerComp />
      <SkillsComp />
      <CoursesComp />
      <ProjectsComp />
      <AwardsComp />
    </>
  )
}

export default Profile