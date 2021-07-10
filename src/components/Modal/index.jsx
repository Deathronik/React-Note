import React from 'react'
import uuid from 'react-uuid'
import moment from "moment";

import styles from './Modal.module.scss'

function Modal({onClose, onAddHandler, onUpdateHandler, onDelHandler, modalObj}) {
    const [isNewNoteObjTitle, setNewNoteObjTitle] = React.useState(modalObj.isNewNote ? '' : modalObj.title)
    const [isNewNoteObjText, setNewNoteObjText] = React.useState(modalObj.isNewNote ? '' : modalObj.text)

    const newNoteObj = {
        id: modalObj.isNewNote ? uuid() : modalObj.id,
        title: isNewNoteObjTitle,
        text: isNewNoteObjText,
        date: moment().format("DD.MM.YYYY HH:mm")
    }

    const onDel = () => {
        onDelHandler(modalObj.id)
    }

    const onUpdate = () => {

        if (isNewNoteObjTitle !== '' && isNewNoteObjText !== '' && (isNewNoteObjTitle !== modalObj.title || isNewNoteObjText !== modalObj.text)) {
            onUpdateHandler(newNoteObj);
        }
    }

    const onAdd = () => {

        if (isNewNoteObjTitle !== '' && isNewNoteObjText !== '') {
            onAddHandler(newNoteObj);
        }
    }


    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.title}>
                    <input maxLength={35} onChange={(event) => setNewNoteObjTitle(event.target.value)}
                           defaultValue={modalObj.title} placeholder="Title of note...">
                    </input>
                    <svg onClick={onClose} width="23" height="23" viewBox="0 0 23 23" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="22" height="22" rx="4.5" fill="white" stroke="#E67F7F"/>
                        <path
                            d="M15 8.41243L14.5876 8L11.5 11.0876L8.41243 8L8 8.41243L11.0876 11.5L8 14.5876L8.41243 15L11.5 11.9124L14.5876 15L15 14.5876L11.9124 11.5L15 8.41243Z"
                            fill="#EB7A7A"/>
                    </svg>
                </div>
                <div className={styles.content}>
                    <textarea maxLength={980} onChange={(event) => setNewNoteObjText(event.target.value)}
                              defaultValue={modalObj.text} placeholder="Text of note..."/>
                </div>
                <div className={styles.footer}>
                    <button onClick={modalObj.isNewNote ? onAdd : onUpdate}>
                        {modalObj.isNewNote ? "ADD NEW NOTE +" : "UPDATE NOTE"}
                    </button>
                    {!modalObj.isNewNote && <img onClick={onDel} height={40} width={40} src="/img/trash.svg" alt="Trash"/>}
                </div>
            </div>
        </div>
    )
}

export default Modal;