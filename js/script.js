{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, },
        ]
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ]
        render();
    };

    const toggleTaskDone = (index) => {
        tasks = tasks.map((task, taskIndex) => (taskIndex === index) ? ({ ...task, done: !task.done }) : ({ ...task }));
        render();
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `

            <li class="listItem ${task.done && hideDoneTasks ? "listItem--hidden" : ""}">
                <button class="js-done list__button list__button--done">
                 ${task.done ? "✓" : ""}
                 </button>
                    <span class="${task.done ? " listItem--done" : ""}">
                    ${task.content}
                    </span>
                <button class="js-remove list__button list__button--remove">
                🗑
                </button>
            </li>

        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const markAllDoneTasks = () => {
        tasks = tasks.map(task => ({ ...task, done: true }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (tasks.length === 0) {
            buttonsElement.innerHTML = "";
            return;
        };

        buttonsElement.innerHTML = `
        <button class="section__button js-hideDone">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="section__button js-allDone"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}>
            Ukończ wszystkie
        </button>
        `;
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const bindButtonsEvents = () => {
        const hideDoneButton = document.querySelector(".js-hideDone");
        const allDoneButtons = document.querySelector(".js-allDone");

        if (hideDoneButton && allDoneButtons) {
            hideDoneButton.addEventListener("click", toggleHideDoneTasks);
            allDoneButtons.addEventListener("click", markAllDoneTasks);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
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
    };


    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}