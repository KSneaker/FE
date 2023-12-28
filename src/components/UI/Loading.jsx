import { Spin } from "antd";

import useWindowDimensions from "../../hooks/useWindowDimensions";
const Loading = () => {
    const { height } = useWindowDimensions();

    return (
        <div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: height * 0.8 }}>
            <Spin size="large"></Spin>
        </div>
    );
}

export default Loading;