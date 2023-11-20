
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { storageFirebase } from "./firebase";
import { openNotification } from '../../functions/Notification';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PlusOutlined, MinusCircleOutlined, } from '@ant-design/icons';
import { Modal, Upload, Button, Col, Form, Input, Row, Select, Space, Typography, notification, UploadFile, UploadProps } from 'antd';
import TableProduct from "../../components/pages/admin/TableProduct";
import { getAllBrands } from "../../redux/actions/actionsBrand";
import { getAllProducts, postProduct, updateProduct } from "../../redux/actions/actionsProduct";

const { Option } = Select;

const ProductAdmin = () => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditting, setIsEditting] = useState(false)
    const [isChangeImg, setIsChangeImg] = useState(false)
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const dispatch = useDispatch()
    const allBrands = useSelector((state: any) => state.brands.brands?.allBrands?.data)
    const user = useSelector((state: any) => state.auth.login?.currentUser)

    useEffect(() => {
        getAllProducts(user?.accessToken, dispatch)
        getAllBrands(user?.accessToken, dispatch)
    }, [])

    const validateFileList = (_: any, fileList: any) => {
        if (fileList.fileList?.length == 0) {
            return Promise.reject('Please select one file to upload.');
        }
        else {
            return Promise.resolve();
        }
    };

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
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

    const openEdit = (record: any,) => {
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

    const onFinish = async (e: any) => {
        if (!isEditting) {
            const imgRef = ref(storageFirebase, `images/thumbnail/${e.thumbnail.fileList[0].name}`);
            await uploadBytes(imgRef, e.thumbnail.fileList[0].originFileObj)
            const url = await getDownloadURL(imgRef)
            // console.log('url', url)
            const body = await { ...e, thumbnail: url };
            await postProduct(user.accessToken, dispatch, body)
            openNotification('Thêm thành công', 'success')
            setOpen(false)
            setIsChangeImg(false)
        } else {
            if (isChangeImg) {
                const imgRef = ref(storageFirebase, `images/thumbnail/${e.thumbnail.fileList[0].name}`);
                await uploadBytes(imgRef, e.thumbnail.fileList[0].originFileObj)
                const url = await getDownloadURL(imgRef)
                // console.log('url', url)
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
        <div>
            <Button type="primary" style={{ marginBottom: 20 }} onClick={handleAdd} icon={<PlusOutlined />}>
                Add product
            </Button>
            <TableProduct openEdit={openEdit} />
            <Modal
                title={isEditting ? "Edit product" : "Add a new product"}
                width={720}
                onCancel={onClose}
                open={open}
                footer={null}
            >
                <Form onFinish={(e) => onFinish(e)} form={form} layout="vertical" name="dynamic_form_complex"
                    initialValues={{ sizesQuantity: [{}] }}
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
                                label="Title"
                                rules={[{
                                    required: true, message: 'Please enter title'
                                }]}
                            >
                                <Input placeholder="Please enter title" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>

                        <Col span={12}>
                            <Form.Item
                                name="brand_id"
                                label="Brand"
                                rules={[{ required: true, message: 'Please select an brand' }]}
                            >
                                <Select placeholder="Please select an brand">
                                    {
                                        allBrands?.map((brand: any) => {
                                            return (
                                                <Option key={brand.id} value={brand.id} >{brand.id}-{brand.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[{ required: true, message: 'Please enter price' }]}
                            >
                                <Input
                                    placeholder="Please enter price"
                                />
                            </Form.Item>
                        </Col>

                    </Row>
                    {!isEditting &&
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="sizeQuantity"
                                    label='Size & Quantity'
                                >
                                    <Form.List name="sizeQuantity" >
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name }) => (
                                                    <Space key={key} style={{ display: 'flex' }} align="baseline">
                                                        <Form.Item
                                                            label='size'
                                                            name={[name, 'size']}
                                                            rules={[{ required: true, message: 'Missing size' }]}
                                                        >
                                                            <Input placeholder="Size" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            label='quantity'
                                                            name={[name, 'quantity']}
                                                            rules={[{ required: true, message: 'Missing quantity' }]}
                                                        >
                                                            <Input placeholder="quantity" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                                    </Space>
                                                ))}
                                                <Form.Item>
                                                    <Button style={{ height: '100%' }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                        Add field
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}

                                    </Form.List>
                                </Form.Item>
                            </Col>
                        </Row>
                    }

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter url description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="Please enter url description" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="thumbnail"
                                label="Thumbnail"
                                rules={[{
                                    required: true,
                                    message: 'Please select one file to upload',
                                    validator: validateFileList
                                }]}
                            >

                                <Upload
                                    listType="picture-card"
                                    beforeUpload={(file: any) => {
                                        // console.log(">>> file: ", file);
                                        return false;
                                    }}
                                    onChange={onChange}
                                    fileList={fileList}
                                    maxCount={1}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    {isEditting ? "Save" : "Submit"}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item noStyle shouldUpdate>
                        {() => (
                            <Typography>
                                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                            </Typography>
                        )}
                    </Form.Item>
                </Form>

            </Modal >
        </div >
    );
}

export default ProductAdmin;