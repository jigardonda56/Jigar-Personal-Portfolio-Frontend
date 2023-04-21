import React, { useContext, useRef, useState, useEffect } from 'react'
import myContext from '../../context/notes/myContext'
import blank_profile_pic from '../../images/blank-profile-picture.jpg'

const AddEditDelVolunteerComp = () => {
    const context = useContext(myContext);
    const { volunteer, addVolunteer, deleteVolunteer, editVolunteer, getVolunteer } = context;

    useEffect(() => {
        getVolunteer();
    }, [])

    // Add Volunteer----------------------------------------------------------------------------
    const clickAddVolunteerModelOpenBtn = useRef(null);
    const clickAddVolunteerModelCloseBtn = useRef(null);
    const [addvolunteer, setAddVolunteer] = useState({ addtitle: "", addsubtitle: "", adddate: "", adddescription: "" })
    const [addvolunteerimage, setAddVolunteerImage] = useState({ addimage: "" })

    const addVolunteerBtnClick = () => {
        clickAddVolunteerModelOpenBtn.current.click();
    }
    const onVolunteerAddChange = (e) => {
        //will set text from textbox to setNoteeeeeeeeeee
        setAddVolunteer({ ...addvolunteer, [e.target.name]: e.target.value })
    }

    const onVolunteerAddImageChange = async (e) => {
        const file = e.target.files[0];
        console.log("image=", file);
        const base64image = await convertToBase64(file);
        console.log("base64image=", base64image);
        setAddVolunteerImage({ addimage: base64image })
    }
    const addVolunteerSubmitBtnClick = (e) => {
        e.preventDefault();
        addVolunteer(addvolunteerimage.addimage, addvolunteer.addtitle, addvolunteer.addsubtitle, addvolunteer.adddate, addvolunteer.adddescription);
        setAddVolunteer({ addtitle: "", addsubtitle: "", adddate: "", adddescription: "" })
        setAddVolunteerImage({ addimage: "" })
        clickAddVolunteerModelCloseBtn.current.click();
    }


    // Delete Volunteer--------------------------------------------------------------------------------------
    const clickDeleteVolunteerModelOpenBtn = useRef(null);
    const clickDeleteVolunteerModelCloseBtn = useRef(null);

    const [deletevolunteer, setDeleteVolunteer] = useState({ id: "" })
    const deleteVolunteerBtnClick = (currentVolunteer) => {
        clickDeleteVolunteerModelOpenBtn.current.click();
        setDeleteVolunteer({ id: currentVolunteer });
    }
    const deleteVolunteerSubmitBtnClick = () => {
        deleteVolunteer(deletevolunteer.id)
        clickDeleteVolunteerModelCloseBtn.current.click();
    }


    // Edit Volunteer-------------------------------------------------------------------------------------------

    const clickEditVolunteerModelOpenBtn = useRef(null);
    const clickEditVolunteerModelCloseBtn = useRef(null);
    const [editvolunteer, setEditVolunteer] = useState({ id: "", edittitle: "", editsubtitle: "", editdate: "", editdescription: "" })
    const [editvolunteerimage, setEditVolunteerImage] = useState({ editimage: "" })

    const editVolunteerBtnClick = (currentVolunteer) => {
        setEditVolunteer({ id: currentVolunteer._id, edittitle: currentVolunteer.title, editsubtitle: currentVolunteer.subtitle, editdate: currentVolunteer.date, editdescription: currentVolunteer.description });
        setEditVolunteerImage({ editimage: currentVolunteer.image })
        clickEditVolunteerModelOpenBtn.current.click();
    }
    const onVolunteerEditChange = (e) => {
        //will set text from textbox to setNoteeeeeeeeeee
        setEditVolunteer({ ...editvolunteer, [e.target.name]: e.target.value })
    }
    const onVolunteerEditImageChange = async (e) => {
        const file = e.target.files[0];
        console.log("image=", file);
        const base64image = await convertToBase64(file);
        console.log("base64image=", base64image);
        setEditVolunteerImage({ editimage: base64image })
    }
    const editVolunteerSubmitBtnClick = (e) => {
        e.preventDefault();
        editVolunteer(editvolunteer.id, editvolunteerimage.editimage, editvolunteer.edittitle, editvolunteer.editsubtitle, editvolunteer.editdate, editvolunteer.editdescription);
        setEditVolunteer({ id: "", edittitle: "", editsubtitle: "", editdate: "", editdescription: "" })
        setEditVolunteerImage({ editimage: "" })
        clickEditVolunteerModelCloseBtn.current.click();
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
            {/* Add Volunteer Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#addvolunteer" ref={clickAddVolunteerModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="addvolunteer" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none', width: '70rem' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Volunteer</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="addvolunteerimage" className="custom-image-upload">
                                    <img src={addvolunteerimage.addimage || blank_profile_pic} alt="" />
                                </label>
                                <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="addvolunteerimage" name="addvolunteerimage" aria-describedby="emailHelp" minLength={5} onChange={onVolunteerAddImageChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="addtitle" name="addtitle" aria-describedby="emailHelp" value={addvolunteer.title} minLength={5} onChange={onVolunteerAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Sub Title</label>
                                <input type="text" className="form-control" id="addsubtitle" name="addsubtitle" value={addvolunteer.subtitle} minLength={2} onChange={onVolunteerAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Date</label>
                                <input type="text" className="form-control" id="adddate" name="adddate" value={addvolunteer.date} minLength={2} onChange={onVolunteerAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="adddescription" name="adddescription" value={addvolunteer.description} minLength={5} onChange={onVolunteerAddChange} required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickAddVolunteerModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={addVolunteerSubmitBtnClick}>Add Volunteer</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Volunteer Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary launchdemomodal" data-bs-toggle="modal" data-bs-target="#deletevolunteer" display="none" ref={clickDeleteVolunteerModelOpenBtn}>
                Launch demo modal
            </button>
            <div className="modal fade" id="deletevolunteer" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Volunteer</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this Volunteer?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickDeleteVolunteerModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={deleteVolunteerSubmitBtnClick}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Volunteer Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#editvolunteer" ref={clickEditVolunteerModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="editvolunteer" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none', width: '70rem' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Volunteer</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="editvolunteerimage" className="custom-image-upload">
                                    <img src={editvolunteerimage.editimage || blank_profile_pic} alt="" />
                                </label>
                                <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="editvolunteerimage" name="editvolunteerimage" aria-describedby="emailHelp" minLength={5} onChange={onVolunteerEditImageChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="edittitle" name="edittitle" aria-describedby="emailHelp" value={editvolunteer.edittitle} minLength={5} onChange={onVolunteerEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Sub Title</label>
                                <input type="text" className="form-control" id="editsubtitle" name="editsubtitle" value={editvolunteer.editsubtitle} minLength={2} onChange={onVolunteerEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Date</label>
                                <input type="text" className="form-control" id="editdate" name="editdate" value={editvolunteer.editdate} minLength={2} onChange={onVolunteerEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="editdescription" name="editdescription" value={editvolunteer.editdescription} minLength={5} onChange={onVolunteerEditChange} required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickEditVolunteerModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={editVolunteerSubmitBtnClick}>Update Volunteer</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display Volunteer using map************************************************************************************************** */}
            <h2>Volunteer</h2>
            <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={() => { addVolunteerBtnClick() }}>Add Volunteer</button>
            {
                volunteer.map((data, index) => {
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
                            <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={() => { editVolunteerBtnClick(data) }}>Edit Volunteer</button>
                            <button type="button" className="btn btn-danger mx-1 btn-sm" onClick={() => { deleteVolunteerBtnClick(data._id) }}>Delete Volunteer</button>
                        </div>
                    </div>;
                })
            }
        </>
    )
}

export default AddEditDelVolunteerComp
