import React, { useContext, useRef, useState, useEffect } from 'react'
import blank_profile_pic from '../../images/blank-profile-picture.jpg'
import myContext from '../../context/notes/myContext'

const AddEditDelSkillssComp = () => {
    const context = useContext(myContext);
    const { skills, addSkills, deleteSkills, editSkills, getSkills } = context;

    useEffect(() => {
        getSkills();
    }, [])

    // Add Skills----------------------------------------------------------------------------
    const clickAddSkillsModelOpenBtn = useRef(null);
    const clickAddSkillsModelCloseBtn = useRef(null);
    const [addskills, setAddSkills] = useState({ addskills: "" })
    const [addskillimage, setAddSkillImage] = useState({ addimage: "" })

    const addSkillsBtnClick = () => {
        clickAddSkillsModelOpenBtn.current.click();
    }
    const onSkillsAddChange = (e) => {
        //will set text from textbox to setNoteeeeeeeeeee
        setAddSkills({ ...addskills, [e.target.name]: e.target.value })
    }
    const onSkillAddImageChange = async (e) => {
        const file = e.target.files[0];
        console.log("image=", file);
        const base64image = await convertToBase64(file);
        console.log("base64image=", base64image);
        setAddSkillImage({ addimage: base64image })
    }
    const addSkillsSubmitBtnClick = (e) => {
        e.preventDefault();
        addSkills(addskillimage.addimage, addskills.addskills);
        setAddSkills({ addskills: "" })
        setAddSkillImage({ addimage: "" })
        clickAddSkillsModelCloseBtn.current.click();
    }


    // Delete Skills--------------------------------------------------------------------------------------
    const clickDeleteSkillsModelOpenBtn = useRef(null);
    const clickDeleteSkillsModelCloseBtn = useRef(null);

    const [deleteskills, setDeleteSkills] = useState({ id: "" })
    const deleteSkillsBtnClick = (currentSkills) => {
        clickDeleteSkillsModelOpenBtn.current.click();
        setDeleteSkills({ id: currentSkills });
    }
    const deleteSkillsSubmitBtnClick = () => {
        deleteSkills(deleteskills.id)
        clickDeleteSkillsModelCloseBtn.current.click();
    }


    // Edit Skills-------------------------------------------------------------------------------------------

    const clickEditSkillsModelOpenBtn = useRef(null);
    const clickEditSkillsModelCloseBtn = useRef(null);
    const [editskills, setEditSkills] = useState({ id: "", editskill: "" })
    const [editskillimage, setEditSkillImage] = useState({ editimage: "" })

    const editSkillsBtnClick = (currentSkills) => {
        setEditSkills({ id: currentSkills._id, editskill: currentSkills.skill });
        setEditSkillImage({ editimage: currentSkills.image })
        clickEditSkillsModelOpenBtn.current.click();
    }
    const onSkillsUpdateChange = (e) => {
        //will set text from textbox to setNoteeeeeeeeeee
        setEditSkills({ ...editskills, [e.target.name]: e.target.value })
    }
    const onSkillEditImageChange = async (e) => {
        const file = e.target.files[0];
        console.log("image=", file);
        const base64image = await convertToBase64(file);
        console.log("base64image=", base64image);
        setEditSkillImage({ editimage: base64image })
    }
    const updateSkillsSubmitBtnClick = (e) => {
        e.preventDefault();
        editSkills(editskills.id, editskillimage.editimage, editskills.editskill);
        setEditSkills({ id: "", editskill: "" })
        setEditSkillImage({ editimage: "" })
        clickEditSkillsModelCloseBtn.current.click();
    }

    //function to convert image to Base64 
    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    return (
        <>
            {/* Add Skills Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#addskills" ref={clickAddSkillsModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="addskills" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Skills</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="addskillimage" className="custom-image-upload">
                                <img src={addskillimage.addimage || blank_profile_pic} alt="" />
                            </label>
                            <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="addskillimage" name="addskillimage" aria-describedby="emailHelp" minLength={5} onChange={onSkillAddImageChange} required />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="addskills" className="form-label">Skills</label>
                                <input type="text" className="form-control" id="addskills" name="addskills" aria-describedby="emailHelp" value={addskills.skill} minLength={5} onChange={onSkillsAddChange} required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickAddSkillsModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={addSkillsSubmitBtnClick}>Add Skills</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Skills Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary launchdemomodal" data-bs-toggle="modal" data-bs-target="#deleteskills" display="none" ref={clickDeleteSkillsModelOpenBtn}>
                Launch demo modal
            </button>
            <div className="modal fade" id="deleteskills" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Skills</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this Skills?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickDeleteSkillsModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={deleteSkillsSubmitBtnClick}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Skills Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#editskills" ref={clickEditSkillsModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="editskills" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Skills</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="editskillimage" className="custom-image-upload">
                                <img src={editskillimage.editimage || blank_profile_pic} alt="" />
                            </label>
                            <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="editskillimage" name="editskillimage" aria-describedby="emailHelp" minLength={5} onChange={onSkillEditImageChange} required />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="editskills" className="form-label">Skills</label>
                                <input type="text" className="form-control" id="editskill" name="editskill" aria-describedby="emailHelp" minLength={5} value={editskills.editskill} onChange={onSkillsUpdateChange} required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickEditSkillsModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={updateSkillsSubmitBtnClick}>Update Skill</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display Skills using map************************************************************************************************** */}
            <h2>Skills</h2>
            <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={() => { addSkillsBtnClick() }}>Add Skills</button>
            {
                skills.map((data, index) => {
                    return <div key={index} className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-1">
                                <img src={data.image || blank_profile_pic} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <li className="list-group-item" key={data._id}>{data.skill}</li>
                            </div>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={() => { editSkillsBtnClick(data) }}>Edit Skill</button>
                            <button type="button" className="btn btn-danger mx-1 btn-sm" onClick={() => { deleteSkillsBtnClick(data._id) }}>Delete Skill</button>
                        </div>
                    </div>;
                })
            }
        </>
    )
}

export default AddEditDelSkillssComp
