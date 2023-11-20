import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Description from './tab/Description';
import Comment from './tab/Comment';

const onChange = (key: string) => {
    console.log(key);
};
const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Mô tả sản phẩm',
        children: <Description />
    },
    {
        key: '2',
        label: 'Đánh giá và bình luận',
        children: <Comment />,
    }
];
const TabDetail = () => {
    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    );
}

export default TabDetail;