let log = console.log.bind(console)
    taskArr = []
    oneDay = 24 * 60 * 60 * 1000
    today = new Date()

axios.get('hsz.json')
    .then(function(res) {
        data = res.data

        for (let t = 0; t < data.Tasks.length; t++) {
            let taskName = data.Tasks[t].Name
                taskTime = parseInt((new Date(data.Tasks[t].Finish).getTime() - new Date(data.Tasks[t].Start).getTime()) / oneDay)
                taskProgress = (parseInt((today.getTime() - new Date(data.Tasks[t].Start).getTime()) / oneDay) < 0) ? 0 : parseInt((today.getTime() - new Date(data.Tasks[t].Start).getTime()) / oneDay)
            taskArr[t] = []
            taskArr[t].push(taskName , [0 , taskTime] , parseInt((taskProgress / taskTime) * 100))

            log((new Date(data.Tasks[t].Finish).getTime() - new Date(data.Tasks[t].Start).getTime()))
            log((today.getTime() - new Date(data.Tasks[t].Start).getTime()))
            // log(parseInt((taskProgress / taskTime) * 100))
            // for(let c = 0; c = data.Tasks[t].children.length; c++) {
            //     log(c)
            // }
        }

        const tasks = taskArr.map(function(task, i) {
            // let today = new Date();
            // let start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            // let end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            // start.setDate(today.getDate() + name[1][0]);
            // end.setDate(today.getDate() + name[1][1]);

            let start = new Date(new Date(data.StartDate).getFullYear(), new Date(data.StartDate).getMonth(), new Date(data.StartDate).getDate())
                end = new Date(new Date(data.StartDate).getFullYear(), new Date(data.StartDate).getMonth(), new Date(data.StartDate).getDate())
            start.setDate(today.getDate() + task[1][0]);
            end.setDate(today.getDate() + task[1][1]);

            return {
                start: start,
                end: end,
                name: task[0],
                id: "Task " + i,
                progress: parseInt(task[2])
            }
        })

        // tasks[1].progress = 0;
        // tasks[1].dependencies = "Task 0"
        // tasks[2].dependencies = "Task 1"
        // tasks[3].dependencies = "Task 2"
        // tasks[5].dependencies = "Task 4"
        // tasks[5].custom_class = "bar-milestone"

        const gantt = Gantt("#gantt", tasks, {
            // on_click: function(task) {
            //     console.log(task);
            // },
            // on_date_change: function(task, start, end) {
            //     console.log(task, start, end);
            // },
            // on_progress_change: function(task, progress) {
            //     console.log(task, progress);
            // },
            // on_view_change: function(mode) {
            //     console.log(mode);
            // }
        })

        log(gantt)

        let QuarterDay = document.querySelector("#QuarterDay")
        HalfDay = document.querySelector("#QuarterDay")
        Day = document.querySelector("#Day")
        Week = document.querySelector("#Week")
        Month = document.querySelector("#Month")

        QuarterDay.onclick = () => {
            gantt.change_view_mode("Quarter Day")
        }
        HalfDay.onclick = () => {
            gantt.change_view_mode("Half Day")
        }
        Day.onclick = () => {
            gantt.change_view_mode("Day")
        }
        Week.onclick = () => {
            gantt.change_view_mode("Week")
        }
        Month.onclick = () => {
            gantt.change_view_mode("Month")
        }
    })
    .catch(function(error) {
        log(error)
    })
