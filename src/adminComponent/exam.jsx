import React, { useEffect, useState } from 'react';
import './exam.css';
import axios from 'axios';
import Navbarstudent from './studentNavbar'
import {useHistory} from 'react-router-dom';

const Exam = () => {

    const [count, setCount] = useState(1);
    const [answer, setAnswer] = useState("");
    const [data, setData] = useState([]);
    const [final, setfinal] = useState([]);
    const [maxno, setMaxno] = useState(0);
    const [score,setScore] =useState(0);
    const history=useHistory();

    useEffect(() => {
        getdata();
        getalldata();   
    }, [count, final,score]);

    const previous = () => {
        if (count == 1) {
            setCount(1);
        }
        else {
            let x = count - 1;
            setCount(x);
        }
    }
    const next = () => {
        if (count == maxno) {
            setCount(count);
        }
        else {
            let x = count + 1;
            setCount(x);
            
        }
    }

    function getalldata() {
        let x = [];
       // console.log("count in getdat", count)
        axios.get('http://localhost:4000/question/').then(res => {
           // console.log("api response", res["data"].length);
            setMaxno(res["data"].length);
        }).catch((err) => console.log(err));
    }
    function getdata() {
        let x = [];
       // console.log("count in getdat", count)
        axios.get('http://localhost:4000/question/' + count).then(res => {
         //   console.log("api response", res["data"]);
            setData(res["data"][0]);
        }).catch((err) => console.log(err));
    }


    function selectoption(e) {
       // console.log(e.target.value);
        let x = e.target.value;
        setAnswer(x);

    }

    function save() {
        let x = {}
        x[data["question"]] = answer || null;
        final.push(x)
        setfinal(final);
        //console.log(final)
    }

    function search(nameKey, myArray){
       // console.log("name key",nameKey)
        for (var i=0; i < myArray.length; i++) {
           // console.log("xx",myArray[i] )
            if (myArray[i].question == nameKey) {
              //  console.log("match",myArray[i])
                return myArray[i]["answer"];
            }
        }
    }
     function ansheetOfstudent()
    {
        let anskey=[]
        console.log(final);
        axios.get('http://localhost:4000/question/').then((res) => {
           // console.log("on submit question :-", res);
            res["data"].map((item)=>{
               let x={}
                x["question"]=item["question"];
                x["answer"]=item["answer"];
                anskey.push(x);
            })
            console.log(anskey);
            let temp=0;
            final.map((item)=>{
              //  console.log("item",Object.keys(item))
                var resultObject = search(Object.keys(item), anskey);
                
                //console.log("ans",resultObject);
                //console.log("student_ans",item[(Object.keys(item))]);
                if( resultObject ==  item[(Object.keys(item))])
                {
                    console.log("right ans",score);
                     temp +=1;
                    console.log("tenp",temp)
                                      
                }
            });
            setScore(temp);
           
           alert("your result is "+temp);
            //  history.push("/studentNavbar");

            
        }).catch((err) => { console.log("add error", err) });
      


    }
    return (
        <>
            <Navbarstudent />
            
            <div class="container mt-5">
                <div class="d-flex justify-content-center row">
                    <div class="col-md-10 col-lg-10">
                        <div class="border">

                            <div class="question bg-white p-3 border-bottom">
                                <div class="d-flex flex-row align-items-center question-title">
                                    <h3 class="text-danger">{data["question_no"]}.</h3>
                                    <h5 class="mt-1 ml-2">{data["question"]}</h5>
                                </div>
                                <div class="ans ml-2">
                                    <input type="radio" name="myGroupName" defaultChecked={false}   onChange={selectoption} value={data["optionA"]} /> {data["optionA"]}

                                </div>
                                <div class="ans ml-2">
                                    <input type="radio" name="myGroupName" defaultChecked={false} onChange={selectoption} value={data["optionB"]} /> {data["optionB"]}

                                </div>
                                <div class="ans ml-2">
                                    <input type="radio" name="myGroupName" defaultChecked={false} onChange={selectoption} value={data["optionC"]} /> {data["optionC"]}

                                </div>
                                <div class="ans ml-2">
                                    <input type="radio" name="myGroupName" defaultChecked={false} onChange={selectoption} value={data["optionD"]} /> {data["optionD"]}

                                </div>

                            </div>
                            <div class="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
                                <button class="btn btn-primary d-flex align-items-center btn-danger" onClick={previous} type="button"><i class="fa fa-angle-left mt-1 mr-1"></i>&nbsp;Previous</button>
                                <button class="btn btn-primary border-success align-items-center btn-success" onClick={save} type="button">Save<i class="fa fa-angle-right ml-2"></i></button>
                                <button class="btn btn-primary border-success align-items-center btn-success" onClick={next} type="button">Next<i class="fa fa-angle-right ml-2"></i></button>

                            </div>
                        </div>
                        <br /><div class="text-center">
                            <button type="button" onClick={ansheetOfstudent} class="btn btn-primary">Submit Test</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Exam;