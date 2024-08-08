import React from "react";
import Images from "./Images";
import axios from "axios";

export default function ImageList(){
    const FileAPI = (url = 'https://localhost:7154/DocumentsUploader')=>{
        return{
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) =>axios.put(url + id,updatedRecord),
            delete: id => axios.delete(url , id)
 
        }

    }


    const addOrEdit = (FormData, onSuccess) =>{
        FileAPI().create(FormData)
        .then(res =>{
            onSuccess();
        })
        .catch(err=> console.log(err))
    }
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">
                        <h1 className="display-4">File Uploader</h1>
                    </div>
                </div>
            </div>
                    <div className="col-md-4">
                    <Images 
                    addOrEdit ={addOrEdit}
                    />
                </div>
                <div className ="col-md-8">
                   <div> list of Image records.</div> 
            </div>
        </div>
    
    )
}