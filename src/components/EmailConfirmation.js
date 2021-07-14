import { useEffect } from "react";
import EmailService from "../adapters/emailService";

const EmailConfirmationPage = () => {

    const response = "a";

    useEffect(() => {
        const token = window.location.pathname.split('/email/verification/')[1];
        EmailService.confirmToken(token).then(res => {
            console.log(res);
            response = res;
        })
        .catch((error) => {
            console.log(error);
        })

    })
    return (
        <>
        <h1>Crumbs Email Verification</h1>
        <h1>{response}</h1>
        </>
    )

}
export default EmailConfirmationPage;