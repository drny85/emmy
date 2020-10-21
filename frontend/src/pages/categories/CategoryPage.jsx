import { Container, Grid, Paper, Typography } from '@material-ui/core'
import React, {useEffect} from 'react'
import {Form, useForm} from '../../components/useForm'
import Controls from '../../components/controls/Controls'
import {useDispatch, useSelector} from  'react-redux'
import { addCategory } from '../../reduxStore/actions/categoryActions'
import Message from '../../components/Message'
import { getCategories } from '../../reduxStore/actions/categoryActions'

const CategoryPage = () => {
    const dispatch = useDispatch()
    const {error, categories} = useSelector(state => state.categoriesData)
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('name' in fieldValues)
        temp.name = fieldValues.name.length > 3 ? '': 'Required at least 3 characters'
       
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    console.log(categories)

    const handleSubmit = async e => {
        e.preventDefault()
        if (validate()){
           
          const submmited = await dispatch(addCategory(values.name))
          console.log(submmited)
          if (submmited) {
            resetForm()
          }
           
        }
    }
 
    const {values, handleInputChange, errors, setErrors, setValues, resetForm} = useForm({name: ''}, true, validate)
    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])
   
    return (
        <Container>
            <Paper style={{padding: '10px', marginTop: '50px', height: '60vh'}} elevation={6}>
            <Typography align='center' variant='h4'>Categories</Typography>
            <Grid container alignItems='center' justify='center' style={{marginTop: '50px'}}>
    
                <Grid item xs={12} md={8} lg={8}>
                {error && <Message type='error'>{error}</Message>}
                    <Form onSubmit={handleSubmit}>
                        <Controls.Input name='name' value={values.name} label='Category Name'  error={errors.name} onChange={handleInputChange} />

                        <Controls.Button   type='submit' text='Add Category' />
                    </Form>

                </Grid>
            </Grid>
            </Paper>
           
        </Container>

    )
}

export default CategoryPage
