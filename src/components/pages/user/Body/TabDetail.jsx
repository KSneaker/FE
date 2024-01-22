import { Tabs } from 'antd';
import Comment from './Comment';

const TabDetail = ({ dataDetail, dataComment }) => {
    const items = [
        {
            key: '1',
            label: 'Mô tả sản phẩm',
            children: <>{
                dataDetail?.description
            }</>
        },
        {
            key: '2',
            label: `Đánh giá và bình luận (${dataComment.length})`,
            children: <Comment dataComment={dataComment} productID={dataDetail.id} />,
        }
    ];
    const onChange = (key) => {
        // console.log(key);
    };
    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    );
}

export default TabDetail;