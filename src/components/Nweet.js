import { dbService, storageService } from "fBase";
import React, { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet,setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure want to delete?");
        console.log(ok);
        if(ok){
           await dbService.doc(`nweets/${nweetObj.id}`).delete();
           await storageService.refFromURL(nweetObj.fileUrl).delete(); // storage 파일 삭제
        }

    };
    const toggleEditing = () => setEditing(
       (prev) => !prev
    );
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(nweetObj, newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text : newNweet,
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {target : {value}} = event;
        setNewNweet(value);
    }

    return (
        <div> 
           {
               editing ? (
                        <> {
                            isOwner && 
                            <>
                            <form onSubmit={onSubmit}>
                        <input value={newNweet} required placeholder="Edit your nweet" onChange={onChange}/>
                        <input type="submit" value="Update Nwwet" />
                        </form>
                        <button onClick={toggleEditing} >Cancel</button>
                        </>
                        }
                        
                        </>
                   ) 
                
                   :
               (
               <>
               <h4>{nweetObj.text}</h4>
               {nweetObj.fileUrl && <img src={nweetObj.fileUrl} width="50px" height="50px" />}
               {isOwner && (
                   <>
                       <button onClick={onDeleteClick}>Delete Nweet</button>
                       <button onClick={toggleEditing}>Edit Nweet</button> 
                   </>
               )}
               </>
               )
           }
        </div>
    );
}

export default Nweet;