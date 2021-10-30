{
    const tasks = [
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <div class="list__container">
            <button class="list__button--done">✅</button>
                <li class="listItem${task.done ? " listItem--done" : ""}">
                    ${task.content}
                </li>
            <button class="list__button--remove">❌</button>
        </div>
        `
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    }

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