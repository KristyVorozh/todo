import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import newToDoStore from "../../store/ToDoStore";
import './style.sass';
import Delete from './img/trash-can-solid.svg';

const Main = () => {
    const [state, setState] = React.useState(newToDoStore.tasksArray);

    const filterTasksActive = (status: string) => {
        let lastArrayTodo = newToDoStore.tasksArray
        if (status !== 'all'){
            setState(lastArrayTodo.filter((value) => status === value.category))
        }
        else setState(lastArrayTodo)
    }

    useEffect(()=>{
        newToDoStore.getItemLocalStorage()
    },[])

    useEffect(() => {
        setState(newToDoStore.tasksArray);
    }, [newToDoStore.tasksArray]);

    return (
        <div className='main'>
            <div className="main_category">
                <p onClick={()=>filterTasksActive('all')}>All</p>
                <p onClick={()=>filterTasksActive('active')}>Done</p>
                <p onClick={()=>filterTasksActive('inActive')}>Not done</p>
            </div>
            <div className="main_todo">
                <div className="main_todo-input">
                    <input
                        type="text"
                        placeholder='Add a new task'
                        value={newToDoStore.titleTask || ''}
                        onChange={(e)=>newToDoStore.handleChange(e)}
                    />
                    <div className="main_todo-button">
                        <button onClick={()=>newToDoStore.addTasks()}>Добавить</button>
                        <button onClick={()=> newToDoStore.saveArray()}>Сохранить</button>
                    </div>
                </div>
                <div className="main_todo-list">
                    {
                        state?.map((value, index)=>
                            <div className='main_todo-list-content' key={value.id}>
                                <input
                                    type="checkbox"
                                    checked={value.isActive}
                                    onChange={(e)=>newToDoStore.handleChangeChecked(e, index)}
                                />
                                <p className={value.isActive ? 'checked' : ''}>{value.title}</p>
                                <img
                                    src={Delete}
                                    onClick={()=>newToDoStore.removeTasks(index)}
                                    alt={Delete}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default observer(Main);
