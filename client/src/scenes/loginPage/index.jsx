
import Form from "./Form.jsx";
import { useState } from "react";


const LoginPage = () => {
  
  const [pageType] = useState("");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  return (
    
          
          <Form />
        
  );
};

export default LoginPage;
