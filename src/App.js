import React from "react"
import Header from "./components/Header";
import Note from "./components/Note";
import Modal from "./components/Modal";

import modalStyles from "./components/Modal/Modal.module.scss"

function App() {
    const [modalOpened, setModalOpened] = React.useState(false)
    const [modalData, setModalData] = React.useState({})
    const [searchData, setSearchData] = React.useState('')
    const [isNotesArr, setNotesArr] = React.useState([])
    const [displayNotes, setDisplayNotes] = React.useState([])

    const onClickDel = (noteId) => {
        let newArr = isNotesArr.slice()
        newArr = newArr.filter(note => note.id !== noteId)

        onCloseHandler()
        updateNotes(newArr)
    }

    const onClickUpdate = (newNoteObj) => {
        let newArr = isNotesArr.slice()

        let updateNote = newArr.find(note => note.id === newNoteObj.id)
        newArr = newArr.filter(note => note.id !== newNoteObj.id)

        updateNote.title = newNoteObj.title
        updateNote.text = newNoteObj.text
        updateNote.date = newNoteObj.date

        newArr.unshift(updateNote)
        onCloseHandler()
        updateNotes(newArr)
    }

    const onClickAdd = (newNoteObj) => {
        let newArr

        if (isNotesArr)
            newArr = isNotesArr.slice()
        else
            newArr = []

        newArr.unshift(newNoteObj)
        onCloseHandler()
        updateNotes(newArr)
    }

    const onClickOpenAddHandler = (noteAddObj) => {
        setModalData(noteAddObj)
        setModalOpened(true)
    }

    const onCloseHandler = () => {
        const overlay = document.querySelector(`.${modalStyles.overlay}`)
        overlay.classList.add(`${modalStyles.fadeOut}`)

        setTimeout(
            () => {
                setModalOpened(false)
            }, 400);
    }

    const onOpenModalNote = (noteObj) => {
        setModalData(noteObj)
        setModalOpened(true)
    }

    React.useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = modalOpened ? 'hidden' : 'auto';
    }, [modalOpened])

    const setNotes = (arr) => {
        localStorage.setItem("notes", JSON.stringify(arr))
    }

    const getNotes = () => {
        setNotesArr(JSON.parse(localStorage.getItem("notes")))
    }

    const updateNotes = (newArr) => {
        setNotes(newArr)
        getNotes()
    }

    const searchInputHandler = (event) => {
        setSearchData(event.target.value)
    }

    React.useEffect(() => {
        getNotes()
    }, [])

    React.useEffect(() => {
        const searchNotes = () => {
            if (searchData !== '') {
                setDisplayNotes(isNotesArr ? isNotesArr.filter((item) => {
                    return item.title.toLowerCase().includes(searchData.toLowerCase()) ||
                        item.text.toLowerCase().includes(searchData.toLowerCase())
                }) : [])
            } else {
                setDisplayNotes(isNotesArr ? isNotesArr : [])
            }
        }
        searchNotes()
    }, [searchData, isNotesArr])

    return (
        <div className="wrapper clear">
            {
                modalOpened && <Modal onAddHandler={(newNoteObj) => onClickAdd(newNoteObj)}
                                      onUpdateHandler={(newNoteObj) => onClickUpdate(newNoteObj)}
                                      onClose={onCloseHandler}
                                      modalObj={modalData}
                                      onDelHandler={(noteId) => onClickDel(noteId)}/>
            }
            <Header onClickOpenAdd={(noteAddObj) => onClickOpenAddHandler(noteAddObj)}/>
            <div className="content">
                <div className="contentHeader">
                    <h2>
                        {
                            searchData === '' ? 'All Notes' : `Search by: ${searchData}`
                        }
                    </h2>
                    <div className="searchBlock">
                        <img height={14} width={14} src="/img/search.png" alt="Search"/>
                        <input maxLength={35} value={searchData} onChange={event => searchInputHandler(event)}
                               type="text"
                               placeholder="Search notes..."/>
                    </div>
                </div>
                <div className="contentWrapper">
                    {displayNotes && displayNotes.length !== 0 ? displayNotes.map((obj) => (
                        <Note key={obj.id}
                              id={obj.id}
                              title={obj.title}
                              text={obj.text}
                              date={obj.date}
                              onOpenModal={(noteObj) => (onOpenModalNote(noteObj))}
                        />)) : <div className="noNotes">
                        <h2>{searchData === '' ? 'No notes... You can add a new note' : 'No notes find... Pleas try again'}</h2>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
