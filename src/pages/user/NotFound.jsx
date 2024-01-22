import Empty from "../../components/UI/Empty";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const NotFound = () => {
    const { height } = useWindowDimensions()
    return (
        <div className="" style={{ height: height * 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1>
                404 Không tìm thấy trang
            </h1>
        </div>
    );
}

export default NotFound;