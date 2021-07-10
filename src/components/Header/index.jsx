import styles from './Header.module.scss'
import logo from '../../img/logo.png'

function Header({onClickOpenAdd}) {
    const onClickAdd = () => {
        onClickOpenAdd({title: undefined, text: undefined, isNewNote: true})
    }

    return (
        <header>
            <div className={styles.headerLogo}>
                <img className={styles.headerLogoImg} height={50} width={50} src={logo} alt="Logo"/>
                <div>
                    <h2>React Note</h2>
                    <p>&nbsp;Best note service</p>
                </div>
            </div>
            <button onClick={onClickAdd}>
                ADD NEW NOTE +
            </button>
        </header>
    )
}

export default Header;