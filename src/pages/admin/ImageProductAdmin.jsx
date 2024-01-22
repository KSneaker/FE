
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { storageFirebase } from "./firebase";
import { openNotification } from '../../functions/Notification';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PlusOutlined, MinusCircleOutlined, } from '@ant-design/icons';
import { Modal, Upload, Button, Col, Form, Input, Row, Select, Space, Typography, notification, UploadFile, UploadProps, InputNumber, Table } from 'antd';
import TableProduct from "../../components/pages/admin/TableProduct";
import { getAllBrands } from "../../redux/actions/actionsBrand";
import { getAllProducts, postProduct, updateProduct } from "../../redux/actions/actionsProduct";
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../config';
import axios from 'axios';
import {
    SettingOutlined,
    EditOutlined,
    FilePdfOutlined
} from '@ant-design/icons'
const { Option } = Select;

const ImageProductAdmin = () => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditting, setIsEditting] = useState(false)
    const [fileList, setFileList] = useState([]);

    const dispatch = useDispatch()
    const allProducts = useSelector((state) => state.products.products?.allProducts)
    const user = useSelector((state) => state.auth.login?.currentUser)
    const { data: allImage, isLoading } = useFetch(`${BASE_URL}/product/image`)
    const modifiedAllImage = allImage?.map((item) => {
        return {
            ...item,
            list_thumb: JSON.parse(item.list_thumb).map((thumb) => {
                return {
                    ...thumb,
                    url: `${BASE_URL}/image/${thumb.thumbnail}`
                }
            }),
        }
    })
    // console.log(modifiedAllImage)
    useEffect(() => {
        getAllProducts(user?.accessToken, dispatch)
        getAllBrands(user?.accessToken, dispatch)
    }, [])
    const validateFileList = (_, fileList) => {
        if (fileList.fileList?.length == 0) {
            return Promise.reject('Please select one file to upload.');
        }
        else {
            return Promise.resolve();
        }
    };


    const columns = [
        {
            title: 'ID sản phẩm',
            key: 'product_id',
            dataIndex: 'product_id',
            align: 'center'
        },
        {
            title: 'Tên sản phẩm',
            key: 'title',
            dataIndex: 'title',
            align: 'center'
        },
        {
            title: 'Ảnh',
            key: 'list_thumb',
            dataIndex: 'list_thumb',
            align: 'center',
            render: (list) =>
                <div style={{ display: 'flex', gap: 10 }}> {
                    list.map((item, index) => {
                        return <img key={index} width={100} height={100} src={item.url} />
                    })
                }
                </div>
        },

        {
            title: <SettingOutlined />,
            key: 'settings',
            align: 'center',
            width: 100,
            render: (order) => {
                return (
                    <div className="" style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                        <Button type="primary" size={'large'} style={{ display: 'flex', alignItems: 'center' }}
                            onClick={() => openEdit(order)}
                        >
                            <EditOutlined />
                        </Button>
                    </div>
                )
            }

        },
    ];
    const onChange = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
    }
    const onRemove = async (e) => {
        if (isEditting) {
            // console.log(e.thumbnail)
            await axios.delete(`${BASE_URL}/product/image/${e.thumbnail}`)
            await axios.delete(`${BASE_URL}/image/${e.thumbnail}`)
        }
        else {
            await axios.delete(`${BASE_URL}/image/${e.response}`)
        }
    }
    const onClose = () => {
        setOpen(false);
    }

    const handleAdd = () => {
        setFileList([])
        setOpen(true);
        setIsEditting(false)
        form.resetFields();
    };

    const openEdit = (record) => {
        // console.log(record)
        setFileList(record.list_thumb)
        setOpen(true)
        setIsEditting(true)
        form.setFieldsValue(record);
    }

    const onFinish = async (e) => {
        e.thumbnail.fileList.map(async (file) => {
            const body = {
                product_id: e.product_id,
                thumbnail: file.response
            }
            const res = await axios.post(`${BASE_URL}/product/image`, body)
        });
        openNotification('Thêm thành công', 'success')
        setOpen(false)
    }

    return (
        <>
            <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: 20 }}>
                    <p> Bảng ảnh sản phẩm </p>
                    <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
                        Thêm ảnh mới
                    </Button>
                </div>
                <Table columns={columns} dataSource={modifiedAllImage} loading={isLoading} bordered rowKey={'product_id'} />

                <Modal
                    title={isEditting ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                    width={720}
                    onCancel={onClose}
                    open={open}
                    footer={null}
                >
                    <Form form={form} onFinish={onFinish} layout="vertical" name="dynamic_form_complex"
                    >
                        {
                            isEditting && <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        name="product_id"
                                        label="ID"
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                        }

                        <Row gutter={16}>

                            <Col span={24}>
                                <Form.Item
                                    name="product_id"
                                    label="Sản phẩm"
                                    rules={[{ required: true, message: 'Vui lòng chọn Sản phẩm!' }]}
                                >
                                    <Select placeholder="Sản phẩm" disabled={isEditting ? true : false}>
                                        {
                                            allProducts?.map((brand) => {
                                                return (
                                                    <Option key={brand.id} value={brand.id} >{brand.title}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="thumbnail"
                                    label="Ảnh"
                                    rules={[{
                                        required: true,
                                        message: 'Vui lòng chọn ảnh!',
                                        validator: validateFileList
                                    }]}
                                >

                                    <Upload
                                        action={`${BASE_URL}/upload`}
                                        name="image"
                                        listType="picture-card"
                                        // beforeUpload={(file) => {
                                        //     // console.log(">>> file: ", file);
                                        //     return false;
                                        // }}
                                        onRemove={onRemove}
                                        onChange={onChange}
                                        fileList={fileList}
                                        maxCount={10}
                                    // multiple
                                    >
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Tải lên</div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        {isEditting ? "Lưu" : "Thêm"}
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* <Form.Item noStyle shouldUpdate>
                        {() => (
                            <Typography>
                                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                            </Typography>
                        )}
                    </Form.Item> */}
                    </Form>

                </Modal >
            </div >
        </>

    );
}

export default ImageProductAdmin;