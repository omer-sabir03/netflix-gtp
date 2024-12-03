export const handleFormValidation=(name,email,password,isSignInForm)=>{
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if(isSignInForm && (!name && name.trim()==='')){
        return " Name can not be empty ";
    }
    if(!emailReg.test(email)){
        return "Invalid Email";
    }
    if(!passreg.test(password)){
        return "Please set a valid password.";
    }
     
}