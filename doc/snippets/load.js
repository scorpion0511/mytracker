 const load = (e) => {
        if (
          props.week == "" ||
          props.week === "undefined" ||
          props.week === null
        ) {
          alert("Please, Enter Date");
          return;
        }
        fetch(`http://localhost:8500/tracker/api/get?week=${props.week}`, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const { id, tasks } = data; //deconstruct
            setTasks(tasks);
            if (id === 0 || id === null) {
              alert("Week doesn't exist.");
            }
            setWeekId(id);
          })
          .catch((error) => alert(error));
      };
