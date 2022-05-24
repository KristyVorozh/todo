import {makeAutoObservable} from "mobx";
import {toDoArrayType} from "../type/ToDoArrayType";
import React from "react";

class ToDoStore {
    public tasksArray: Array<toDoArrayType> = []
    public titleTask: string | any = ''
    public filterArray: Array<toDoArrayType> = []
    constructor() {
        makeAutoObservable(this)
    }

    addTasks = () => {
        let lo1: toDoArrayType = {
            id: this.tasksArray.length !== 0 ? this.tasksArray.length + 1 : 1,
            title: this.titleTask,
            isActive: false,
            category: 'all' && 'active',
        }
        if (this.titleTask !== '') this.tasksArray.push(lo1)
        this.titleTask = ''
    }
    handleChange = (e: { target: { value: string | undefined; }; }) => {
        this.titleTask = e.target.value;
    };
    getItemLocalStorage = () => {
        this.tasksArray = JSON.parse(localStorage.getItem("toDoArray") || "[]")
    }
    removeTasks = (index: number) => {
        this.tasksArray = this.tasksArray.filter((value, indexTask)=> indexTask !== index)
        localStorage.setItem('toDoArray', JSON.stringify(this.tasksArray))
    }
    saveArray = () => {
        localStorage.setItem('toDoArray', JSON.stringify(this.tasksArray))
    }
    handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        this.tasksArray.forEach((value, indexArray)=>{
            if (index === indexArray) {
                value.isActive = e.target.checked
                if (value.isActive) value.category = 'active'
                else value.category = 'inActive'
            }
        })
    }
}

const newToDoStore = new ToDoStore()

export default newToDoStore
