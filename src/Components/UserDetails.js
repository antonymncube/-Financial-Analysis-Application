import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// declaring arrays
let monthArray = [];
let incomeArray = [];
let expenseArray = [];

// declaring the main component
export default function UserDetails(props) {
    // declcaring and initialising the use state
    const [name, setname] = useState("");
    const [surname, setsurname] = useState("");
    const [dateOdBirth, setdateOdBirth] = useState("");
    const [labels, setLabels] = useState([]);
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [log, setlog] = useState(true);

    const option = {
        Plugins: {
            legend: {
                position: "bottom",
            },
        },
    };
    // declaring the data set where the system will  read the data from
    const data = {
        labels,
        datasets: [
            {
                label: "Income",
                data: income,
                borderColor: "green",
            },
            {
                label: "Expense",
                data: expense,
                borderColor: "red",
            },
        ],
    };

    //function that receives the file and reads the content
    const handlefile = async (e) => {
        //gettting the data(file)
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        //usinf the xlsx library to read the data
        const read1 = XLSX.read(data);
        const worksheet = read1.Sheets[read1.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "",
        });
        // using the for loop to save the necessary data to the arrays
        for (let index in jsonData) {
            if (index > 0) {
                monthArray.push(jsonData[index][0]);
                incomeArray.push(jsonData[index][1]);
                expenseArray.push(jsonData[index][2]);
            }
        }
        // setting the new array values
        setLabels(monthArray);
        setIncome(incomeArray);
        setExpense(expenseArray);
    };
    // setting the value of the variable name
    const handlename = (e) => {
        setname(e.target.value);
    };
    // setting the value of the variable surname
    const handlesurname = (e) => {
        setsurname(e.target.value);
    };
    // setting the value of the variable date of birth
    const handleDateOfBirth = (e) => {
        setdateOdBirth(e.target.value);
    };

    const submitform = (e) => {
        e.preventDefults();
    };

    // function for submission
    const submit = () => {
        // using if statement to asure that before the submission all the values are filled
        if (name.length > 0 && surname.length > 0 && dateOdBirth.length > 0) {
            setlog(false);
        } else {
            alert("please fill in all the fields before submission");
        }
    };
    return (
        <div className="container-fluid bg-light">
            {log ? (
                <div className="formContainer">
                    <form onSubmit={submitform}>
                        <div className="bg-secondary text-white text-center ">
                            <h3 for="formGroupExampleInput">User Details</h3>
                        </div>
                        <div className="p-3">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="name"
                                    placeholder="name"
                                    onChange={(e) => {
                                        handlename(e);
                                    }}
                                />
                            </div>
                            <div class="form-group">
                                <label htmlFor="surname">Surname</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="surname"
                                    placeholder="Surname"
                                    onChange={(e) => {
                                        handlesurname(e);
                                    }}
                                />
                            </div>
                            <div class="form-group">
                                <label htmlFor="DateofBirth">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    class="form-control"
                                    id="DateofBirth"
                                    placeholder="Date of Birth"
                                    onChange={(e) => {
                                        handleDateOfBirth(e);
                                    }}
                                />
                            </div>
                            <div class="form-group">
                                <label htmlFor="excel">Attach Statement</label>
                                <input
                                    type="file"
                                    class="form-control"
                                    id="excel"
                                    onChange={handlefile}
                                />
                            </div>
                            <div class="form-group">
                                <button
                                    className="btn btn-dark form-control btn-md"
                                    type="submit"
                                    onClick={submit}
                                >
                                    Generate Analysis
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="row m-0 p-3 bg-light formContainer">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <h3 ClassName="card-title">Customer Details</h3>
                                <h5 ClassName="card-text m-2">Name : {name}</h5>
                                <h5 ClassName="card-text m-2">
                                    Surname : {surname}
                                </h5>
                                <h5 ClassName="card-text m-2">
                                    Date of birth : {dateOdBirth}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 bg-dark p-5 rounded">
                        <h2 className="text-light text-center mb-4">Income and Expense linear graph</h2>
                        <div style={{ height: "600", width: "300" }}>
                            <Line data={data} options={option} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
