import React from 'react'
import CurrentMeme from './CurrentMeme'
//API link for HTTP request: https://api.imgflip.com/get_memes

class Meme extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentMeme: {
                url: "",
                topText: "",
                bottomText: "",
                isEditing: false,
                isDeleting: false
            },
            memeArray: [],
            savedMemes: []
        }
    }
    // meme image on page load and save memes to state
    componentDidMount = () => {
        console.log("componentDidMount")
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(info => {this.setState ({
                memeArray: info.data.memes,
                currentMeme: info.data.memes[Math.floor(Math.random()*info.data.memes.length)]
            })
                console.log(this.state)
            })
    }
    //refresh button
    refresh = (event) => {
        event.preventDefault()
        console.log("refresh")
        this.setState({
            currentMeme: this.state.memeArray[Math.floor(Math.random()*this.state.memeArray.length)]
        })
        console.log(this.state)
    }
    //save current meme to DOM
    saveMeme = (event) => {
        event.preventDefault()
        console.log("saveMeme")
        this.setState ( prevState => {
            return {
            savedMemes: [...prevState.savedMemes, prevState.currentMeme],
            currentMeme: this.state.memeArray[Math.floor(Math.random()*this.state.memeArray.length)],
            isEditing: true,
            isDeleting: true
            }
        }, () => console.log(this.state))
        document.getElementById("topText").value = ""
        document.getElementById("bottomText").value = ""

    }
    //handlechanger
    handleChange = (event) => {
        console.log("handleChange")
        const {name, value} = event.target
        this.setState( prevState => ({
            currentMeme: {...prevState.currentMeme, [name]: value}
        }))
        console.log(this.state)
    }
    editMeme = (e) => {
        // e.preventDefault()
        // const topInput = document.createElement("input")
        // const bottomInput = document.createElement("input")

        // this.setState( prevState => ({
        //     savedMemes: {prevState.savedMemes.isEditing: true}
        // })

        // if (this.state.savedMemes.isEditing === true) {
        //     document.getElementById("edits").appendChild(topInput)
        //     document.getElementById("edits").appendChild(bottomInput)
        // }
        // 
    }

    deleteMeme = (e) => {
        let { id } = e.target
        id = Number(id)

        let deleteMemeIndex = this.state.savedMemes.findIndex(function(meme) {
            return meme.id === id
        })

        let savedMemesAfterDelete = this.state.savedMemes
        
        savedMemesAfterDelete.splice(deleteMemeIndex, 1)
        this.setState({
            savedMemes: savedMemesAfterDelete
        })
    }
    render() {
        console.log("render")
        
        const memes = this.state.savedMemes.map( meme => <CurrentMeme key={meme.id} meme={meme} created={"created"} deleteMeme={this.deleteMeme} editMeme={this.editMeme}/>)
        return (
            <>
                <button id="refreshButton" onClick={this.refresh}>Refresh</button>
                <div className="memeCreator">
                    <CurrentMeme key={this.state.currentMeme} meme={this.state.currentMeme} />
                    <form name="memeTextForm">
                        <input 
                        name="topText"
                        id="topText"
                        type="text"
                        placeholder="Top Text"
                        onChange={this.handleChange}
                        value={this.state.currentMeme.topText}
                        />
                        <input 
                        name="bottomText"
                        id="bottomText"
                        type="text"
                        placeholder="Bottom Text"
                        onChange={this.handleChange}
                        value={this.state.currentMeme.bottomText}
                        />
                        <button  onClick={this.saveMeme}>Save</button>
                    </form>
                   <div className="savedMemes">
                          {memes}
                    </div>
                </div>
            </>
        )
    }
}
export default Meme