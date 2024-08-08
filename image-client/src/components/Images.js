import React, {useState, useEffect} from 'react'

const defaultImageSrc= '/img/iup.png'


const initialFieldValues = {
    Id : '',
    FileName : '',
    FileExtension : '',
    FilePath :'',
    DateUploaded:'',
    imageSrc:defaultImageSrc,
    imageFile: null
}



export default function Images(props){

const {addOrEdit} =props

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    
    const handleInputChange = e => {
        const{name,value} = e.target;
        setValues({
            ...values,
            [name]:value
        })
    }


    const showPreview = e =>{
        if(e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x=>{
                setValues({
                    ...values,
                    imageFile,
                    imageSrc:x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else{
            setValues({
                ...values,
                imageFile:null,
                imageSrc:defaultImageSrc
            })
        }
    }   
const validate = ()=> {
    let temp={}
    temp.FileName = values.FileName==""?false:true;
    temp.imageSrc = values.imageSrc ==defaultImageSrc?false:true;
    setErrors(temp)
    return Object.values(temp).every(x => x==true)
}

const resetForm = () =>{
    setValues(initialFieldValues)
    document.getElementById('image-uploader').value =null;
    setErrors({})
}


    const handleFormSubmit = e =>{
        e.preventDefault()
        if(validate()){
            const formData = new FormData()
            formData.append('Id', values.Id)
            formData.append('FileExtension', values.FileExtension)
            formData.append('FileName', values.FileName)
            formData.append('FilePath', values.FilePath)
            formData.append('DateUploaded', values.DateUploaded)
            formData.append('imageFile', values.imageFile)
            addOrEdit(formData,resetForm)
        }
    }

    const applyErrorClass = field =>((field in errors && errors[field]==false)?' invalid-field':'')
 
    return(
        <>
        <div className="container text-center"> 
            <p className="lead">An Image</p>
            Image Form
        </div>
        <form autoComplete='off' noValidate onSubmit={handleFormSubmit}> 
            <div className="card">
                <img src={values.imageSrc} className ="card-img-top" />
                <div className="card-body">
                    <div className='form-group'>
                        <input type="file" accept='"image/*' className={'form-control-file'+ applyErrorClass('imageSrc')}
                        onChange={showPreview}  id="image-uploader" />

                    </div>
                    <div className = "form-group"  >
                        <input className={"form-control"+applyErrorClass('FileName')} placeholder='File Name' name="FileName"
                            value={values.FileName}
                            onChange = {handleInputChange} />
                    </div>                  
                    <div className='form-group'>
                        <input className="form-control" placeholder="File Extension" name="FileExtension"
                            value ={values.occupation}
                            onChange={handleInputChange}>
                        </input>
                    </div>
                    <div className ="form-group text-center">
                        <button type="submit" className='btn btn-dark' >Submit</button>
                    </div>
                </div>
            </div>            
        </form>
        </>
    )
}



