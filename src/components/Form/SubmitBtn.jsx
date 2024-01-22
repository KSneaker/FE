import { Button, Form } from "antd";
import { useState, useEffect } from "react";

const SubmitBtn = ({ form, text }) => {
    const [submittable, setSubmittable] = useState(false);
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);

    return (
        <Button style={{ width: '100%' }} type="primary" htmlType="submit" disabled={!submittable}>
            {text}
        </Button>
    );
};


export default SubmitBtn;