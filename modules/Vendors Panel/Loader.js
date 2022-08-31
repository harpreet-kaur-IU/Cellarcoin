import { HashLoader} from 'react-spinners';
import styles from ".././css/Vendor Panel/Modal.module.css"
export default function Loader(){
    return (
        <div className={`${styles["loader-modal-container"]} d-flex d-align-center d-justify-center`}>
            <HashLoader size={150} color="#780543"></HashLoader>
        </div>
    );
}