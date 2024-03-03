
import { setNestedObjectValues, useFormik } from "formik"
import * as Yup from 'yup'
type FormValueType = {
    name: string,
    email: string,
    channel: string,
}
type FormValueErrorType = {
    name: string,
    email: string,
    channel: string
}

const initialValues = {
    name: "",
    email: "",
    channel: ""
}
const onSubmit = (values: FormValueType) => {
    console.log('Form data', values)
}
const validate = (values: FormValueType) => {
    // error attribute has to be coresponded to the name 
    let errors = {} as FormValueErrorType
    if (!values.name) {
        errors.name = 'Required'
    }
    if (!values.email) {
        errors.email = 'Required'
    }
    else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(values.email)) {
        errors.email = 'Invalid email format'
    }
    if (!values.channel) {
        errors.channel = 'Required'
    }
    return errors
}

const validationSchema = Yup.object({
    name:Yup.string().required('Required'),
    email:Yup.string().email('Invalid email format').required('Required'),
    channek:Yup.string().required('Required')
})

function YoutubeForm() {
    const formik = useFormik({
        initialValues,
        onSubmit,
        // validate,
        validationSchema
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                    ></input>
                    {formik.touched.name && (formik.errors.name && <div className="error">{formik.errors.name}</div>)}
                </div>

                <div className="form-control">
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    ></input>
                    {formik.touched.email && (formik.errors.email && <div className="error">{formik.errors.email}</div>)}
                </div>

                <div className="form-control">
                    <label htmlFor='name'>Channel</label>
                    <input type='text' id='channel' name='channel'
                        onChange={formik.handleChange}
                        value={formik.values.channel}
                        onBlur={formik.handleBlur}
                    ></input>
                    {formik.touched.channel && (formik.errors.channel && <div className="error">{formik.errors.channel}</div>)}
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default YoutubeForm
