import React from 'react'

function CurrentMeme(props) {
    const memeStyle ={
        "background-image": `url(${props.meme.url})`,
        "background-repeat": "no-repeat",
        "background-size": "contain",
        height: 400,
        width: 400,
        padding: 0,
        margin: 0
        //some memes need to be a different size, but default sizes aren't really working because some memes are HUGE....maybe "if size is > x then reduce size?"
    }
    const topTextStyle = {

        padding: 0,
        margin: 0,
        color: "hotpink" //does white work on all memes?
        //font family
    }
    const bottomTextStyle = {
        padding: 0,
        margin: 0,
        color: "hotpink" //does white work on all memes?
        //font family
    }
    return (
    <div style={memeStyle}>
        {/* text positioning doesn't always go to top and bottom only */}
        <h1 style={topTextStyle}> {props.meme.topText} </h1>
        <h1 style={bottomTextStyle}> {props.meme.bottomText} </h1>
    </div>
    )
}

export default CurrentMeme
