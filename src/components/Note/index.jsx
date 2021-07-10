import styles from "./Note.module.scss";

function Note({id, title, text, date, onOpenModal}) {
    const onOpen = () => {
        onOpenModal({id: id, title: title, text: text, isNewNote: false})
    }

    return (
        <div onClick={onOpen} className={styles.note}>
            <div className={styles.noteTitle}>
                {title}
            </div>
            <div className={styles.noteContent}>
                {text}
            </div>
            <div className={styles.noteDate}>
                last update: <br/>
                {date}
            </div>
        </div>
    )
}

export default Note;