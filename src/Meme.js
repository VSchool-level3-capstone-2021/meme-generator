import React from 'react'
import CurrentMeme from './CurrentMeme'
//API link for HTTP request: https://api.imgflip.com/get_memes

class Meme extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            memeToEditIndex: -1,
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
            .then(info => {
                this.setState({
                    memeArray: info.data.memes,
                    currentMeme: info.data.memes[Math.floor(Math.random() * info.data.memes.length)]
                })
                console.log(this.state)
            })
    }
    //refresh button
    refresh = (event) => {
        event.preventDefault()
        console.log("refresh")
        this.setState({
            currentMeme: this.state.memeArray[Math.floor(Math.random() * this.state.memeArray.length)]
        })
        console.log(this.state)
    }
    //save current meme to DOM
    saveMeme = () => {
        console.log("save meme was called")
        // event.preventDefault()
        console.log("saveMeme")
        this.setState(prevState => {
            return {
                savedMemes: [...prevState.savedMemes, prevState.currentMeme],
                currentMeme: {isEditing: false,isDeleting: false,...this.state.memeArray[Math.floor(Math.random() * this.state.memeArray.length)]},
                
            }
        }, () => console.log(this.state))
        

    }
    //handlechanger
    handleChange = (event) => {
        console.log("handleChange")
        const { name, value } = event.target
        this.setState(prevState => ({
            currentMeme: { ...prevState.currentMeme, [name]: value }
        }))
        console.log(this.state)
    }


    // [1] find info about which meme is being edited 
    // [2] use that to set the state of currentMeme which is controlling the form 
    editMeme = (id) => {
        let editMemeIndex = this.state.savedMemes.findIndex(function (meme, index) {
            return index === id
        }) // [1]

        let editMeme = this.state.savedMemes.find(function (meme, index) {
            return index === id
        })
        this.setState(prevState => ({
            memeToEditIndex: id,
            currentMeme: {
                url: editMeme.url,
                topText: editMeme.topText,
                bottomText: editMeme.bottomText,
                isEditing: true
            }
        })) // [2]
        // console.log(editMemeIndex, id)
        console.log(editMemeIndex, editMeme)
    }

    // this will be called once the form is submmited for editing 
    editMemeFromList = () => { 
        console.log("edit meme from list has been called")
        // this.state.savedMemes.map((meme, index) => if(index=this.state.memeToEditIndex) return {this.state})
        this.setState((prevState) => {
        return{ 
            savedMemes:prevState.savedMemes.map((meme, index) => {
                if(index===this.state.memeToEditIndex) 
                    return{ 
                        url: prevState.currentMeme.url,
                        topText: prevState.currentMeme.topText,
                        bottomText: prevState.currentMeme.bottomText
                    }
                else
                    return meme
            })
            
        }
    })



        /*
        savedMemes = ["kiwi", "blueberry", "orange"]
        savedMemes.map((fruit, index) => if(index===this.state.memeToEdit) return "strawberry" else return fruit)
        */

    }

    deleteMeme = (id) => {
        

        let deleteMemeIndex = this.state.savedMemes.findIndex(function (meme, index) {
            return index === id
        })

        let savedMemesAfterDelete = [...this.state.savedMemes]

        savedMemesAfterDelete.splice(deleteMemeIndex, 1)
        this.setState({
            savedMemes: savedMemesAfterDelete
        })
    }
    render() {
        console.log("render")

        const memes = this.state.savedMemes.map((meme, index)=> <CurrentMeme key={meme.id} id={index} meme={meme} created={"created"} deleteMeme={this.deleteMeme} editMeme={this.editMeme} />)
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
                        <button onClick={(e) => {
                            e.preventDefault()
                            if (this.state.currentMeme.isEditing === true){
                                this.editMemeFromList()
                            }
                            else {
                                this.saveMeme()
                            }
                        }}>Save</button>
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