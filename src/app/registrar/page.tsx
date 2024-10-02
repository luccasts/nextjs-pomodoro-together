"use client"
import { app } from "@/lib/firebase"
import { getAuth, sendSignInLinkToEmail } from "firebase/auth"
import { FormEvent, useState } from "react"

export default function Registrar() {


    const [inputEmailValue, setinputEmailValue] = useState("")
    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'https://www.example.com/finishSignUp?cartId=1234',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
            bundleId: 'com.example.ios'
        },
        android: {
            packageName: 'com.example.android',
            installApp: true,
            minimumVersion: '12'
        },
        dynamicLinkDomain: 'example.page.link'
    };

    function validateEmail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const auth = getAuth(app);
        sendSignInLinkToEmail(auth, inputEmailValue, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', inputEmailValue);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });
    }
    return (

        <main>
            <form onSubmit={(e) => validateEmail(e)}>
                <label htmlFor="email">E-mail</label>
                <input value={inputEmailValue || ""} onChange={(e) => setinputEmailValue(e.target.value)} id="email" type="email" placeholder="Informe o seu E-mail" />
                <button disabled={inputEmailValue.length > 3 ? false : true}>Registrar</button>
            </form>
        </main>

    )
}