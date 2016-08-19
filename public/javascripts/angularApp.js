var app = angular.module('taskListApp', []);

app.controller('TaskListController', function(){

        var taskList = this;
        console.log(this);

        taskList.list = [
                        {taskName:'Cook', done:true},
                        {taskName:'Eat', done:true},
                        {taskName:'Go out', done:false}
                      ];

        taskList.addTask = function(){
          taskList.list.push({taskName:taskList.txtNewTask, done:false})
          taskList.txtNewTask = "";
        };

        taskList.tasksNotDone = () => {
           var tasknotdone = 0;
           angular.forEach(taskList.list, (task)=>{
            tasknotdone += task.done ? 0 : 1;
           });
           return tasknotdone;
        };

        taskList.Archive = ()=>{
          var oldTasks = taskList.list;
          taskList.list = [];
          angular.forEach(oldTasks, function(task){
            if(!task.done) taskList.list.push(task);
          });
        };
});
