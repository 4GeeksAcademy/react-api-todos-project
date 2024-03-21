import React, {useState, useEffect} from "react";

//import rigoImage from "../../img/rigo-baby.jpg";

const ToDosList = () => {

	const [input, setInput] = useState("")
	const [list, setList] = useState([])

	useEffect(() => {

		fetch ("https://playground.4geeks.com/apis/fake/todos/user/ErnestWarhead", {
			method: "GET",
			PARAMS: "None",
			headers: {
				"Content-Type": "application/json"
			  },
		})

		.then(response => response.json())

		.then((data) => {
			if (data.msg !== undefined){
				fetch ("https://playground.4geeks.com/apis/fake/todos/user/ErnestWarhead", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				  },
				body: JSON.stringify([]),
				}).then((dataCreation) => {if (dataCreation.result === "ok"){console.log("Username created succesfully")} else {console.log("Username was not created " + dataCreation)}})
				.catch((error) => console.log(error))
			} else {setList(data)}
		}).catch(error => (console.log(error)))
	}, []);

useEffect(() => {

		fetch ("https://playground.4geeks.com/apis/fake/todos/user/ErnestWarhead", {
				method: "GET",
				PARAMS: "None",
				headers: {
					"Content-Type": "application/json"
				  },
			})

		.then(response => response.json())

		.then((data) => {
			if (data.msg !== undefined){
				fetch ("https://playground.4geeks.com/apis/fake/todos/user/ErnestWarhead", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				  },
				body: JSON.stringify([]),
				}).then((dataCreation) => {if (dataCreation.result == "ok"){console.log("Username created succesfully")} else {console.log("Username was not created " + dataCreation)}})
				.catch((error) => console.log(error))}})

	list.length ?
			fetch ("https://playground.4geeks.com/apis/fake/todos/user/ErnestWarhead", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				  },
				body: JSON.stringify(list)})
				.then(response => response.json())
				.then(data => {
				  console.log("List updated successfully", data);
				})
				.catch(error => {
				  console.error("Failed to update list", error);
				}) 

				:

				fetch ("https://playground.4geeks.com/apis/fake/todos/user/ErnestWarhead", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				  },
				PARAMS: "none"})
				.then(response => response.json())
				.then(data => {
				  console.log("List updated successfully", data);
				})
				.catch(error => {
				  console.error("Failed to update list", error);
				})
		}, [list])
	
	useEffect(() => {

		const addToList = (event) => {
		  if (event.key === "Enter" && input.trim() !== "") { 
			setList([{"label": input, "done": false}, ...list]);
			setInput("");
		  }
		};
		document.addEventListener("keydown", addToList);
		return () => document.removeEventListener("keydown", addToList);
		
	  }, [list, input]);

	  const deleteHandler = (indx) => {
		setList(currentList => currentList.filter((_, place) => place !== indx));
	  };

	  const deleteAllHandler = () => {
		console.log("deleteAllHandler triggered")
		setList([]);
		fetch ("https://playground.4geeks.com/apis/fake/todos/user/ErnestWarhead", {
			method: "DELETE",
		})
		.then(response => response.json())
		.then((data) => {
			if (data.result === "ok"){
				console.log("Your list was deleted succesfully")
			} else {
				throw new Error ("Something might have been wrongn/" + data)
			};
		}).catch(error => (console.log(error)))

	  };


	return (
		<div className="generalDivStyles">
			<h1 className="todosStyles">todos</h1>
			<p style={{margin: "0 0 2vh 10vh"}}>Your username is ErnestWarhead</p>
			<div className="listStyles">
				<input type="text" value={input} onChange={(e) => setInput(e.target.value)} required className="inputStyles" placeholder="What needs to be done?" />

				{list.map((value, index) => {
					return <div className="individualDivStyles" key={index}><p className="itemsStyles">{value.label}</p><button className="deleteStyles" onClick={() => deleteHandler(index)}>X</button></div>
				})}

				<p className="leftStyles">{list.length} items left</p>
			</div>
			<div className="listBottomStyles" style={{height: "0.5vh", width: "59.5vh"}}></div>
			<div className="listBottomStyles" style={{height: "0.45vh", width: "59vh"}}></div>
			<button type="button" className="btn btn-danger" style={{width: "20vh", margin: "10vh auto"}} onClick={() => deleteAllHandler()}>Clear all</button>
		</div>
	);
};

export default ToDosList;