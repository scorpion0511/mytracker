const save = (e) => {
  const week = props.week;
  const id = weekId !== "undefined" ? weekId : 0;

  fetch("http://localhost:8500/tracker/api/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, week, tasks }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => setWeekId(data))
    .catch((error) => alert(error));
};