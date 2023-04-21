import { useState } from "react";
import myContext from "./myContext";

const NoteState = (props) => {

    const host = "https://jigar-donda-backend.onrender.com";

    const Initial = [{}];

    const [heroimage, setHeroImage] = useState(Initial);
    const [about, setAbout] = useState(Initial);
    const [education, setEducation] = useState(Initial);
    const [certification, setCertification] = useState(Initial);
    const [volunteer, setVolunteer] = useState(Initial);
    const [skills, setSkills] = useState(Initial);
    const [course, setCourse] = useState(Initial);
    const [project, setProject] = useState(Initial);
    const [award, setAward] = useState(Initial);

    //Get Hero Details
    const getHero = async () => {

        const response = await fetch(`${host}/api/details/gethero`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const aboutjson = await response.json();

        setHeroImage(aboutjson);
    }

    //Add a Hero
    const addHero = async (image, line1, line2) => {

        const response = await fetch(`${host}/api/details/addhero`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, line1, line2 })
        });


        const herojson = await response.json();
        setHeroImage(heroimage.concat(herojson));
    }

    //Edit a Hero Details
    const editHero = async (id, image, line1, line2) => {

        const response = await fetch(`${host}/api/details/updatehero/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, line1, line2 })
        });

        const aboutjson = await response.json();
        console.log(aboutjson);

        //logic to edit notes in client
        let newHero = JSON.parse(JSON.stringify(heroimage));

        for (let index = 0; index < newHero.length; index++) {
            const element = newHero[index];

            if (element._id === id) {
                newHero[index].image = image;
                newHero[index].line1 = line1;
                newHero[index].line2 = line2;
                break;
            }
        }
        setHeroImage(newHero);
    }
    //************************************************** */

    //Get about
    const getAbout = async () => {

        const response = await fetch(`${host}/api/details/getaboutdetails`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const aboutjson = await response.json();

        setAbout(aboutjson);
    }

    //Edit a about
    const editAbout = async (id, description) => {

        const response = await fetch(`${host}/api/details/updateaboutdetails/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ description })
        });

        const aboutjson = await response.json();
        console.log(aboutjson);

        //logic to edit notes in client
        let newAbout = JSON.parse(JSON.stringify(about));

        for (let index = 0; index < newAbout.length; index++) {
            const element = newAbout[index];

            if (element._id === id) {
                newAbout[index].description = description;
                break;
            }
        }
        setAbout(newAbout);
    }
    //************************************************** */

    //get all education
    const getEducation = async () => {

        const response = await fetch(`${host}/api/details/geteducationdetails`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const educationjson = await response.json();

        setEducation(educationjson);
    }

    //Add a education
    const addEducation = async (image, title, subtitle, date, description) => {

        const response = await fetch(`${host}/api/details/addeducation`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, title, subtitle, date, description })
        });


        const educationjson = await response.json();
        setEducation(education.concat(educationjson));
    }

    //Delete a Education.........................................................
    const deleteEducation = async (id) => {

        const response = await fetch(`${host}/api/details/deleteeducation/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });

        const educationjson = await response.json();


        const newEducation = education.filter((edu) => { return edu._id !== id })
        setEducation(newEducation);
    }

    //Edit a Education.........................................................
    const editEducation = async (id, image, title, subtitle, date, description) => {

        const response = await fetch(`${host}/api/details/updateeducationdetails/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, title, subtitle, date, description })
        });

        const educationjson = await response.json();
        console.log(educationjson);

        //logic to edit notes in client
        let newEducation = JSON.parse(JSON.stringify(education));

        for (let index = 0; index < newEducation.length; index++) {
            const element = newEducation[index];

            if (element._id === id) {
                newEducation[index].image = image;
                newEducation[index].title = title;
                newEducation[index].subtitle = subtitle;
                newEducation[index].date = date;
                newEducation[index].description = description;
                break;
            }
        }
        setEducation(newEducation);
    }
    //************************************************** */


    //get all certification
    const getCertification = async () => {

        const response = await fetch(`${host}/api/details/getallcertificationdetails`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const certificationjson = await response.json();

        setCertification(certificationjson);
    }

    //Add a certification
    const addCertification = async (image, title, subtitle, date, description) => {

        const response = await fetch(`${host}/api/details/addcertification`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, title, subtitle, date, description })
        });


        const certificationjson = await response.json();
        setCertification(certification.concat(certificationjson));
    }

    //Delete a certification.........................................................
    const deleteCertification = async (id) => {

        const response = await fetch(`${host}/api/details/deletecertification/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });

        const certificationjson = await response.json();
        console.log(certificationjson);

        const newCertification = certification.filter((cer) => { return cer._id !== id })
        setCertification(newCertification);
    }

    //Edit a certification.........................................................
    const editCertification = async (id, image, title, subtitle, date, description) => {

        const response = await fetch(`${host}/api/details/updatecertification/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, title, subtitle, date, description })
        });

        const certificationjson = await response.json();


        //logic to edit notes in client
        let newCertification = JSON.parse(JSON.stringify(certification));

        for (let index = 0; index < newCertification.length; index++) {
            const element = newCertification[index];

            if (element._id === id) {
                newCertification[index].image = image;
                newCertification[index].title = title;
                newCertification[index].subtitle = subtitle;
                newCertification[index].date = date;
                newCertification[index].description = description;
                break;
            }
        }
        setCertification(newCertification);
    }
    //************************************************** */


    //get all volunteering
    const getVolunteer = async () => {

        const response = await fetch(`${host}/api/details/getallvolunteerdetails`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const volunteeringjson = await response.json();

        setVolunteer(volunteeringjson);
    }

    //Add a volunteering
    const addVolunteer = async (image, title, subtitle, date, description) => {

        const response = await fetch(`${host}/api/details/addvolunteer`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, title, subtitle, date, description })
        });


        const volunteeringjson = await response.json();
        setVolunteer(volunteer.concat(volunteeringjson));
    }

    //Delete a volunteering.........................................................
    const deleteVolunteer = async (id) => {

        const response = await fetch(`${host}/api/details/deletevolunteer/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });

        const volunteeringjson = await response.json();
        console.log(volunteeringjson);

        const newVolunteering = volunteer.filter((vol) => { return vol._id !== id })
        setVolunteer(newVolunteering);
    }

    //Edit a volunteering.........................................................
    const editVolunteer = async (id, image, title, subtitle, date, description) => {

        const response = await fetch(`${host}/api/details/updatevolunteer/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, title, subtitle, date, description })
        });

        const volunteeringjson = await response.json();
        console.log(volunteeringjson);

        //logic to edit notes in client
        let newVolunteering = JSON.parse(JSON.stringify(volunteer));

        for (let index = 0; index < newVolunteering.length; index++) {
            const element = newVolunteering[index];

            if (element._id === id) {
                newVolunteering[index].image = image;
                newVolunteering[index].title = title;
                newVolunteering[index].subtitle = subtitle;
                newVolunteering[index].date = date;
                newVolunteering[index].description = description;
                break;
            }
        }
        setVolunteer(newVolunteering);
    }
    //************************************************** */


    //get all skills
    const getSkills = async () => {

        const response = await fetch(`${host}/api/details/getallskilldetails`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
        const skillsjson = await response.json();

        setSkills(skillsjson);
    }

    //Add a skills
    const addSkills = async (image, skill) => {

        const response = await fetch(`${host}/api/details/addskill`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, skill })
        });

        const skillsjson = await response.json();
        setSkills(skills.concat(skillsjson));
    }

    //Delete a skills.........................................................
    const deleteSkills = async (id) => {

        const response = await fetch(`${host}/api/details/deleteskill/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });

        const skillsjson = await response.json();
        console.log(skillsjson);

        const newSkills = skills.filter((skl) => { return skl._id !== id })
        setSkills(newSkills);
    }

    //Edit a skills.........................................................
    const editSkills = async (id, image, skill) => {

        const response = await fetch(`${host}/api/details/updateskill/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, skill })
        });

        const skillsjson = await response.json();
        console.log(skillsjson);

        //logic to edit notes in client
        let newSkill = JSON.parse(JSON.stringify(skills));

        for (let index = 0; index < newSkill.length; index++) {
            const element = newSkill[index];

            if (element._id === id) {
                newSkill[index].image = image;
                newSkill[index].skill = skill;
                break;
            }
        }
        setSkills(newSkill);
    }
    //************************************************** */

    //get all course
    const getCourse = async () => {

        const response = await fetch(`${host}/api/details/getallcoursedetails`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const coursejson = await response.json();

        setCourse(coursejson);
    }
    //Add a course
    const addCourse = async (image, title, coursecode, associatedwith) => {

        const response = await fetch(`${host}/api/details/addcourse`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, title, coursecode, associatedwith })
        });


        const coursejson = await response.json();
        setCourse(course.concat(coursejson));
    }

    //Delete a Course.........................................................
    const deleteCourse = async (id) => {

        const response = await fetch(`${host}/api/details/deletecourse/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });

        const coursejson = await response.json();
        console.log(coursejson);

        const newCourse = course.filter((cou) => { return cou._id !== id })
        setCourse(newCourse);
    }

    //Edit a Course.........................................................
    const editCourse = async (id, image, title, coursecode, associatedwith) => {

        const response = await fetch(`${host}/api/details/updatecourse/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, title, coursecode, associatedwith })
        });

        const coursejson = await response.json();
        console.log(coursejson);

        //logic to edit notes in client
        let newCourse = JSON.parse(JSON.stringify(course));

        for (let index = 0; index < newCourse.length; index++) {
            const element = newCourse[index];

            if (element._id === id) {
                newCourse[index].image = image;
                newCourse[index].title = title;
                newCourse[index].coursecode = coursecode;
                newCourse[index].associatedwith = associatedwith;
                break;
            }
        }
        setCourse(newCourse);
    }
    //************************************************** */


    //get all Project
    const getProject = async () => {

        const response = await fetch(`${host}/api/details/getallprojectdetails`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const projectjson = await response.json();

        setProject(projectjson);
    }

    //Add a Project
    const addProject = async (image, title, date, description) => {

        const response = await fetch(`${host}/api/details/addproject`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, title, date, description })
        });


        const projectjson = await response.json();
        setProject(project.concat(projectjson));
    }

    //Delete a Project.........................................................
    const deleteProject = async (id) => {

        const response = await fetch(`${host}/api/details/deleteproject/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });

        const projectjson = await response.json();
        console.log(projectjson);

        const newProject = project.filter((pro) => { return pro._id !== id })
        setProject(newProject);
    }

    //Edit a Project.........................................................
    const editProject = async (id, image, title, date, description) => {

        const response = await fetch(`${host}/api/details/updateproject/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, title, date, description })
        });

        const projectjson = await response.json();
        console.log(projectjson);

        //logic to edit notes in client
        let newProject = JSON.parse(JSON.stringify(project));

        for (let index = 0; index < newProject.length; index++) {
            const element = newProject[index];

            if (element._id === id) {
                newProject[index].image = image;
                newProject[index].title = title;
                newProject[index].date = date;
                newProject[index].description = description;
                break;
            }
        }
        setProject(newProject);
    }
    //************************************************** */


    //get all awards
    const getAward = async () => {

        const response = await fetch(`${host}/api/details/getallawarddetails`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
        const awardjson = await response.json();

        setAward(awardjson);
    }

    //Add a awards
    const addAward = async (image, title, subtitle, description, associatedwith) => {

        const response = await fetch(`${host}/api/details/addaward`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, title, subtitle, description, associatedwith })
        });


        const awardjson = await response.json();
        setAward(award.concat(awardjson));
    }

    //Delete a awards.........................................................
    const deleteAward = async (id) => {

        const response = await fetch(`${host}/api/details/deleteaward/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });

        const awardjson = await response.json();
        console.log(awardjson);

        const newAward = award.filter((awa) => { return awa._id !== id })
        setAward(newAward);
    }

    //Edit a awards.........................................................
    const editAward = async (id, image, title, subtitle, description, associatedwith) => {

        const response = await fetch(`${host}/api/details/updateaward/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ image, title, subtitle, description, associatedwith })
        });

        const awardjson = await response.json();
        console.log(awardjson);

        //logic to edit notes in client
        let newAward = JSON.parse(JSON.stringify(award));

        for (let index = 0; index < newAward.length; index++) {
            const element = newAward[index];

            if (element._id === id) {
                newAward[index].image = image;
                newAward[index].title = title;
                newAward[index].subtitle = subtitle;
                newAward[index].associatedwith = associatedwith;
                newAward[index].description = description;
                break;
            }
        }
        setAward(newAward);
    }
    //************************************************** */


    return (
        <myContext.Provider value={{ heroimage, getHero, addHero, editHero, about, getAbout, editAbout, education, getEducation, addEducation, deleteEducation, editEducation, certification, addCertification, deleteCertification, editCertification, getCertification, volunteer, addVolunteer, deleteVolunteer, editVolunteer, getVolunteer, skills, addSkills, deleteSkills, editSkills, getSkills, course, addCourse, deleteCourse, editCourse, getCourse, project, getProject, addProject, deleteProject, editProject, award, getAward, addAward, deleteAward, editAward }}>
            {props.children}
        </myContext.Provider>
    )
}

export default NoteState;