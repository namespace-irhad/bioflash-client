import {
    useState
} from 'react'

const useForm = (callback) => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSumbit = event => {
        event.preventDefault()
        callback()
    }

    return {
        handleChange,
        handleSumbit,
        values
    }
}

export default useForm