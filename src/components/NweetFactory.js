import { dbService, storageService } from "fBase";
import React, { useState } from "react";
import {v4 as uuidv4} from "uuid";

const NweetFactory = ({userObj }) => {

    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async(event) => {
        event.preventDefault();
        let fileUrl = "";
        if(attachment !== "") {
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await fileRef.putString(attachment, "data_url");
            fileUrl = await response.ref.getDownloadURL();
        }

        const nweetObj = {
            text: nweet,
            createdAt : Date.now(),
            creatorId : userObj.uid,
            fileUrl,
        }
       
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
    };

    const onChange = (event) => {
        const {target : {value}} = event;
        setNweet(value);
    };
    
    const onFileChange = (event) => {
        const {target : {files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget : {result}} = finishedEvent;
            setAttachment(result);
        }; 
        reader.readAsDataURL(theFile);
    };

    const onClearPhotoClick = () => setAttachment(null);

    return  (
        <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} placeholder="What's on your mind?" value={nweet} maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearPhotoClick}>Clear</button>
            </div> }
    </form>
    );
};

export default NweetFactory;