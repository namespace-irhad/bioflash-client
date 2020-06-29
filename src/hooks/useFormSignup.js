import {
    useState
} from 'react'


const useFormSignup = (callback) => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = event => {
        const {
            name,
            value
        } = event.target
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleSubmit = event => {
        event.preventDefault()
        callback()
    }

    return {
        values,
        handleChange,
        handleSubmit
    }

}

export default useFormSignup;