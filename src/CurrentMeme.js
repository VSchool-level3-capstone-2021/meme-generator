import React from 'react'
import Meme from './Meme'

function CurrentMeme(props) {
    const memeStyle ={
        position: "relative",
        width: "100%"
        //some memes need to be a different size, but default sizes aren't really working because some memes are HUGE....maybe "if size is > x then reduce size?"
    }
    const topTextStyle = {

        padding: 0,
        margin: 0,
        color: "hotpink",
        position: "relative",
        top: 50,
         //does white work on all memes?
        //font family
    }
    const bottomTextStyle = {
        padding: 0,
        margin: 0,
        color: "hotpink",
        position: "relative",
        bottom: 50,
         //does white work on all memes?
        //font family
    }
    
    return (
    
        <div className="currentMeme" style={memeStyle}>
            <h1 style={topTextStyle}> {props.meme.topText} </h1>
            <img src={props.meme.url}/>
            <h1 style={bottomTextStyle}> {props.meme.bottomText} </h1>
            {props.created === "created" && <div id="edits"><button onClick={props.editMeme}>edit</button> <button onClick={props.deleteMeme}>delete</button></div>}
        </div>
    
    )
}

export default CurrentMeme
