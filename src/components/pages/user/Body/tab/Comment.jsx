import { Input, Rate, Form } from "antd";
import { dateFormat } from "../../../../../functions/dateFormat";
import SubmitBtn from "../../../../Form/SubmitBtn";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";

const Comment = ({ dataComment, productID }) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const navigate = useNavigate()
    const modifiedComment = dataComment.map((item) => {
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
                fullname: currentUser.user.fullname,
                created_at: moment().format('DD-MM-YYYY HH:mm:ss')
            }
            setComment(
                [...comment,
                    body
                ]
            )

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
                                    <img src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png" alt="" />
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
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="rating" label="Đánh giá"
                        rules={[{ required: true, message: 'Vui lòng đánh giá!' }]}
                    >
                        <Rate allowHalf initialValues={0} />
                    </Form.Item>
                    <Form.Item>
                        <SubmitBtn form={form} />
                    </Form.Item>
                </Form>
            </div>
        </div >

    );
}

export default Comment;