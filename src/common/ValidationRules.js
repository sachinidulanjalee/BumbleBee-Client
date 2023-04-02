export default function getValidationRule(code) {
  
    switch (code) {
      case "email":
        return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
      case "nic":
        return /^([0-9]{9}[x|X|v|V])|([0-9]{12})$/;
  
      default:
        return /[^A-Za-z0-9]+/;
        break;
    }
  }
  