import { notification } from "antd";

export const openNotification = (message, type) => {
    notification.open({
        type: type,
        message: message,
        duration: 2,
        placement: "top",
        style: { width: 450 }
    });
};
