import React from 'react';
import PropTypes from 'prop-types';
//Models
import { Task } from '../../models/task.class';
import { LEVELS } from '../../models/levels.nums';
//Styles inline
import '../../styles/task.scss';

const TaskComponent = ({ task, complete, remove }) => {

    function taskLevelBadge(){
        switch(task.level){
            case LEVELS.NORMAL :
                return(<h6 className='mb-0'>
                    <span className='badge bg-primary'>{task.level}</span>
                </h6>)
            case LEVELS.URGENT :
                return(<h6 className='mb-0'>
                    <span className='badge bg-warning'>{task.level}</span>
                </h6>)    
            case LEVELS.BLOCKING :
                return(<h6 className='mb-0'>
                    <span className='badge bg-danger'>{task.level}</span>
                </h6>)    
            default:
                break;    
        }
    }

    function taskIconCompleted(){
        if(task.completed){
            return(<i onClick={()=>complete(task)} className='bi-toggle-on task-action' style={{color: 'green', fontWeight: 'bold' }}></i>)
        }else{
            return(<i onClick={()=>complete(task)} className='bi-toggle-off task-action' style={{color:'grey', fontWeight:'bold'}}></i>)
        }
    }

    const taskCompleted ={
        color: 'grey',
        textDecoration: 'line-through'
    }

    const taskPending={
        fontWeight: 'bold',
        color: 'rgb(228, 0, 0)'
    }

    return (

        <tr className='fw-normal' style={task.completed? taskCompleted : taskPending}>
            <th><span className='ms-2'>{task.name}</span></th>
            <td className='align-middle'><span>{task.description}</span></td>
            <td className='align-middle'>{taskLevelBadge()}</td>
            <td className='align-middle'>{taskIconCompleted()}
            <i className='bi-trash task-action' onClick={()=>remove(task)} style={{color:'tomato'}}></i>
            </td>
        </tr>
       
       
       // <div>
       //     <h2 className='task-name'>Nombre: {task.name}</h2>
       //     <h3>Description: {task.description}</h3>
       //     <h4>Level: {task.level}</h4>
       //     <h5>This task is : { task.completed ? 'completed' : 'pending' }</h5>
       //</div>
    );
};


TaskComponent.propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    complete: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
};


export default TaskComponent;