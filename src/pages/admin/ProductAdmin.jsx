
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { storageFirebase } from "./firebase";
import { openNotification } from '../../functions/Notification';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Modal, Upload, Button, Col, Form, Input, Row, Select, Space, Typography, notification, UploadFile, UploadProps, InputNumber } from 'antd';
import TableProduct from "../../components/pages/admin/TableProduct";
import { getAllBrands } from "../../redux/actions/actionsBrand";
import { getAllProducts, postProduct, updateProduct } from "../../redux/actions/actionsProduct";
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../config';
import dayjs from 'dayjs';

const { Option } = Select;

const ProductAdmin = () => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditting, setIsEditting] = useState(false)
    const [isChangeImg, setIsChangeImg] = useState(false)
    const [fileList, setFileList] = useState([]);

    const dispatch = useDispatch()
    const allBrands = useSelector((state) => state.brands.brands?.allBrands?.data)
    const user = useSelector((state) => state.auth.login?.currentUser)

    const { data } = useFetch(`${BASE_URL}/category`)
    const allCategories = data
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

    const onChange = ({ fileList: newFileList }) => {
        setIsChangeImg(true)
        setFileList(newFileList);
    };

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
        setFileList(
            [
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: record.thumbnail,
                }
            ]
        )
        setOpen(true)
        setIsEditting(true)
        form.setFieldsValue(record);
    }
    const onFinish = async (e) => {
        if (!isEditting) {
            const imgRef = ref(storageFirebase, `images/thumbnail/${e.thumbnail.fileList[0].name + dayjs().format('YYYYMMDDHHmmss')} `);
            await uploadBytes(imgRef, e.thumbnail.fileList[0].originFileObj)
            const url = await getDownloadURL(imgRef)
            const body = await { ...e, thumbnail: url };
            // console.log(body)
            postProduct(user.accessToken, dispatch, body)
            openNotification('Thêm thành công', 'success')
            setOpen(false)
            setIsChangeImg(false)
        } else {
            if (isChangeImg) {
                const imgRef = ref(storageFirebase, `images / thumbnail / ${e.thumbnail.fileList[0].name + dayjs().format('YYYYMMDDHHmmss')} `);
                await uploadBytes(imgRef, e.thumbnail.fileList[0].originFileObj)
                const url = await getDownloadURL(imgRef)
                console.log('url', url)
                const body = await { ...e, thumbnail: url };
                await updateProduct(user.accessToken, dispatch, body)
                openNotification('Sửa thành công', 'success')
                setOpen(false)
                setIsChangeImg(false)
            }
            else {
                await updateProduct(user.accessToken, dispatch, e)
                openNotification('Sửa thành công', 'success')
                setOpen(false)
            }

        }
    }

    return (
        <>
            <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: 20 }}>
                    <p> Bảng sản phẩm </p>
                    <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
                        Thêm sản phẩm mới
                    </Button>
                </div>

                <TableProduct openEdit={openEdit} />
                <Modal
                    title={isEditting ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                    width={720}
                    onCancel={onClose}
                    open={open}
                    footer={null}
                >
                    <Form onFinish={(e) => onFinish(e)} form={form} layout="vertical" name="dynamic_form_complex"
                    >
                        {
                            isEditting && <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        name="id"
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
                                    name="title"
                                    label="Tên sản phẩm"
                                    rules={[{
                                        required: true, message: 'Vui lòng nhập tên sản phẩm!'
                                    }]}
                                >
                                    <Input placeholder="VD: Nike Air Force 1" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>

                            <Col span={6}>
                                <Form.Item
                                    name="brand_id"
                                    label="Thương hiệu"
                                    rules={[{ required: true, message: 'Vui lòng chọn thương hiệu!' }]}
                                >
                                    <Select placeholder="Thương hiệu">
                                        {
                                            allBrands?.map((brand) => {
                                                return (
                                                    <Option key={brand.id} value={brand.id} >{brand.id}-{brand.name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="category_id"
                                    label="Phân loại"
                                    rules={[{ required: true, message: 'Vui lòng chọn phân loại!' }]}
                                >
                                    <Select placeholder="Phân loại">
                                        {
                                            allCategories?.map((category) => {
                                                return (
                                                    <Option key={category.id} value={category.id} >{category.id}-{category.name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="import_price"
                                    label="Giá nhập (đ)"
                                    rules={[{ required: true, message: 'Vui lòng nhập giá nhập vào' }]}
                                >
                                    <Input
                                        placeholder="VD: 123456"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="price"
                                    label="Giá bán (đ)"
                                    rules={[{ required: true, message: 'Vui lòng nhập giá bán' }]}
                                >
                                    <Input
                                        placeholder="VD: 123456"
                                    />
                                </Form.Item>
                            </Col>

                        </Row>
                        {!isEditting ?
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        name="sizeQuantity"
                                        label='Kích cỡ & Số lượng'
                                        rules={[{ required: true, message: 'Please enter sizes & quantities' }]}
                                    >
                                        <Form.List name="sizeQuantity">
                                            {(fields, { add, remove }) => {
                                                return (
                                                    <>
                                                        <Row gutter={16}>
                                                            {fields.map(({ key, name }) => (
                                                                <Col span={12} key={key}>
                                                                    <Space style={{ display: 'flex', justifyContent: 'center' }} align="center">
                                                                        <Form.Item
                                                                            label='Kích cỡ'
                                                                            name={[name, 'size']}
                                                                            rules={[{ required: true, message: 'Vui lòng nhập!' }]}
                                                                        >
                                                                            <Input placeholder="Size" />
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            label='Số lượng'
                                                                            name={[name, 'quantity']}
                                                                            rules={[{ required: true, message: 'Vui lòng nhập!' }]}
                                                                        >
                                                                            <InputNumber min={1} placeholder="quantity" />
                                                                        </Form.Item>
                                                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                                                    </Space>
                                                                </Col>
                                                            ))}
                                                        </Row>
                                                        <Form.Item>
                                                            <Button style={{ height: '100%' }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                                Thêm
                                                            </Button>
                                                        </Form.Item>
                                                    </>

                                                )
                                            }}

                                        </Form.List>
                                    </Form.Item>
                                </Col>
                            </Row>

                            :

                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        name="sizeQuantity"
                                        label="Kích cỡ & Số lượng"
                                        rules={[{ required: true, message: 'Please enter sizes & quantities' }]}
                                    >
                                        <Form.List name="sizeQuantity">
                                            {(fields) => {
                                                return (
                                                    <Row gutter={16}>
                                                        {fields.map(({ key, name }) => {
                                                            return (
                                                                <Col key={key} span={12}>
                                                                    <Space style={{ display: 'flex', justifyContent: 'center' }} align="baseline">
                                                                        <Form.Item
                                                                            label='Kích cỡ'
                                                                            name={[name, 'size']}
                                                                            rules={[{ required: true, message: 'Vui lòng nhập!' }]}
                                                                        >
                                                                            <Input placeholder="Size" disabled />
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            label='Số lượng'
                                                                            name={[name, 'quantity']}
                                                                            rules={[{ required: true, message: 'Vui lòng nhập!' }]}
                                                                        >
                                                                            <InputNumber min={1} placeholder="quantity" />
                                                                        </Form.Item>
                                                                    </Space>
                                                                </Col>
                                                            )
                                                        })}
                                                    </Row>
                                                )
                                            }}
                                        </Form.List>
                                    </Form.Item>
                                </Col>
                            </Row>
                        }
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Mô tả"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mô tả sản phẩm',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="Please enter description" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="thumbnail"
                                    label="Ảnh chính"
                                    rules={[{
                                        required: true,
                                        message: 'Vui lòng chọn ảnh!',
                                        validator: validateFileList
                                    }]}
                                >

                                    <Upload
                                        listType="picture-card"
                                        beforeUpload={(file) => {
                                            // console.log(">>> file: ", file);
                                            return false;
                                        }}
                                        onChange={onChange}
                                        fileList={fileList}
                                        maxCount={1}
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

export default ProductAdmin;