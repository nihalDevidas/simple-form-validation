import React,{useState} from 'react'





const Calculator = () => {

    const[input1Value, setInput1] = useState("")
    const[input2Value, setInput2] = useState("")

    const[errorMessage,setError] = useState("")
    const[calculatedValue, setValue] = useState(null)


    function inputValidation(e){
       let num1;
       let num2;

          if(input1Value.trim() !== ""){

              num1 = Number(input1Value.trim())     // Number() returns NaN if data is anything other than number

              if(isNaN(num1)){
                setError("input valid Num1");
                setValue(null)                      //if error ,set calculated value as null so that prevoius calculated value is not rendred
                return;
              }
          }

          if(input2Value.trim() !== ""){

            num2 = Number(input2Value.trim())
            
            if(isNaN(num2)){
              setError("input valid Num2");
              setValue(null)
              return;
            }
          }


        if(input1Value == "" || input2Value == ""){   // if nothing is entered
          setError("input values")
          setValue(null)
        }
        else
        {
          let operation  = e.target.getAttribute("data-operation")     // get operation to perform as a string(+,-,/,*)

          if(operation == "/" && num2 == 0){               
            setError("zero-division error");
            setValue(null)
            return
          }

          setError("")                                 // reset after previous errors rectified
          calculateResult(num1, num2,operation)
        }
    }



    function calculateResult(number1, number2, arithmaticOperator){

        switch(arithmaticOperator){
          case "+": setValue(number1+number2)
                    return;
          case "-": setValue(number1-number2)
                    return;
          case "*": setValue(number1*number2)
                    return;
          case "/": setValue((number1/number2).toFixed(4))
                    return;
          default: setValue(null)          
        }
    }


  return (
    <>
      <div className='container'>
        <h1>React Calculator</h1>
         
         <div>
            <input onChange = {(e)=>setInput1(e.target.value)} type = "text" placeholder='Num 1'/>
         </div>

         <div>
            <input onChange = {(e)=>setInput2(e.target.value)} type = "text" placeholder='Num 2'/>
         </div>
         
         <ul>
            <li><button onClick = {(e)=>inputValidation(e)}  data-operation = "+">+</button></li>
            <li><button onClick = {(e)=>inputValidation(e)} data-operation = "-">-</button></li>
            <li><button onClick = {(e)=>inputValidation(e)} data-operation = "*">*</button></li>
            <li><button onClick = {(e)=>inputValidation(e)} data-operation = "/">/</button></li>
         </ul>

         {errorMessage !== "" && <div >
                                          <div className='error'>
                                            Error!
                                          </div>

                                          <div className='text'>
                                            {errorMessage}
                                          </div>
                                      </div>}

         {calculatedValue  !== null?<div>
                                     <div className='sucess'>
                                       Sucess!
                                     </div>
                                     <div className='text'>
                                       Result :{calculatedValue}
                                     </div>
                                   </div>:
                                   ""}

      </div>

    </>
  )
}

export default Calculator