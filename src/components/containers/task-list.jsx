import React, { useState, useEffect } from 'react';
import TaskComponent from '../pure/task';


//models
import { Task } from '../../models/task.class';
import { LEVELS } from '../../models/levels.nums';
import TaskFormik from '../pure/form/taskFormik';





const TaskListComponent = () => {

    const defaultTask1 = new Task('Example1', 'Default description1', true, LEVELS.NORMAL);
    const defaultTask2 = new Task('Example2', 'Default description2', false, LEVELS.URGENT);
    const defaultTask3 = new Task('Example3', 'Default description2', false, LEVELS.BLOCKING);

    const [tasks, setTasks] = useState([defaultTask1, defaultTask2, defaultTask3]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Task State has been modified')
        setTimeout(()=>{
            setLoading(false);
        },2000);
        return () => {
            console.log('TaskList component is going to unmount..')
        };
    }, [tasks]);

    function completeTask(task) {
        console.log('complete this task : ', task)
        const index = tasks.indexOf(task);
        const tempTask = [...tasks];
        tempTask[index].completed = !tempTask[index].completed;
        setTasks(tempTask);
    };

    function deleteTask(task) {
        console.log('complete this task : ', task)
        const index = tasks.indexOf(task);
        const tempTask = [...tasks];
        tempTask.splice(index, 1);
        setTasks(tempTask);
    };

    function addTask(task){
        const tempTask = [...tasks];
        tempTask.push(task);
        setTasks(tempTask);
    }

    const Table =()=>{
        return (
            <table>
                <thead>
                    <tr>
                        <th scope='col'>Title</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Priority</th>
                        <th scope='col'>Actions</th>                                
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task,index)=> {
                        return <TaskComponent 
                        key={index} 
                        task={task} 
                        complete={completeTask}
                        remove={deleteTask}
                        >
                        
                        </TaskComponent>
                    })}

                </tbody>
            </table>
        )
    }

    let tasksTable;

    if(tasks.length > 0){
        tasksTable = <Table></Table>
    }else{
        tasksTable = (<div>
            <p style={{color:'grey'}}>There aren't tasks to show</p>
            <p style={{color:'grey'}}>Please, create one...</p>
        </div>)
    }

    const loadingStyle = {
        color: 'grey',
        fontSize: '16px',
    }

    return (
        <div>
            <div className='col-12'>
                <div className='card'>
                 {/*card header*/}
                    <div className='card-header p-3'>
                        <h5>Your Tasks:</h5>
                    </div>
                 {/*card body*/}
                    <div className='card-body' data-mdb-prefect-scrollbar='true' style={{position: 'relative', height:'400px'}}>
                        {loading ? (<p style={loadingStyle}>Loading Tasks..</p>) : tasksTable}
                    </div>
                </div>
             
            </div>
            <TaskFormik add={addTask} length={tasks.length}></TaskFormik>
            {/*Aplicar un for o map para renderizar una lista*/}
            {/* <TaskComponent task={defaultTask}></TaskComponent> */}
        </div>
    );
};


export default TaskListComponent;