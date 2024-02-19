import dayjs from "dayjs";
import { Input, Rate, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { dateFormat } from "../../../../functions/dateFormat";
import SubmitBtn from "../../../Form/SubmitBtn";
import { BASE_URL } from "../../../../config";
import axios from "axios";

const Comment = ({ dataComment, productID }) => {
    const currentUser = useSelector((state) => state.auth.login?.user)
    const navigate = useNavigate()
    const modifiedComment = dataComment.map((item) => {
        return ({
            ...item,
            created_at: dateFormat(item.created_at)
        })
    })
    const [comment, setComment] = useState(modifiedComment)
    const [form] = Form.useForm();
    useEffect(() => {
        console.log('render')
    }, [comment])
    const onFinish = async (e) => {
        if (!currentUser) {
            navigate('/sign-in')
        } else {
            // 
            const body = {
                ...e,
                product_id: productID,
                user_id: currentUser.id,
                created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
            }
            const res = await axios.post(`${BASE_URL}/product/comment`, body)
            if (res.data) {
                console.log('body', body)
                const newComment = {
                    ...body,
                    avatar: currentUser.avatar,
                    fullname: currentUser.fullname,
                    created_at: dayjs().format('DD-MM-YYYY HH:mm:ss')
                }
                setComment(
                    [...comment,
                        newComment
                    ]
                )
                form.resetFields()
                console.log(e)
            }
        }

    }
    return (
        <div className="row justify-content-between">
            <div className="col-xl-7">
                <h5 style={{ padding: 10 }}>Tổng đánh giá</h5>
                {
                    comment.map((item, index) => {
                        return (
                            <div className="row comment" key={index}>
                                <div className="col-xl-2 text-center user-image" >
                                    <img src={`${BASE_URL}/image/${item.avatar}`} alt="" />
                                </div>
                                <div className="col-xl-7">
                                    <div className="user-info">
                                        <span className="username">
                                            {item.fullname}
                                        </span>
                                        <span className="user-rating">
                                            <Rate disabled allowHalf={true} defaultValue={item.rating} style={{ fontSize: 13 }} />
                                        </span>
                                    </div>
                                    <div className="user-comment">
                                        {item.comment}
                                    </div>

                                </div>
                                <div className="col-xl-3 comment-time">
                                    {item.created_at}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="col-xl-4">
                <h5 style={{ padding: 10 }}>Viết đánh giá</h5>
                <Form
                    form={form}
                    name="formComent"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Bình luận"
                        name="comment"
                        rules={[{ required: true, message: 'Vui lòng nhập bình luận!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="rating" label="Đánh giá"
                        rules={[{ required: true, message: 'Vui lòng đánh giá!' }]}
                    >
                        <Rate allowHalf initialValues={0} />
                    </Form.Item>
                    <Form.Item>
                        <SubmitBtn form={form} text={'Gửi'} />
                    </Form.Item>
                </Form>
            </div>
        </div >

    );
}

export default Comment;