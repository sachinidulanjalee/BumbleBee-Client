export default function getMessage(code) {
  //try to use this HTTP response status codes : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses

  switch (code) {
    case 201:
      return "Record Insertion Successful!";

    case 202:
      return "Record Updation Successful!";

    case 203:
      return "Record Deletion Successful!";

    case 301:
      return "Record Insertion Failure!";

    case 302:
      return "Record Updation Failure!";

    case 303:
      return "Record Deletion Failure!";

    case 400:
      return "Data Loading Failure!";

    case 500:
      return "Recod Already Exsists!";

    case 503:
      return "The server is not ready to handle the request";

    default:
      //alertify.success(Message);
      break;
  }
}
