import { useEffect, useState } from 'react';
import EmailService from "../adapters/emailService";

const EmailConfirmationPage = () => {
    
    const [response, setResponse] = useState();

    useEffect(() => {
        const token = window.location.pathname.split('/email/verification/')[1];
        
        EmailService.confirmToken(token).then(res => {
            setResponse(res.data);
        })
        .catch(() => {
            setResponse("Invalid token.")
        })
    },[])
    return (
        <>
        <div className="container p-3 my-3 "><h1 >{response}</h1></div>
        </>
    )

}
export default EmailConfirmationPage;