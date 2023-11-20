import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";
export const openNotification = (message: string, type: NotificationType) => {
    notification.open({
        type: type,
        message: message,
        duration: 2,
        placement: "top"
    });
};
