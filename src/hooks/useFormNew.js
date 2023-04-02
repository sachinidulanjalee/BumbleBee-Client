import React, { useState } from 'react'

export function useFormNew(initialFValues, validateOnChange = false, validate) {

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const handleSelectChange = (name,value) => {
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const handleCheckBoxChange = (name, value, array,id ) =>{

        if (value)  array.push(id) 
        else
        {
           var index = array.indexOf(id);
            if (index > -1) {
                array.splice(index, 1);
            }
        }  
        setValues({
            ...values,
            [name]: array
        })

        if (validateOnChange)
            validate({ [name]: array })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleSelectChange,
        resetForm,
        handleCheckBoxChange

    }
}
