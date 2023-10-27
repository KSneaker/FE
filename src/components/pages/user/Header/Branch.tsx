import { Link } from 'react-router-dom'
import logo from '../../../../assets/images/logo.png'

const Brand = ({ height }: { height: number }) => {
    return (
        <div className="">
            <Link to={'/'}>
                <img
                    src={logo}
                    height={height}
                />
            </Link>
        </div>
    );
}

export default Brand;