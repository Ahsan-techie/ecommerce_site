import React from 'react'
import {Grid,TextField} from '@material-ui/core'
import {useFormContext,Controller} from 'react-hook-form'

const CustomInputField = ({name,required,label}) => {
    const {control} = useFormContext()
    return (
        <Grid item xs={12} sm ={6}>
           <Controller 
               as={TextField}
               defaultValue=""
               control={control}
               fullWidth
               name={name}
               label={label}
               required={required}
           />

        </Grid>
    )
}

export default CustomInputField
