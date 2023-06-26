import React, { useReducer } from "react";
import "./styles.css";
import DigitButton from "./DigitButton";
import OperatorButton from "./OperatorButton";
export const ACTIONS = {
  ADD_DIGIT : 'add-digit',                                
  CHOOSE_OPERATION :'choose-operation',
  CLEAR : 'clear',
  DELETE_DIGIT : 'delete-digit',
  EVALUATE: 'evaluate'  
}
const reducer = (state,{type,payload})=>{
  console.log(state)
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite && payload.digit==='.'){
        return state
        
      }
      if(state.overwrite){
        return{
          ...state,
          currentOperand:payload.digit,
          overwrite:false,
        }
      }
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state
      }
      if (payload.digit === '.' && state.currentOperand == null) {
        return state
      }
       
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }   
       
      return {
        ...state,
        currentOperand:`${state.currentOperand || ''}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand==null  && state.previousOperand==null){
        return state
      }
      if(state.currentOperand==null){
        return{...state,
        operation:payload.operator
      }
      }
      if(state.previousOperand==null){
        return{
          ...state,
          operation:payload.operator,
          previousOperand:state.currentOperand,
          currentOperand:null,
        }
      }
      return{
        ...state,
        
        previousOperand:calc(state),  
        operation:payload.operator,
        currentOperand:null
      }

      
    case ACTIONS.CLEAR:
      return{

      }

      
    case ACTIONS.DELETE_DIGIT:
      
      if(state.previousOperand == null && state.currentOperand == null){
        return{       
          state
        }
      }
      if(state.previousOperand !== null && state.currentOperand == null){
        return{
          ...state,
          currentOperand:state.previousOperand,
          operation:null,
          previousOperand:null
        }
      }
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }}      
  
      return{
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
        }
    case ACTIONS.EVALUATE:
      if(state.currentOperand==null || state.previousOperand==null || state.operation==null ){
        return state
      }
      return{
        ...state,
        overwrite:true,
        previousOperand:null,
        currentOperand:calc(state),
        operation:null 
      }
  }

}
function calc({currentOperand,previousOperand,operation}){
  const prev = parseFloat(previousOperand);
  const current =  parseFloat(currentOperand);
  if(isNaN(prev)||isNaN(current)) return "";
  let computation =""
  switch(operation){
    case "+":
      computation = prev+ current
      break
    case "-":
      computation = prev- current
      break
    case "/":
      computation = prev/ current
      break
    case "*":
      computation = prev* current
      break
  }
  return computation.toString()
}

const App = () => {
  const [{currentOperand, previousOperand,operation}, dispatch ] = useReducer(reducer,{})
  return (
    <div className="calc-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand}{operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}
      >
        AC</button>
      <button onClick={()=> dispatch({type:ACTIONS.DELETE_DIGIT})}>
        DEL</button>
      <OperatorButton operator='/' dispatch={dispatch} />

      <DigitButton digit='1' dispatch={dispatch} />
      <DigitButton digit='2' dispatch={dispatch} />
      <DigitButton digit='3' dispatch={dispatch} />
      
      <OperatorButton operator='*' dispatch={dispatch} />
      <DigitButton digit='4' dispatch={dispatch} />
      <DigitButton digit='5' dispatch={dispatch} />
      <DigitButton digit='6' dispatch={dispatch} />
     
      <OperatorButton operator='+' dispatch={dispatch} />
      <DigitButton digit='7' dispatch={dispatch} />
      <DigitButton digit='8' dispatch={dispatch} />
      <DigitButton digit='9' dispatch={dispatch} />
      
      <OperatorButton operator='-' dispatch={dispatch} />
      <DigitButton digit='.' dispatch={dispatch} />
      <DigitButton digit='0' dispatch={dispatch} />
      <button className="span-two" onClick={()=> dispatch({type:ACTIONS.EVALUATE})}>=</button>
  </div>
  );
};

export default App;
