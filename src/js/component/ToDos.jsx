import React, {useState, useEffect} from "react";

//import rigoImage from "../../img/rigo-baby.jpg";

const ToDosList = () => {

	//																							***BEGINING STYLES***

	const generalDivStyles = {display: "flex", flexDirection: "column", justifyContent: "center"};

	const todosStyles = {fontWeight: "200", fontSize: "8vh", textAlign: "center", color: "rgb(200, 150, 150)", margin: "4vh"};

	const listStyles = {width: "60vh", border: "1px solid rgb(150 150 150)", position: "relative", margin: "0 auto", boxShadow: "0vh 0vh 0.2vh rgba(0, 0, 0, 0.6)"};

	const inputStyles = {margin: "0 0 0.5vh 0", border: "none", color: "rgb(100, 100, 100)", borderBottom: "1px solid rgb(150 150 150)", fontSize: "2.5vh", fontWeight: "300", padding: "1.5vh 0 1.5vh 6vh", width: "100%"};

	const itemsStyles = {margin: "0", color: "rgb(100, 100, 100)", borderBottom: "1px solid rgb(150 150 150)", fontSize: "2.5vh", fontWeight: "300", padding: "1.5vh 0 1.5vh 6vh", width: "100%"};

	const leftStyles = {margin: "0", color: "rgb(100, 100, 100)", borderBottom: "1px solid rgb(150 150 150)", fontSize: "1.7vh", fontWeight: "200", padding: "1vh", width: "100%"};

	const deleteStyles = {position: "absoulute", margin: "0", padding: "0 4vh 0 0", border: "none", borderBottom: "1px solid rgb(150 150 150)", backgroundColor: "white", border: "none", fontSize: "2.5vh"};

	const listBottomStyles = {border: "1px solid rgb(150 150 150)", borderTop: "none", position: "relative", margin: "0 auto", boxShadow: "0vh 0vh 0.2vh rgba(0, 0, 0, 0.6)"};

	//																							***FINISHED STYLES***

	const [input, setInput] = useState("")
	const [list, setList] = useState([])
	const [hover, setHover] = useState([])

	useEffect(() => {

		setHover(new Array(list.length).fill(false));

		const addToList = (event) => {
		  if (event.key === "Enter" && input.trim() !== "") { 
			setList([input, ...list]);
			setInput("");
		  }
		};
		document.addEventListener("keydown", addToList);
		return () => document.removeEventListener("keydown", addToList);
	  }, [list, input]);

	  const deleteHandler = (indx) => setList(currentList => currentList.filter((_, place) => place !== indx));

	return (
		<div style={generalDivStyles}>
			<h1 style={todosStyles}>todos</h1>
			<div style={listStyles}>
				<input type="text" value={input} onChange={(e) => setInput(e.target.value)} required style={inputStyles} placeholder="What needs to be done?" />

				{list.map((value, index) => {() => setHover(hover => hover.map((item, idx) => idx === index ? false : item)) 
					return <div onMouseEnter={() => setHover(hover => hover.map((item, idx) => idx === index ? true : item))} onMouseLeave={() => setHover(hover => hover.map((item, idx) => idx === index ? false : item))} style={{display: "flex"}} key={index}> <p style={itemsStyles}>{value}</p><button style={{...deleteStyles, ...(hover[index] ? {color: "rgb(200, 150, 150)"} : {color: "white"}) }} onClick={() => deleteHandler(index)}>X</button></div>
				})}

				<p style={{...leftStyles, ...{borderBottom: "none"}}}>{list.length} items left</p>
			</div>
			<div style={{...listBottomStyles, ...{height: "0.5vh", width: "59.5vh"}}}></div>
			<div style={{...listBottomStyles, ...{height: "0.45vh", width: "59vh"}}}></div>
		</div>
	);
};

export default ToDosList;