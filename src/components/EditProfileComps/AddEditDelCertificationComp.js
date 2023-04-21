import React, { useContext, useRef, useState, useEffect } from 'react'
import blank_profile_pic from '../../images/blank-profile-picture.jpg'
import myContext from '../../context/notes/myContext'

const AddEditDelCertificationComp = () => {
    const context = useContext(myContext);
    const { certification, addCertification, deleteCertification, editCertification, getCertification } = context;

    useEffect(() => {
        getCertification();
    }, [])


    // Add Certification----------------------------------------------------------------------------
    const clickAddCertificationModelOpenBtn = useRef(null);
    const clickAddCertificationModelCloseBtn = useRef(null);
    const [addcertification, setAddCertification] = useState({ addtitle: "", addsubtitle: "", adddate: "", adddescription: "" })
    const [addcertificationimage, setAddCertificationImage] = useState({ addimage: "" })

    const addCertificationBtnClick = () => {
        clickAddCertificationModelOpenBtn.current.click();
    }
    const onCertificationAddChange = (e) => {
        //will set text from textbox to setNoteeeeeeeeeee
        setAddCertification({ ...addcertification, [e.target.name]: e.target.value })
        console.log("certifivate on change")
    }
    const onCertificationAddImageChange = async (e) => {
        const file = e.target.files[0];
        console.log("image=", file);
        const base64image = await convertToBase64(file);
        console.log("base64image=", base64image);
        setAddCertificationImage({ addimage: base64image })
    }
    const addCertificationSubmitBtnClick = (e) => {
        e.preventDefault();
        addCertification(addcertificationimage.addimage, addcertification.addtitle, addcertification.addsubtitle, addcertification.adddate, addcertification.adddescription);
        setAddCertification({ addtitle: "", addsubtitle: "", adddate: "", adddescription: "" })
        setAddCertification({ addimage: "" })
        clickAddCertificationModelCloseBtn.current.click();
    }


    // Delete Certification--------------------------------------------------------------------------------------
    const clickDeleteCertificationModelOpenBtn = useRef(null);
    const clickDeleteCertificationModelCloseBtn = useRef(null);

    const [deletecertification, setDeleteCertification] = useState({ id: "" })
    const deleteCertificationBtnClick = (currentCertification) => {
        clickDeleteCertificationModelOpenBtn.current.click();
        setDeleteCertification({ id: currentCertification });
    }
    const deleteCertificationSubmitBtnClick = () => {
        deleteCertification(deletecertification.id)
        clickDeleteCertificationModelCloseBtn.current.click();
    }


    // Edit Certification-------------------------------------------------------------------------------------------

    const clickEditCertificationModelOpenBtn = useRef(null);
    const clickEditCertificationModelCloseBtn = useRef(null);
    const [editcertification, setEditCertification] = useState({ id: "", edittitle: "", editsubtitle: "", editdate: "", editdescription: "" })
    const [editcertificationimage, setEditCertificationImage] = useState({ addimage: "" })

    const editCertificationBtnClick = (currentCertification) => {
        setEditCertification({ id: currentCertification._id, edittitle: currentCertification.title, editsubtitle: currentCertification.subtitle, editdate: currentCertification.date, editdescription: currentCertification.description });
        setEditCertificationImage({ editimage: currentCertification.image })
        clickEditCertificationModelOpenBtn.current.click();
    }
    const onCertificationEditChange = (e) => {
        //will set text from textbox to setNoteeeeeeeeeee
        setEditCertification({ ...editcertification, [e.target.name]: e.target.value })
    }
    const onCertificationEditImageChange = async (e) => {
        const file = e.target.files[0];
        const base64image = await convertToBase64(file);
        setEditCertificationImage({ editimage: base64image })
    }
    const editCertificationSubmitBtnClick = (e) => {
        e.preventDefault();
        editCertification(editcertification.id, editcertificationimage.editimage, editcertification.edittitle, editcertification.editsubtitle, editcertification.editdate, editcertification.editdescription);
        setEditCertification({ id: "", edittitle: "", editsubtitle: "", editdate: "", editdescription: "" })
        setEditCertificationImage({ editimage: "" })
        clickEditCertificationModelCloseBtn.current.click();
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
            {/* Add Certification Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#addcertification" ref={clickAddCertificationModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="addcertification" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none', width: '70rem' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add ccccCertification</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="addcertificationimage" className="custom-image-upload">
                                    <img src={addcertificationimage.addimage || blank_profile_pic} alt="" />
                                </label>
                                <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="addcertificationimage" name="addcertificationimage" aria-describedby="emailHelp" minLength={5} onChange={onCertificationAddImageChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="addtitle" name="addtitle" aria-describedby="emailHelp" value={addcertification.title} minLength={5} onChange={onCertificationAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Sub Title</label>
                                <input type="text" className="form-control" id="addsubtitle" name="addsubtitle" value={addcertification.subtitle} minLength={2} onChange={onCertificationAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Date</label>
                                <input type="text" className="form-control" id="adddate" name="adddate" value={addcertification.date} minLength={2} onChange={onCertificationAddChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="adddescription" name="adddescription" value={addcertification.description} minLength={5} onChange={onCertificationAddChange} required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickAddCertificationModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={addCertificationSubmitBtnClick}>Add Certification</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Certification Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary launchdemomodal" data-bs-toggle="modal" data-bs-target="#deletecertification" display="none" ref={clickDeleteCertificationModelOpenBtn}>
                Launch demo modal
            </button>
            <div className="modal fade" id="deletecertification" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Certification</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this Certification?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickDeleteCertificationModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={deleteCertificationSubmitBtnClick}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Certification Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#editcertification" ref={clickEditCertificationModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="editcertification" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none', width: '70rem' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Certification</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="editcertificationimage" className="custom-image-upload">
                                    <img src={editcertificationimage.editimage || blank_profile_pic} alt="" />
                                </label>
                                <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="editcertificationimage" name="editcertificationimage" aria-describedby="emailHelp" minLength={5} onChange={onCertificationEditImageChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="edittitle" name="edittitle" aria-describedby="emailHelp" value={editcertification.edittitle} minLength={5} onChange={onCertificationEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Sub Title</label>
                                <input type="text" className="form-control" id="editsubtitle" name="editsubtitle" value={editcertification.editsubtitle} minLength={2} onChange={onCertificationEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Date</label>
                                <input type="text" className="form-control" id="editdate" name="editdate" value={editcertification.editdate} minLength={2} onChange={onCertificationEditChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="editdescription" name="editdescription" value={editcertification.editdescription} minLength={5} onChange={onCertificationEditChange} required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickEditCertificationModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={editCertificationSubmitBtnClick}>Update Certification</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display Certification using map************************************************************************************************** */}
            <h2>Certification</h2>
            <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={() => { addCertificationBtnClick() }}>Add Certification</button>
            {
                certification.map((data, index) => {
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
                            <button type="button" className="btn btn-primary mx-1 btn-sm" onClick={() => { editCertificationBtnClick(data) }}>Edit Certification</button>
                            <button type="button" className="btn btn-danger mx-1 btn-sm" onClick={() => { deleteCertificationBtnClick(data._id) }}>Delete Certification</button>
                        </div>
                    </div>;
                })
            }
        </>
    )
}

export default AddEditDelCertificationComp
