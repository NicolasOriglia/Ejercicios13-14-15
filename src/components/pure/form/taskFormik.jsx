import React, { useRef } from 'react';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

//Models
import { LEVELS } from '../../../models/levels.nums';
import { Task } from '../../../models/task.class';


const TaskFormik = ({length, add}) => {

    const nameRef= useRef('');
    const descriptionRef= useRef('');
    const levelRef= useRef(LEVELS.NORMAL);


   const initialValues = { 
    name: '',  
    description: '', 
    completed: false,  
    level : LEVELS.NORMAL }

    const validationSchema = Yup.object({
        name: Yup.string().required('***Title is required***').max(10, '***Title too long***'),
        description: Yup.string().required('***decription is required***'),
    })

    function addTask(){
       
        const newTask = new Task(
            nameRef.current.value,
            descriptionRef.current.value,
            false,
            levelRef.current.value,
        )
        add(newTask);
    }

    return(
        <div className= 'd-flex justify-content-center align-items-center mb-4'>
        
        <Formik
        initialValues={initialValues}
        validationSchema = {validationSchema}
        onSubmit={addTask} 
        >
            {({  touched, errors, })=> (
                <Form className='form-outline flex-fill'>
                    <h4>New Task</h4>
                    <label htmlFor="name">Task title</label>
                    <Field 
                    innerRef = {nameRef}
                    id="name" 
                    name="name" 
                    placeholder="Title.."
                    className='form-control form control-lg'
                    />
                    
                    {/* Name Error */}
                    {errors.name && touched.name && (
                        <ErrorMessage name="name" component='div'></ErrorMessage>
                    )}

                    <label htmlFor="description">Description</label>
                    <Field 
                    innerRef = {descriptionRef}
                    id="description"
                    name="description"
                    placeholder="Insert a description.."
                    className='form-control form control-lg'               
                    />

                    {errors.description && touched.description && (
                        <ErrorMessage name="description" component='div'></ErrorMessage>
                    )}

                    <label htmlFor="level">Select priority level</label>
                    <Field 
                    innerRef = {levelRef}
                    name="level" 
                    id="level" 
                    as="select" 
                    className='form-control form control-lg'
                    
                    >
                        <option value={LEVELS.NORMAL}>Normal</option>
                        <option value={LEVELS.URGENT}>Urgente</option>
                        <option value={LEVELS.BLOCKING}>Blocking</option>
                    </Field>
                    
                    <button type='submit' className='btn btn-success btn-lg ms-2'>
                        {length > 0 ? 'Add New Task' : 'Create Your First Task'}
                    </button>
                </Form>
            )}    
        </Formik>
    </div>
    )
};


export default TaskFormik;
