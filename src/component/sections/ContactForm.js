import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import MyGraph from "./MyGraph";
import axios from 'axios';


function ContactForm(){

    const [inputFields, setInputFields] = useState([{
        key:'',
        value: '',

    } ]);
    const [responseData, setResponseData] = useState([]);

    const addInputField = ()=>{

        setInputFields([...inputFields, {
            key:'',
            value: '',
        } ])
      
    }

    const removeInputFields = (index)=>{
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
   }

   const handleChange = (index, evnt)=>{
    var { name, value } = evnt.target;
    const list = [...inputFields];
    if (name == "value") {
        value = value+',';
    }
    list[index][name] = value;
    setInputFields(list);
    }

 

    const getPosts = () => {
        const newData = inputFields.reduce((acc, curr) => {
            acc[curr.key] = [...curr.value.split(',')];
            return acc;
          }, {});
        axios
          .post("http://localhost:3222/dfsAlgorithm/dfs", { params: { newData } })
          .then((response) => {
            if (response.status === 200) {
                setResponseData( 
                  [ 
                    ...responseData,
                    { data: response.data } 
                  ]
                );
                setInputFields([{
                    key:'',
                    value: '',

                } ]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    return(
        <div >
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12 col-md-7">
                    <div className="col-sm-12">
                      {
                          inputFields.map((data, index)=>{
                              const {key, value}= data;
                              return(
                                <div className="row my-3" key={index}>
                            <div className="form-group pd-0 row">
                              <div className="col-5">
                                <label> Key
                                  <input type="text" className="stack-key form-control ip4" onChange={(evnt)=>handleChange(index, evnt)} value={key} name="key" placeholder="key" required/>
                                </label>
                              </div>
                              <div className="col-5">
                                <label> Value
                                  <input type="text" className="stack-value form-control ip4" onChange={(evnt)=>handleChange(index, evnt)} value={value} name="value" placeholder="values" />
                                </label>
                              </div>
                              <div className="col-2">
                                {(inputFields.length !== 1) ? <button className="btn btn-outline-danger" onClick={removeInputFields}>x</button> : ''}
                              </div>
                            </div>

                          </div>
                                  )
                              })
                          }
         
                    <div className="row">
                        <div className="col-sm-12">

                        <button className="btn btn-outline-success " onClick={addInputField}>Add New</button>
                        <button className="btn btn-outline-success mg-lt-20" onClick={getPosts}>Submit</button>
                        </div>
                    </div>

                      </div>
                    </div>

                    <div className="col-sm-12 col-md-5">
                        {
                            responseData && responseData.length > 0 ? 
                            <MyGraph response={responseData} /> : 
                            null
                        }
                    </div>
                    </div>
                </div>
            </div>
    )
}
export default ContactForm