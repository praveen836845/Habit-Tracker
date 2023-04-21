import "./dist/css/App.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toggle from "./Components/Toggle";

function App() {
  // localStorage.clear()
  if (!localStorage.getItem("tasks")) {
    localStorage.clear();
  }
  const [task, settask] = useState("");
  const [totaltask, setTotalTasks] = useState([]);
  const [load, setload] = useState(true);
  const [day, setDay] = useState("");
  const [toggle, setToggle] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (task === null || task === "" || task === " " || task === "   ") {
      toast("Task Can't be emply");
    } else {
      let data = totaltask;
      data.push(task);
      setTotalTasks(data);
      // console.log(totaltask)
      settask("");
      setload(!load);
      localStorage.setItem("tasks", totaltask);
      toast("Task Added");
    }
  };
  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data != null) {
      const x = data.split(",");
      setTotalTasks(x);
    }
  }, []);

  const deletetask = (index) => {
    // console.log(index)
    let data = [];
    totaltask.map((item, i) => {
      if (i != index) {
        data.push(item);
      }
    });
    setTotalTasks(data);
    setload(!load);
    localStorage.setItem("tasks", data);
    toast("Task Deleted");
  };
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
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const curr = new Date();
  const first = curr.getDate() + 1 - curr.getDay();
  const last = first + 6;
  const second = first + 1;
  const third = first + 2;
  const fouth = first + 3;
  const fifth = first + 4;
  const sixth = first + 5;
  // -----------------------

  // ----------------
  const firstday = new Date(curr.setDate(first));
  const lastday = new Date(curr.setDate(last));
  const secondday = new Date(curr.setDate(second));
  const thirdday = new Date(curr.setDate(third));
  const fourthday = new Date(curr.setDate(fouth));
  const fifthday = new Date(curr.setDate(fifth));
  const sixthday = new Date(curr.setDate(sixth));
  const currMonth = new Date().getMonth() + 1;
  // -----------------------------------------------
  // const currDay = curr.getDay() + 1
  const firstDayName = daysOfWeek[firstday.getDay()];
  const lastDayName = daysOfWeek[lastday.getDay()];
  const secondDayName = daysOfWeek[secondday.getDay()];
  const thirdDayName = daysOfWeek[thirdday.getDay()];
  const fourthDayName = daysOfWeek[fourthday.getDay()];
  const fiftDayName = daysOfWeek[fifthday.getDay()];
  const sixthDayName = daysOfWeek[sixthday.getDay()];
  const arr = [];

  const taskshow = (e) => {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.style.backgroundColor === "green") {
      target.style.backgroundColor = "red";
      target.style.color = "white";
    } else if (target.style.backgroundColor === "red") {
      target.style.backgroundColor = "white";
      target.style.color = "black";
    } else {
      target.style.backgroundColor = "green";
      target.style.color = "white";
    }
    e.stopPropagation();
  };

  const markdone = (e) => {
    // console.log(e.target.parentElement)
    e.target.parentElement.parentElement.style.backgroundColor = "#1f242d";
    e.target.parentElement.parentElement.style.color = "white";
  };
  const markundone = (e) => {
    // console.log(e.target.parentElement)
    e.target.parentElement.parentElement.style.backgroundColor = "#FF7276";
    e.target.parentElement.parentElement.style.color = "white";
  };

  const undone = (e) => {
    // console.log(e.target.parentElement)
    e.target.parentElement.parentElement.style.backgroundColor = "transparent";
    e.target.parentElement.parentElement.style.color = "auto";
  };
  const [id, setid] = useState(1);
  return (
    <div className="main__container">
      <ToastContainer />
      <h1 id="title">Habit Tracker</h1>
      <div className="underline"></div>
      <br/>
      <br/>
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
          style={{ position: "relative", top: "-115px"}}
        >
          <h1 id="title">Habit List </h1>
          <div className="underline"></div>
            
          {totaltask.map((item, index) => {
            return (
              <>
                {/* <div class="card" key={index}>
                    <h1>Coronavirus - Facts, advice and measures</h1>

                    <details class="warning">
                      <summary>Facts and knowledge about COVID-19</summary>
                      <p>Some text to be hidden.</p>
                      <p>Some text to be hidden.</p>
                      <p>Some text to be hidden.</p>
                      <p>Some text to be hidden.</p>
                    </details>

                  </div> */}
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
                      deletetask(index);
                    }}
                  >
                    {" "}
                    delete
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
