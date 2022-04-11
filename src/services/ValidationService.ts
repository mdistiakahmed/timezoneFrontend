import { SignupFormErrors } from "../views/pages/signup/useSignupLogic";


export default class ValidationService {

    static signupFormValidate(name:string, value:string,errors:SignupFormErrors, setErrors: any,password: string) {
        switch (name) {
            case 'email':
                ValidationService.emailValidation(value, errors, setErrors);
            break;
            case 'password':
                ValidationService.passwordValidation(value,errors, setErrors);
            break;
            case 'confirmpassword':
                ValidationService.confirmPasswordValidation(value,password,errors, setErrors);
                break;
            
            default:
                break;
        }
    }

    static singUpFromSubmitValidate(inputdata: FormData, errors:SignupFormErrors):boolean {
        const email = '' + inputdata.get('email')?.toString();
        const password = '' + inputdata.get('password')?.toString();
        const confirmpassword = '' + inputdata.get('confirmpassword')?.toString();
        if(errors.confirmPasswordError || errors.emailError || errors.passwordError ||email.length===0 || password.length===0 || confirmpassword.length===0 || password !== confirmpassword) {
            return true;
          } else {
            return false;
          }
    }


    static async emailValidation(email: string,errors:SignupFormErrors, setErrors: any) {
        if(
            email.length>0 &&  !new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)
        ){
            setErrors({
                ...errors,
                emailError:'Enter a valid email address'
            });
        }else{
            setErrors({...errors, emailError: undefined}); 
        }
    }

    static async passwordValidation(password: string,errors:SignupFormErrors, setErrors: any) {
        if(
            password.length > 0 && !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(password)
        ){
            setErrors({
                ...errors,
                passwordError:'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
            })
        }else{
            setErrors({...errors, passwordError: undefined}); 
        }
    }

    static async confirmPasswordValidation(confirmpassword: string,password: string, errors:SignupFormErrors, setErrors: any) {
        if(confirmpassword.length > 0 && confirmpassword !== password){
            setErrors({
                ...errors,
                confirmPasswordError:'Password does not match'
            })
        }else{
            setErrors({...errors, confirmPasswordError: undefined}); 
        }
    }
}