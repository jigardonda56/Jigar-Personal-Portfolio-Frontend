import React, { useContext, useRef, useState, useEffect } from 'react'
import myContext from '../../context/notes/myContext'
import blank_profile_pic from '../../images/blank-profile-picture.jpg'

const AddEditDelEducationComp = () => {
    const context = useContext(myContext);
    const { education, addEducation, deleteEducation, editEducation, getEducation } = context;

    useEffect(() => {
        getEducation();
    }, [])

    // Add Education----------------------------------------------------------------------------
    const clickAddEducationModelOpenBtn = useRef(null);
    const clickAddEducationModelCloseBtn = useRef(null);
    const [addeducation, setAddEducation] = useState({ addtitle: "", addsubtitle: "", adddate: "", adddescription: "" })
    const [addeducationimage, setAddEducationImage] = useState({ addimage: "" })

    const addEducationBtnClick = () => {
        clickAddEducationModelOpenBtn.current.click();
    }
    const onEducationAddChange = async (e) => {
        //will set text from textbox to setNoteeeeeeeeeee
        setAddEducation({ ...addeducation, [e.target.name]: e.target.value })
    }

    const onEducationAddImageChange = async (e) => {
        const file = e.target.files[0];
        console.log("image=", file);
        const base64image = await convertToBase64(file);
        console.log("base64image=", base64image);
        setAddEducationImage({ addimage: base64image })
    }

    const addEducationSubmitBtnClick = (e) => {
        e.preventDefault();
        addEducation(addeducationimage.addimage, addeducation.addtitle, addeducation.addsubtitle, addeducation.adddate, addeducation.adddescription);
        setAddEducation({ addtitle: "", addsubtitle: "", adddate: "", adddescription: "" })
        setAddEducationImage({ addimage: "" })
        clickAddEducationModelCloseBtn.current.click();
    }



    // Delete Education--------------------------------------------------------------------------------------
    const clickDeleteEducationModelOpenBtn = useRef(null);
    const clickDeleteEducationModelCloseBtn = useRef(null);

    const [deleteeducation, setDeleteEducation] = useState({ id: "" })
    const deleteEducationBtnClick = (currentEducation) => {
        clickDeleteEducationModelOpenBtn.current.click();
        setDeleteEducation({ id: currentEducation });
    }
    const deleteEducationSubmitBtnClick = () => {
        deleteEducation(deleteeducation.id)
        clickDeleteEducationModelCloseBtn.current.click();
    }


    // Edit Education-------------------------------------------------------------------------------------------

    const clickEditEducationModelOpenBtn = useRef(null);
    const clickEditEducationModelCloseBtn = useRef(null);
    const [editeducation, setEditEducation] = useState({ id: "", edittitle: "", editsubtitle: "", editdate: "", editdescription: "" })
    const [editeducationimage, setEditEducationImage] = useState({ editimage: "" })

    const editEducationBtnClick = (currentEducation) => {
        setEditEducation({ id: currentEducation._id, edittitle: currentEducation.title, editsubtitle: currentEducation.subtitle, editdate: currentEducation.date, editdescription: currentEducation.description });
        setEditEducationImage({ editimage: currentEducation.image })
        clickEditEducationModelOpenBtn.current.click();
    }
    const onEducationEditChange = (e) => {
        //will set text from textbox to setNoteeeeeeeeeee
        setEditEducation({ ...editeducation, [e.target.name]: e.target.value })
    }
    const onEducationEditImageChange = async (e) => {
        const file = e.target.files[0];
        console.log("image=", file);
        const base64image = await convertToBase64(file);
        console.log("base64image=", base64image);
        setEditEducationImage({ editimage: base64image })
    }

    const editEducationSubmitBtnClick = (e) => {
        e.preventDefault();
        editEducation(editeducation.id, editeducationimage.editimage, editeducation.edittitle, editeducation.editsubtitle, editeducation.editdate, editeducation.editdescription);
        setEditEducation({ id: "", edittitle: "", editsubtitle: "", editdate: "", editdescription: "" })
        setEditEducationImage({ editimage: "" })
        clickEditEducationModelCloseBtn.current.click();
    }

    //-------------------------------------------------------------------------
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
            {/* Add Education Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#addeducation" ref={clickAddEducationModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="addeducation" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none', width: '70rem' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Education</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="addimage" className="custom-image-upload">
                                    <img src={addeducationimage.addimage || blank_profile_pic} alt="" />
                                </label>
                                <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="addimage" name="addimage" aria-describedby="emailHelp" minLength={5} onChange={onEducationAddImageChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="addtitle" name="addtitle" aria-describedby="emailHelp" value={addeducation.title} minLength={5} onChange={onEducationAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Sub Title</label>
                                <input type="text" className="form-control" id="addsubtitle" name="addsubtitle" value={addeducation.subtitle} minLength={2} onChange={onEducationAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Date</label>
                                <input type="text" className="form-control" id="adddate" name="adddate" value={addeducation.date} minLength={2} onChange={onEducationAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="adddescription" name="adddescription" value={addeducation.description} minLength={5} onChange={onEducationAddChange} required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickAddEducationModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={addEducationSubmitBtnClick}>Add Education</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Education Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary launchdemomodal" data-bs-toggle="modal" data-bs-target="#deleteeducation" display="none" ref={clickDeleteEducationModelOpenBtn}>
                Launch demo modal
            </button>
            <div className="modal fade" id="deleteeducation" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Education</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this Education?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickDeleteEducationModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={deleteEducationSubmitBtnClick}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Education Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#editeducation" ref={clickEditEducationModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="editeducation" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none', width: '70rem' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Education</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="editeducationimage" className="custom-image-upload">
                                    <img src={editeducationimage.editimage || blank_profile_pic} alt="" />
                                </label>
                                <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="editeducationimage" name="editeducationimage" aria-describedby="emailHelp" minLength={5} onChange={onEducationEditImageChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="edittitle" name="edittitle" aria-describedby="emailHelp" value={editeducation.edittitle} minLength={5} onChange={onEducationEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Sub Title</label>
                                <input type="text" className="form-control" id="editsubtitle" name="editsubtitle" value={editeducation.editsubtitle} minLength={2} onChange={onEducationEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Date</label>
                                <input type="text" className="form-control" id="editdate" name="editdate" value={editeducation.editdate} minLength={2} onChange={onEducationEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="editdescription" name="editdescription" value={editeducation.editdescription} minLength={5} onChange={onEducationEditChange} required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickEditEducationModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={editEducationSubmitBtnClick}>Update Education</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display Education using map************************************************************************************************** */}
            <h2>Education</h2>
            <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={() => { addEducationBtnClick() }}>Add Education</button>
            {
                education.map((data, index) => {
                    return <div key={index} className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-1">
                                <img src={data.image || blank_profile_pic} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{data.title}</h5>
                                    <p className="card-text"><small className="text-muted">{data.subtitle}</small></p>
                                    <p className="card-text"><small className="text-muted">{data.date}</small></p>
                                    <pre className="card-text" style={{ whiteSpace: 'pre-wrap' }} >{data.description}</pre>
                                </div>
                            </div>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={() => { editEducationBtnClick(data) }}>Edit Education</button>
                            <button type="button" className="btn btn-danger mx-1 btn-sm" onClick={() => { deleteEducationBtnClick(data._id) }}>Delete Education</button>
                        </div>
                    </div>;
                })
            }
        </>
    )
}

export default AddEditDelEducationComp
