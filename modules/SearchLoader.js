import { ClipLoader} from 'react-spinners';
export const SearchLoader = () => {
    return (
        <div className={`d-flex d-align-center d-justify-center`}>
            <ClipLoader size={30} color="#780543"></ClipLoader>
        </div>
    );
}
