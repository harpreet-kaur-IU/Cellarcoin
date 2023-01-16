import { ScaleLoader} from 'react-spinners';
export default function SmallLoader(){
    return (
        <div className={`d-flex d-align-center d-justify-center`}>
            <ScaleLoader size={30} color="#780543"></ScaleLoader>
        </div>
    );
}