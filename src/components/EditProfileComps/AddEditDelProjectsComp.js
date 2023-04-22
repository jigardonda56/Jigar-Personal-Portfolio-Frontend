import React, { useContext, useRef, useState, useEffect } from 'react'
import blank_profile_pic from '../../images/blank-profile-picture.jpg'
import myContext from '../../context/notes/myContext'

const AddEditDelProjectComp = () => {
    const context = useContext(myContext);
    const { project, addProject, deleteProject, editProject, getProject } = context;

    useEffect(() => {
        getProject();
    }, [])

    // Add Project----------------------------------------------------------------------------
    const clickAddProjectModelOpenBtn = useRef(null);
    const clickAddProjectModelCloseBtn = useRef(null);
    const [addproject, setAddProject] = useState({ addtitle: "", addprojectdate: "", adddescription: "" })
    const [addprojectimage, setAddProjectImage] = useState({ addimage: "" })

    const addProjectBtnClick = () => {
        clickAddProjectModelOpenBtn.current.click();
    }
    const onProjectAddChange = (e) => {
        //will set text from textbox to setNoteeeeeeeeeee
        setAddProject({ ...addproject, [e.target.name]: e.target.value })
    }
    const onProjectAddImageChange = async (e) => {
        const file = e.target.files[0];
        console.log("image=", file);
        const base64image = await convertToBase64(file);
        console.log("base64image=", base64image);
        setAddProjectImage({ addimage: base64image })
    }
    const addProjectSubmitBtnClick = (e) => {
        e.preventDefault();
        addProject(addprojectimage.addimage, addproject.addtitle, addproject.addprojectdate, addproject.adddescription);
        setAddProject({ addtitle: "", addprojectdate: "", adddescription: "" })
        setAddProjectImage({ addimage: "" })
        clickAddProjectModelCloseBtn.current.click();
    }


    // Delete Project--------------------------------------------------------------------------------------
    const clickDeleteProjectModelOpenBtn = useRef(null);
    const clickDeleteProjectModelCloseBtn = useRef(null);

    const [deleteproject, setDeleteProject] = useState({ id: "" })
    const deleteProjectBtnClick = (currentProject) => {
        clickDeleteProjectModelOpenBtn.current.click();
        setDeleteProject({ id: currentProject });
    }
    const deleteProjectSubmitBtnClick = () => {
        deleteProject(deleteproject.id)
        clickDeleteProjectModelCloseBtn.current.click();
    }


    // Edit Project-------------------------------------------------------------------------------------------

    const clickEditProjectModelOpenBtn = useRef(null);
    const clickEditProjectModelCloseBtn = useRef(null);
    const [editproject, setEditProject] = useState({ id: "", edittitle: "", editprojectdate: "", editdescription: "" })
    const [editprojectimage, setEditProjectImage] = useState({ editimage: "" })

    const editProjectBtnClick = (currentProject) => {
        setEditProject({ id: currentProject._id, edittitle: currentProject.title, editprojectdate: currentProject.date, editdescription: currentProject.description });
        setEditProjectImage({ editimage: currentProject.image })
        clickEditProjectModelOpenBtn.current.click();
    }
    const onProjectEditChange = (e) => {
        //will set text from textbox to setNoteeeeeeeeeee
        setEditProject({ ...editproject, [e.target.name]: e.target.value })
    }
    const onCourseEditImageChange = async (e) => {
        const file = e.target.files[0];
        console.log("image=", file);
        const base64image = await convertToBase64(file);
        console.log("base64image=", base64image);
        setEditProjectImage({ editimage: base64image })
    }
    const editProjectSubmitBtnClick = (e) => {
        e.preventDefault();
        editProject(editproject.id, editprojectimage.editimage, editproject.edittitle, editproject.editprojectdate, editproject.editdescription);
        setEditProject({ id: "", edittitle: "", editprojectdate: "", editdescription: "" })
        setEditProjectImage({ editimage: "" })
        clickEditProjectModelCloseBtn.current.click();
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
            {/* Add Project Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#addproject" ref={clickAddProjectModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="addproject" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Project</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={clickAddProjectModelCloseBtn}></button>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="addprojectimage" className="custom-image-upload">
                                <img src={addprojectimage.addimage || blank_profile_pic} alt="" />
                            </label>
                            <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="addprojectimage" name="addprojectimage" aria-describedby="emailHelp" minLength={5} onChange={onProjectAddImageChange} required />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="addtitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="addtitle" name="addtitle" aria-describedby="emailHelp" minLength={5} value={addproject.addtitle} onChange={onProjectAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="addprojectdate" className="form-label">Date</label>
                                <input type="text" className="form-control" id="addprojectdate" name="addprojectdate" minLength={2} value={addproject.addprojectdate} onChange={onProjectAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="adddescription" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="adddescription" name="adddescription" minLength={2} value={addproject.adddescription} onChange={onProjectAddChange} required />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                            <button type="button" className="btn btn-primary" onClick={addProjectSubmitBtnClick}>Add Project</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Project Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary launchdemomodal" data-bs-toggle="modal" data-bs-target="#deleteproject" display="none" ref={clickDeleteProjectModelOpenBtn}>
                Launch demo modal
            </button>
            <div className="modal fade" id="deleteproject" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Project</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this Project?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickDeleteProjectModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={deleteProjectSubmitBtnClick}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Project Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#editproject" ref={clickEditProjectModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="editproject" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Project</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="editprojectimage" className="custom-image-upload">
                                    <img src={editprojectimage.editimage || blank_profile_pic} alt="" />
                                </label>
                                <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="editprojectimage" name="editprojectimage" aria-describedby="emailHelp" minLength={5} onChange={onCourseEditImageChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edittitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="edittitle" name="edittitle" aria-describedby="emailHelp" minLength={5} value={editproject.edittitle} onChange={onProjectEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="editprojectdate" className="form-label">Date</label>
                                <input type="text" className="form-control" id="editprojectdate" name="editprojectdate" minLength={2} value={editproject.editprojectdate} onChange={onProjectEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="editdescription" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="editdescription" name="editdescription" minLength={2} value={editproject.editdescription} onChange={onProjectEditChange} required />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickEditProjectModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={editProjectSubmitBtnClick}>Update Project</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display Project using map************************************************************************************************** */}
            <h2>Project</h2>
            <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={() => { addProjectBtnClick() }}>Add Project</button>
            {
                project.map((data, index) => {
                    return <div key={index} className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-1">
                                <img src={data.image || blank_profile_pic} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{data.title}</h5>
                                    <p className="card-text"><small className="text-muted">{data.date}</small></p>
                                    <pre className="card-text" style={{ whiteSpace: 'pre-wrap' }} >{data.associatedwith}</pre>
                                    <pre className="card-text" style={{ whiteSpace: 'pre-wrap' }} >{data.description}</pre>
                                </div>
                            </div>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={() => { editProjectBtnClick(data) }}>Edit Project</button>
                            <button type="button" className="btn btn-danger mx-1 btn-sm" onClick={() => { deleteProjectBtnClick(data._id) }}>Delete Project</button>
                        </div>
                    </div>;
                })
            }
        </>
    )
}

export default AddEditDelProjectComp
