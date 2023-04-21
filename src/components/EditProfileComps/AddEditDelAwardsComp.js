import React, { useContext, useRef, useState, useEffect } from 'react'
import blank_profile_pic from '../../images/blank-profile-picture.jpg'
import myContext from '../../context/notes/myContext'

const AddEditDelAwardComp = () => {
    const context = useContext(myContext);
    const { award, addAward, deleteAward, editAward, getAward } = context;

    useEffect(() => {
        getAward();
    }, [])

    // Add Award----------------------------------------------------------------------------
    const clickAddAwardModelOpenBtn = useRef(null);
    const clickAddAwardModelCloseBtn = useRef(null);
    const [addaward, setAddAward] = useState({ addtitle: "", addsubtitle: "", adddescription: "", addassociatedwith: "" })
    const [addawardtimage, setAddAwardImage] = useState({ addimage: "" })

    const addAwardBtnClick = () => {
        clickAddAwardModelOpenBtn.current.click();
    }
    const onAwardAddChange = (e) => {
        //will set text from textbox to setNoteeeeeeeeeee
        setAddAward({ ...addaward, [e.target.name]: e.target.value })
    }
    const onAwardAddImageChange = async (e) => {
        const file = e.target.files[0];
        console.log("image=", file);
        const base64image = await convertToBase64(file);
        console.log("base64image=", base64image);
        setAddAwardImage({ addimage: base64image })
    }
    const addAwardSubmitBtnClick = (e) => {
        e.preventDefault();
        addAward(addawardtimage.addimage, addaward.addtitle, addaward.addsubtitle, addaward.adddescription, addaward.addassociatedwith);
        setAddAward({ addtitle: "", addsubtitle: "", adddescription: "", addassociatedwith: "" })
        setAddAwardImage({ addimage: "" })
        clickAddAwardModelCloseBtn.current.click();
    }


    // Delete Award--------------------------------------------------------------------------------------
    const clickDeleteAwardModelOpenBtn = useRef(null);
    const clickDeleteAwardModelCloseBtn = useRef(null);

    const [deleteaward, setDeleteAward] = useState({ id: "" })
    const deleteAwardBtnClick = (currentAward) => {
        clickDeleteAwardModelOpenBtn.current.click();
        setDeleteAward({ id: currentAward });
    }
    const deleteAwardSubmitBtnClick = () => {
        deleteAward(deleteaward.id)
        clickDeleteAwardModelCloseBtn.current.click();
    }


    // Edit Award-------------------------------------------------------------------------------------------

    const clickEditAwardModelOpenBtn = useRef(null);
    const clickEditAwardModelCloseBtn = useRef(null);
    const [editaward, setEditAward] = useState({ id: "", edittitle: "", editsubtitle: "", editdescription: "", editassociatedwith: "" })
    const [editawardimage, setEditAwardImage] = useState({ editimage: "" })

    const editAwardBtnClick = (currentAward) => {
        setEditAward({ id: currentAward._id, edittitle: currentAward.title, editsubtitle: currentAward.subtitle, editdescription: currentAward.description, editassociatedwith: currentAward.associatedwith });
        setEditAwardImage({ editimage: currentAward.image })
        clickEditAwardModelOpenBtn.current.click();
    }
    const onAwardEditChange = (e) => {
        //will set text from textbox to setNoteeeeeeeeeee
        setEditAward({ ...editaward, [e.target.name]: e.target.value })
    }
    const onAwardEditImageChange = async (e) => {
        const file = e.target.files[0];
        console.log("image=", file);
        const base64image = await convertToBase64(file);
        console.log("base64image=", base64image);
        setEditAwardImage({ editimage: base64image })
    }
    const editAwardSubmitBtnClick = (e) => {
        e.preventDefault();
        editAward(editaward.id, editawardimage.editimage, editaward.edittitle, editaward.editsubtitle, editaward.editdescription, editaward.editassociatedwith);
        setEditAward({ id: "", edittitle: "", editsubtitle: "", editdescription: "", editassociatedwith: "" })
        setEditAwardImage({ editimage: "" })
        clickEditAwardModelCloseBtn.current.click();
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
            {/* Add Award Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#addaward" ref={clickAddAwardModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="addaward" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none', width: '70rem' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Award</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={clickAddAwardModelCloseBtn}></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="addawardtimage" className="custom-image-upload">
                                    <img src={addawardtimage.addimage || blank_profile_pic} alt="" />
                                </label>
                                <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="addawardtimage" name="addawardtimage" aria-describedby="emailHelp" minLength={5} onChange={onAwardAddImageChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="addtitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="addtitle" name="addtitle" aria-describedby="emailHelp" minLength={5} value={addaward.addtitle} onChange={onAwardAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="addsubtitle" className="form-label">Subtitle</label>
                                <input type="text" className="form-control" id="addsubtitle" name="addsubtitle" minLength={2} value={addaward.addsubtitle} onChange={onAwardAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="addassociatedwith" className="form-label">Associated with</label>
                                <input type="text" className="form-control" id="addassociatedwith" name="addassociatedwith" minLength={2} value={addaward.addassociatedwith} onChange={onAwardAddChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="adddescription" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="adddescription" name="adddescription" minLength={2} value={addaward.adddescription} onChange={onAwardAddChange} required />
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                            <button type="button" className="btn btn-primary" onClick={addAwardSubmitBtnClick}>Add Award</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Award Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary launchdemomodal" data-bs-toggle="modal" data-bs-target="#deleteaward" display="none" ref={clickDeleteAwardModelOpenBtn}>
                Launch demo modal
            </button>
            <div className="modal fade" id="deleteaward" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Award</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this Award?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickDeleteAwardModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={deleteAwardSubmitBtnClick}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Award Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#editaward" ref={clickEditAwardModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="editaward" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none', width: '70rem' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Award</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="editawardimage" className="custom-image-upload">
                                    <img src={editawardimage.editimage || blank_profile_pic} alt="" />
                                </label>
                                <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="editawardimage" name="editawardimage" aria-describedby="emailHelp" minLength={5} onChange={onAwardEditImageChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edittitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="edittitle" name="edittitle" aria-describedby="emailHelp" minLength={5} value={editaward.edittitle} onChange={onAwardEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="editsubtitle" className="form-label">Subtitle</label>
                                <input type="text" className="form-control" id="editsubtitle" name="editsubtitle" minLength={2} value={editaward.editsubtitle} onChange={onAwardEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="editassociatedwith" className="form-label">Associated with</label>
                                <input type="text" className="form-control" id="editassociatedwith" name="editassociatedwith" minLength={2} value={editaward.editassociatedwith} onChange={onAwardEditChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editdescription" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="editdescription" name="editdescription" minLength={2} value={editaward.editdescription} onChange={onAwardEditChange} required />
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickEditAwardModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={editAwardSubmitBtnClick}>Update Award</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display Award using map************************************************************************************************** */}
            <h2>Award</h2>
            <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={() => { addAwardBtnClick() }}>Add Award</button>
            {
                award.map((data, index) => {
                    return <div key={index} className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-1">
                                <img src={data.image || blank_profile_pic} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{data.title}</h5>
                                    <p className="card-text"><small className="text-muted">{data.subtitle}</small></p>
                                    <pre className="card-text" style={{ whiteSpace: 'pre-wrap' }} >{data.description}</pre>
                                    <p className="card-text" style={{ whiteSpace: 'pre-wrap' }} >{data.associatedwith}</p>
                                </div>
                            </div>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={() => { editAwardBtnClick(data) }}>Edit Award</button>
                            <button type="button" className="btn btn-danger mx-1 btn-sm" onClick={() => { deleteAwardBtnClick(data._id) }}>Delete Award</button>
                        </div>
                    </div>;
                })
            }
        </>
    )
}

export default AddEditDelAwardComp
