import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "./alert.css";

alertify.defaults.notifier.position = "top-center";
// alertify.defaults.notifier.position = 'top-right';
alertify.defaults.transition = "fade";

export default function Alert(Message, type) {
  switch (type) {
    case 1:
      alertify.success(Message);
      break;
    case 2:
      alertify.warning(Message);
      break;
    case 3:
      alertify.error(Message);
      break;
    default:
      alertify.success(Message);
      break;
  }
}
