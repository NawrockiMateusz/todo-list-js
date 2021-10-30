{
    const tasks = [
        {
            content: "Zrobić zadanie z kursu",
            done: false
        },
        {
            content: "Obejrzeć lekcje z modułu 6",
            done: true
        }

    ];

    const render = () => {
      let htmlString = "";

      for(const task of tasks){
          htmlString += `
          <li>
            ${task.content}
          </li>
          `
      }

      document.querySelector(".js-tasks").innerHTML = htmlString;

    }


    render();




    const init = () => {
        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("click", (event) => {
            event.preventDefault();
        })
    }

    init();
}