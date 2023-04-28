import React, { useContext, useRef, useState, useEffect } from 'react'
import myContext from '../../context/notes/myContext'
import blank_profile_pic from '../../images/blank-profile-picture.jpg'

const AddEditDelHeroImageComp = () => {
    const context = useContext(myContext);
    const { heroimage, editHero, getHero } = context;

    useEffect(() => {
        getHero();
    }, [])

    // Edit About----------------------------------------------------------------------------
    const clickEditHeroModelOpenBtn = useRef(null);
    const clickEditHeroModelCloseBtn = useRef(null);
    const [edithero, setEditHero] = useState({ id: "", editline1: "", editline2: "" })
    const [editheroimage, setEditHeroImage] = useState({ editimage: "" })

    const editHeroBtnClick = (currentHero) => {
        clickEditHeroModelOpenBtn.current.click();
        setEditHero({ id: currentHero._id, editline1: currentHero.line1, editline2: currentHero.line2 });
        setEditHeroImage({ editimage: currentHero.image })
    }
    const onHeroEditChange = (e) => {
        //will set text from textbox to setAbout
        setEditHero({ ...edithero, [e.target.name]: e.target.value })
    }
    const onHeroEditImageChange = async (e) => {
        const file = e.target.files[0];
        console.log("image=", file);
        const base64image = await convertToBase64(file);
        console.log("base64image=", base64image);
        setEditHeroImage({ editimage: base64image })
    }
    const SaveHeroBtnClick = (e) => {
        e.preventDefault();
        editHero(edithero.id, editheroimage.editimage, edithero.editline1, edithero.editline2);
        clickEditHeroModelCloseBtn.current.click();
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
            {/* Edit About Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#edithero" ref={clickEditHeroModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="edithero" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit About</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="ediheroimage" className="custom-image-upload">
                                <img src={editheroimage.editimage || blank_profile_pic} alt="" />
                            </label>
                            <input type="file" label="Image" addept=".jpg, .jpeg, .png" className="form-control" id="ediheroimage" name="ediheroimage" aria-describedby="emailHelp" minLength={5} onChange={onHeroEditImageChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="editline1" className="form-label">Line 1</label>
                            <input type="text" className="form-control" id="editline1" name="editline1" value={edithero.editline1} minLength={2} onChange={onHeroEditChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="editline2" className="form-label">Line 2</label>
                            <input type="text" className="form-control" id="editline2" name="editline2" value={edithero.editline2} minLength={2} onChange={onHeroEditChange} required />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickEditHeroModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={SaveHeroBtnClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display About using map************************************************************************************************** */}

            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={heroimage[0].image} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <p className="card-text"><small className="text-muted">{heroimage[0].line1}</small></p>
                            <p className="card-text">{heroimage[0].line2}</p>
                        </div>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => { editHeroBtnClick(heroimage[0]) }}>Edit About</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEditDelHeroImageComp
