import React, { useContext, useRef, useState, useEffect } from 'react'
import myContext from '../../context/notes/myContext'

const EditAboutComp = () => {
    const context = useContext(myContext);
    const { about, editAbout, getAbout } = context;

    useEffect(() => {
        getAbout();
    }, [])

    // Edit About----------------------------------------------------------------------------
    const clickEditAboutModelOpenBtn = useRef(null);
    const clickEditAboutModelCloseBtn = useRef(null);
    const [editabout, setEditAbout] = useState({ id: "", editdescription: "" })

    const editAboutBtnClick = (currentAbout) => {
        clickEditAboutModelOpenBtn.current.click();
        setEditAbout({ id: currentAbout._id, editdescription: currentAbout.description });
    }
    const onAboutEditChange = (e) => {
        //will set text from textbox to setAbout
        setEditAbout({ ...editabout, [e.target.name]: e.target.value })
    }
    const SaveAboutBtnClick = (e) => {
        e.preventDefault();
        editAbout(editabout.id, editabout.editdescription);
        clickEditAboutModelCloseBtn.current.click();
    }

    return (
        <>
            {/* Edit About Modal********************************************************************************************* */}
            <button type="button" className="btn btn-primary d-none launchdemomodal" data-bs-toggle="modal" data-bs-target="#editabout" ref={clickEditAboutModelOpenBtn}>
                Launch demo modal
            </button>

            <div className="modal fade" id="editabout" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" style={{ maxWidth: 'none', width: '70rem' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit About</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <textarea type="text" className="form-control" id="editdescription" name="editdescription" rows="20" value={editabout.editdescription} onChange={onAboutEditChange} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={clickEditAboutModelCloseBtn}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={SaveAboutBtnClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display About using map************************************************************************************************** */}
            <h2>About</h2>
            <div className="row">
                <div className="col-sm-12" >
                    <div className="card">
                        <div className="card-body">
                            <pre className="card-text" style={{ whiteSpace: 'pre-wrap' }} >{about[0].description}</pre>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => { editAboutBtnClick(about[0]) }}>Edit About</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditAboutComp
