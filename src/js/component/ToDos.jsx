import React, {useState, useEffect} from "react";

//import rigoImage from "../../img/rigo-baby.jpg";

const ToDosList = () => {

	//																							***BEGINING STYLES***

	const [generalDivStyles, setGeneralDivStyles] = useState(
		{display: "flex", flexDirection: "column", justifyContent: "center"}
	)

	const [todosStyles, setTodosStyles] = useState(
		{fontWeight: "200", fontSize: "8vh", textAlign: "center", color: "rgb(200, 150, 150)", margin: "4vh"}
	)

	const [listStyles, setListStyles] = useState(
		{width: "60vh", border: "1px solid rgb(150 150 150)", position: "relative", margin: "0 auto", boxShadow: "0vh 0vh 0.2vh rgba(0, 0, 0, 0.6)"}
	)

	const [inputStyles, setInputStyles] = useState(
		{margin: "0", border: "none", color: "rgb(100, 100, 100)", borderBottom: "1px solid rgb(150 150 150)", fontSize: "2.5vh", fontWeight: "300", padding: "1.5vh 0 1.5vh 6vh", width: "100%"}
	)

	const [listBottomStyles, setListBottomStyles] = useState(
		{border: "1px solid rgb(150 150 150)", borderTop: "none", position: "relative", margin: "0 auto", boxShadow: "0vh 0vh 0.2vh rgba(0, 0, 0, 0.6)"}
	)

	//																							***FINISHED STYLES***

	const [input, setInput] = useState("")
	const [list, setList] = useState([])

	useEffect(() => {
	const addToList = (event) => {
		if (event.key === "Enter") { setList((currentList) => [input, ...currentList]);
			console.log(list)
			setInput("")
		}
	}
		document.addEventListener("keydown", addToList);
			
		return () => {
			document.removeEventListener("keydown", addToList)
		}
	}, [input])

	return (
		<div style={generalDivStyles}>
			<h1 style={todosStyles}>Hello Rigo!</h1>
			<div style={listStyles}>
				<input type="text" value={input} onChange={(e) => setInput(e.target.value)} required style={inputStyles} placeholder="What needs to be done?" />

				{list.map((value, index) => {
				<p key={index} style={inputStyles}>{value}<button onClick={setList((currentList) => [currentList.splice(index, 1)])}>X</button></p>
				})}

				<p style={{...inputStyles, ...{borderBottom: "none"}}}>items left</p>
			</div>
			<div style={{...listBottomStyles, ...{height: "0.5vh", width: "59.5vh"}}}></div>
			<div style={{...listBottomStyles, ...{height: "0.4vh", width: "59vh"}}}></div>
		</div>
	);
};

export default ToDosList;
