{
    let tasks = [
    ];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, },
        ]
        render();
    }

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ]
        render();
    }

    const toggleTaskDone = (index) => {
        tasks = tasks.map((task, taskIndex) => (taskIndex === index) ? ({ ...task, done: !task.done }) : ({ ...task }));
        render();
    }

    const bindEvenets = () => {

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }


    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="listItem">
                <button class="js-done list__button list__button--done"> ✓ </button>
                    <span class="${task.done ? " listItem--done" : ""}">${task.content}</span>
                <button class="js-remove list__button list__button--remove">🗑</button>
                </li>

        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvenets();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-input").value.trim();

        if (newTaskContent === "") {
            document.querySelector(".js-input").focus();
            return
        };
        addNewTask(newTaskContent);

        document.querySelector(".js-input").value = "";
    }


    const init = () => {

        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}