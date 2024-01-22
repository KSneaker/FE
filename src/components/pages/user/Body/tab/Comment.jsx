import { Input, Rate, Form } from "antd";
import { dateFormat } from "../../../../../functions/dateFormat";
import SubmitBtn from "../../../../Form/SubmitBtn";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../../../config";

const Comment = ({ dataComment, productID }) => {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const currentUser = useSelector((state) => state.auth.login?.user)
    console.log(currentUser)
    const navigate = useNavigate()
    const modifiedComment = dataComment.map((item) => {
        console.log(item)
        return ({
            ...item,
            created_at: dateFormat(item.created_at)
        })
    })
    const [comment, setComment] = useState(modifiedComment)
    // console.log(comment)
    // useEffect(() => {

    // }, [comment])
    const onFinish = (e) => {
        if (!currentUser) {
            navigate('/sign-in')
        } else {
            const body = {
                ...e,
                avatar: currentUser.avatar,
                fullname: currentUser.fullname,
                created_at: moment().format('DD-MM-YYYY HH:mm:ss')
            }
            setComment(
                [...comment,
                    body
                ]
            )
            form.resetFields()

        }
    }
    const [form] = Form.useForm();
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