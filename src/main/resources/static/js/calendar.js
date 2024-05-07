let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        let user = "test_user";

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-primary");
                } // color today's date

                cell.appendChild(cellText);

                (function (date, month, year) {
                    // HTTP 요청 보내기
                    const http = new XMLHttpRequest();
                    const url = `http://localhost:8080/api/DB/diary?date=${date}&month=${month + 1}&year=${year}&user=${user}`; // month는 0부터 시작하므로 +1 해줌
                    //console.log(url);
                    http.open('GET', url);
                    http.send();
                    http.onload = () => {
                        if (http.status === 200) {
                            //console.log(http.responseText);
                            if (http.response != "") {
                                let link = document.createElement("a");
                                link.innerText = "📖";
                                link.href = `http://localhost:8080/diary?date=${date}&month=${month + 1}&year=${year}&user=${user}`;
                                cell.appendChild(link);
                            }
                        } else {
                            console.error("Error", http.status, http.statusText);
                        }
                    };
                })(date, month, year);

                row.appendChild(cell);

                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}