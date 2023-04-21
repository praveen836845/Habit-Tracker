import "./dist/css/App.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toggle from "./Components/Toggle";

function App() {
  // localStorage.clear()

  // Check if there are any tasks stored in local storage. If there are none, clear local storage.
  if (!localStorage.getItem("tasks")) {
    localStorage.clear();
  }

  // Define state variables using the useState hook.
  const [task, settask] = useState(""); // represents the current task being added to the list
  const [totaltask, setTotalTasks] = useState([]); // represents the list of all tasks
  const [load, setload] = useState(true); // used to toggle a refresh of the task list after changes
  const [day, setDay] = useState("");
  const [toggle, setToggle] = useState(false);

  // Define a function to handle the form submission when a new task is added.
  const submit = (e) => {
    e.preventDefault(); // prevent the default form submission behavior

    // Check if the task is empty or contains only whitespace.
    if (task === null || task === "" || task === " " || task === "   ") {
      toast("Task Can't be emply"); // notify the user that the task cannot be empty
    } else {
      let data = totaltask; // create a copy of the current task list
      data.push(task); // add the new task to the list
      setTotalTasks(data); // update the state variable with the new task list
      settask(""); // reset the task input field to be empty
      setload(!load); // toggle the refresh of the task list
      localStorage.setItem("tasks", totaltask); // store the task list in local storage
      toast("Task Added"); // notify the user that the task was added successfully
    }
  };

  // Define an effect hook that runs after the component is mounted.
  // This effect retrieves the task list from local storage and sets the state variable with it.
  useEffect(() => {
    let data = localStorage.getItem("tasks"); // retrieve the task list from local storage
    if (data != null) {
      const x = data.split(","); // split the task list into an array
      setTotalTasks(x); // set the state variable with the task list
    }
  }, []);

  // Define a function to handle deleting a task from the list.
  const deletetask = (index) => {
    let data = []; // create an empty array to hold the updated task list
    totaltask.map((item, i) => {
      if (i != index) {
        data.push(item); // add all tasks except the one being deleted to the new array
      }
    });
    setTotalTasks(data); // update the state variable with the new task list
    setload(!load); // toggle the refresh of the task list
    localStorage.setItem("tasks", data); // store the task list in local storage
    toast("Task Deleted"); // notify the user that the task was deleted successfully
  };

  // ********************************************************************************************************************************
  // An array of strings containing the names of all twelve months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // An array of strings containing the names of all seven days of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the current date and time
  const curr = new Date();

  // Calculate the dates of the first and last days of the current week
  const first = curr.getDate() + 1 - curr.getDay();
  const last = first + 6;

  // Calculate the dates of the second, third, fourth, fifth, and sixth days of the current week
  const second = first + 1;
  const third = first + 2;
  const fouth = first + 3;
  const fifth = first + 4;
  const sixth = first + 5;

  // Create Date objects for the first, second, third, fourth, fifth, and sixth days of the current week
  const firstday = new Date(curr.setDate(first));
  const lastday = new Date(curr.setDate(last));
  const secondday = new Date(curr.setDate(second));
  const thirdday = new Date(curr.setDate(third));
  const fourthday = new Date(curr.setDate(fouth));
  const fifthday = new Date(curr.setDate(fifth));
  const sixthday = new Date(curr.setDate(sixth));

  // Get the current month
  const currMonth = new Date().getMonth() + 1;

  // Get the names of the days of the week for the first, second, third, fourth, fifth, and sixth days of the current week
  const firstDayName = daysOfWeek[firstday.getDay()];
  const lastDayName = daysOfWeek[lastday.getDay()];
  const secondDayName = daysOfWeek[secondday.getDay()];
  const thirdDayName = daysOfWeek[thirdday.getDay()];
  const fourthDayName = daysOfWeek[fourthday.getDay()];
  const fiftDayName = daysOfWeek[fifthday.getDay()];
  const sixthDayName = daysOfWeek[sixthday.getDay()];

  // An empty array to be used later
  const arr = [];

  // ********************************************************************************************************************
  // Function to handle task click event and toggle task color
  const taskshow = (e) => {
    e = e || window.event;
    var target = e.target || e.srcElement;

    // If task is already marked as done, change color to undone
    if (target.style.backgroundColor === "green") {
      target.style.backgroundColor = "red";
      target.style.color = "white";
    }
    // If task is already marked as undone, change color to default
    else if (target.style.backgroundColor === "red") {
      target.style.backgroundColor = "white";
      target.style.color = "black";
    }
    // If task is not marked, change color to done
    else {
      target.style.backgroundColor = "green";
      target.style.color = "white";
    }

    e.stopPropagation();
  };

  // Function to mark task as done
  const markdone = (e) => {
    e.target.parentElement.parentElement.style.backgroundColor = "#1f242d";
    e.target.parentElement.parentElement.style.color = "white";
  };

  // Function to mark task as undone
  const markundone = (e) => {
    e.target.parentElement.parentElement.style.backgroundColor = "#FF7276";
    e.target.parentElement.parentElement.style.color = "white";
  };

  // Function to mark task as undone
  const undone = (e) => {
    e.target.parentElement.parentElement.style.backgroundColor = "transparent";
    e.target.parentElement.parentElement.style.color = "auto";
  };

  // Initialize state variable for task ID
  const [id, setid] = useState(1);

  return (
    <div className="main__container">
      <ToastContainer />
      <h1 id="title">Habit Tracker</h1>
      <div className="underline"></div>
      <br />
      <br />
      <div className="main__container_center">
        <form
          className="tracker_head"
          style={{ position: "relative", top: "-32px" }}
        >
          <input
            type="text"
            placeholder="Add Habit"
            onChange={(e) => {
              settask(e.target.value);
            }}
            value={task}
          />
          <button onClick={submit} className="hero__btn">
            Add Habit
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </form>

        <div
          className="tracker_body"
          style={{ position: "relative", top: "-115px" }}
        >
          <h1 id="title">Habit List </h1>
          <div className="underline"></div>

          {totaltask.map((item, index) => {
            return (
              <>
                <Toggle index={index} key={index} item={item}>
                  <div>
                    <h1 className="task__card-title ">{item}</h1>
                    <div class="container ">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              {firstday.getDate() +
                                "/" +
                                currMonth +
                                "/" +
                                firstday.getFullYear()}
                            </td>
                            <td> {firstDayName}</td>
                            <td>
                              <button onClick={markdone}>Done</button>
                            </td>
                            <td>
                              <button onClick={markundone}>Mark Undone</button>
                            </td>
                            <td>
                              <button onClick={undone}>Undone</button>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              {secondday.getDate() +
                                "/" +
                                currMonth +
                                "/" +
                                secondday.getFullYear()}
                            </td>
                            <td> {secondDayName}</td>
                            <td>
                              <button onClick={markdone}>Done</button>
                            </td>
                            <td>
                              <button onClick={markundone}>Mark Undone</button>
                            </td>
                            <td>
                              <button onClick={undone}>Undone</button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {thirdday.getDate() +
                                "/" +
                                currMonth +
                                "/" +
                                thirdday.getFullYear()}
                            </td>
                            <td> {thirdDayName}</td>
                            <td>
                              <button onClick={markdone}>Done</button>
                            </td>
                            <td>
                              <button onClick={markundone}>Mark Undone</button>
                            </td>
                            <td>
                              <button onClick={undone}>Undone</button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {fourthday.getDate() +
                                "/" +
                                currMonth +
                                "/" +
                                fourthday.getFullYear()}
                            </td>
                            <td> {fourthDayName}</td>
                            <td>
                              <button onClick={markdone}>Done</button>
                            </td>
                            <td>
                              <button onClick={markundone}>Mark Undone</button>
                            </td>
                            <td>
                              <button onClick={undone}>Undone</button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {fifthday.getDate() +
                                "/" +
                                currMonth +
                                "/" +
                                fifthday.getFullYear()}
                            </td>
                            <td> {fiftDayName}</td>
                            <td>
                              <button onClick={markdone}>Done</button>
                            </td>
                            <td>
                              <button onClick={markundone}>Mark Undone</button>
                            </td>
                            <td>
                              <button onClick={undone}>Undone</button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {sixthday.getDate() +
                                "/" +
                                currMonth +
                                "/" +
                                sixthday.getFullYear()}
                            </td>
                            <td> {sixthDayName}</td>
                            <td>
                              <button onClick={markdone}>Done</button>
                            </td>
                            <td>
                              <button onClick={markundone}>Mark Undone</button>
                            </td>
                            <td>
                              <button onClick={undone}>Undone</button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              {lastday.getDate() +
                                "/" +
                                currMonth +
                                "/" +
                                lastday.getFullYear()}
                            </td>
                            <td> {lastDayName}</td>
                            <td>
                              <button onClick={markdone}>Done</button>
                            </td>
                            <td>
                              <button onClick={markundone}>Mark Undone</button>
                            </td>
                            <td>
                              <button onClick={undone}>Undone</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <button
                    className="hero__btn"
                    onClick={() => {
                      // Call the deletetask function with the index as an argument
                      deletetask(index);
                    }}
                  >
                    {" "}
                    delete
                    {/* Add four span elements to create the "x" button icon */}
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                  {arr[index * 1]}
                </Toggle>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
