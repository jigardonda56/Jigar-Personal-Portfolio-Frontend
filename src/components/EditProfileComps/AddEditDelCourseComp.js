import React, { useContext, useRef, useState, useEffect } from 'react'
import blank_profile_pic from '../../images/blank-profile-picture.jpg'
import myContext from '../../context/notes/myContext'

const AddEditDelCourseComp = () => {
    const context = useContext(myContext);
    const { course, addCourse, deleteCourse, editCourse, getCourse } = context;

    useEffect(() => {
        getCourse();
    }, [])

    // Add Course----------------------------------------------------------------------------
    const clickAddCourseModelOpenBtn = useRef(null);
    const clickAddCourseModelCloseBtn = useRef(null);
    const [addcourse, setAddCourse] = useState({ addtitle: "", addcoursecode: "", addassociation: "" })
    const [addcourseimage, setAddCourseImage] = useState({ addimage: "" })

    const addCourseBtnClick = () => {
        clickAddCourseModelOpenBtn.current.click();
    }
    const onCourseAddChange = (e) => {
        //will set text from textbox to setNoteeeeeeeeeee
        setAddCourse({ ...addcourse, [e.target.name]: e.target.value })
    }

    const onCourseAddImageChange = async (e) => {
        const file = e.target.files[0];
        console.log("image=", file);
        const base64image = await convertToBase64(file);
        console.log("base64image=", base64image);
        setAddCourseImage({ addimage: base64image })
    }
    const addCourseSubmitBtnClick = (e) => {
        e.preventDefault();
        console.log("clicked")
        addCourse(addcourseimage.addimage, addcourse.addtitle, addcourse.addcoursecode, addcourse.addassociation);
        setAddCourse({ addtitle: "", addcoursecode: "", addassociation: "" })
        setAddCourseImage({ addimage: "" })
        clickAddCourseModelCloseBtn.current.click();
    }


    // Delete Course--------------------------------------------------------------------------------------
    const clickDeleteCourseModelOpenBtn = useRef(null);
    const clickDeleteCourseModelCloseBtn = useRef(null);

    const [deletecourse, setDeleteCourse] = useState({ id: "" })
    const deleteCourseBtnClick = (currentCourse) => {
        clickDeleteCourseModelOpenBtn.current.click();
        setDeleteCourse({ id: currentCourse });
    }
    const deleteCourseSubmitBtnClick = () => {
        deleteCourse(deletecourse.id)
        clickDeleteCourseModelCloseBtn.current.click();
    }


    // Edit Course-------------------------------------------------------------------------------------------

    const clickEditCourseModelOpenBtn = useRef(null);
    const clickEditCourseModelCloseBtn = useRef(null);
    const [editcourse, setEditCourse] = useState({ id: "", edittitle: "", editcoursecode: "", editassociation: "" })
    const [editcourseimage, setEditCourseImage] = useState({ editimage: "" })

    const editCourseBtnClick = (currentCourse) => {
        console.log("currnt=", currentCourse);
        setEditCourse({ id: currentCourse._id, edittitle: currentCourse.title, editcoursecode: currentCourse.coursecode, editassociation: currentCourse.associatedwith });
        setEditCourseImage({ editimage: currentCourse.image })
        clickEditCourseModelOpenBtn.current.click();
    }
    const onCourseEditChange = (e) => {
        //will set text from textbox to setNoteeeeeeeeeee
        setEditCourse({ ...editcourse, [e.target.name]: e.target.value })
    }

    const onCourseEditImageChange = async (e) => {
        const file = e.target.files[0];
        console.log("image=", file);
        const base64image = await convertToBase64(file);
        console.log("base64image=", base64image);
        setEditCourseImage({ editimage: base64image })
    }
    const editCourseSubmitBtnClick = (e) => {
        e.preventDefault();
        editCourse(editcourse.id, editcourseimage.editimage, editcourse.edittitle, editcourse.editcoursecode, editcourse.editassociation);
        setEditCourse({ id: "", edittitle: "", editcoursecode: "", editassociation: "" })
        setEditCourseImage({ editimage: "" })
        clickEditCourseModelCloseBtn.current.click();
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
            {/* Add Course Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#addcourse" ref={clickAddCourseModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="addcourse" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none', width: '70rem' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Course</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={clickAddCourseModelCloseBtn}></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="addcourseimage" className="custom-image-upload">
                                    <img src={addcourseimage.addimage || blank_profile_pic} alt="" />
                                </label>
                                <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="addcourseimage" name="addcourseimage" aria-describedby="emailHelp" minLength={5} onChange={onCourseAddImageChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="addtitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="addtitle" name="addtitle" aria-describedby="emailHelp" minLength={5} onChange={onCourseAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="addcoursecode" className="form-label">Course Code</label>
                                <input type="text" className="form-control" id="addcoursecode" name="addcoursecode" minLength={2} onChange={onCourseAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="addassociation" className="form-label">Association with</label>
                                <input type="text" className="form-control" id="addassociation" name="addassociation" minLength={2} onChange={onCourseAddChange} required />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                            <button type="button" className="btn btn-primary" onClick={addCourseSubmitBtnClick}>Add Course</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Course Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary launchdemomodal" data-bs-toggle="modal" data-bs-target="#deletecourse" display="none" ref={clickDeleteCourseModelOpenBtn}>
                Launch demo modal
            </button>
            <div className="modal fade" id="deletecourse" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Course</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this Course?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickDeleteCourseModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={deleteCourseSubmitBtnClick}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Course Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#editcourse" ref={clickEditCourseModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="editcourse" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none', width: '70rem' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Course</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="editcourseimage" className="custom-image-upload">
                                <img src={editcourseimage.editimage || blank_profile_pic} alt="" />
                            </label>
                            <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="editcourseimage" name="editcourseimage" aria-describedby="emailHelp" minLength={5} onChange={onCourseEditImageChange} required />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="edittitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="edittitle" name="edittitle" aria-describedby="emailHelp" value={editcourse.edittitle} minLength={5} onChange={onCourseEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="editcoursecode" className="form-label">Course Code</label>
                                <input type="text" className="form-control" id="editcoursecode" name="editcoursecode" value={editcourse.editcoursecode} minLength={2} onChange={onCourseEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="editassociation" className="form-label">Association with</label>
                                <input type="text" className="form-control" id="editassociation" name="editassociation" value={editcourse.editassociation} minLength={2} onChange={onCourseEditChange} required />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickEditCourseModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={editCourseSubmitBtnClick}>Update Course</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display Course using map************************************************************************************************** */}
            <h2>Course</h2>
            <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={() => { addCourseBtnClick() }}>Add Course</button>
            {
                course.map((data, index) => {
                    return <div key={index} className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-1">
                                <img src={data.image || blank_profile_pic} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{data.title}</h5>
                                    <p className="card-text"><small className="text-muted">{data.coursecode}</small></p>
                                    <pre className="card-text" style={{ whiteSpace: 'pre-wrap' }} >{data.associatedwith}</pre>
                                </div>
                            </div>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={() => { editCourseBtnClick(data) }}>Edit Course</button>
                            <button type="button" className="btn btn-danger mx-1 btn-sm" onClick={() => { deleteCourseBtnClick(data._id) }}>Delete Course</button>
                        </div>
                    </div>;
                })
            }
        </>
    )
}

export default AddEditDelCourseComp
