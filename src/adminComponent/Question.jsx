import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import NavbarAdmin from './NavbarAdmin';
import axios from 'axios';
import Modal from 'react-bootstrap4-modal';
import { useForm } from 'react-hook-form';

function Showuser() {
    const { useState } = React;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [apidata, setApidata] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [match, setMatch] = useState('');
    const [error, setError] = useState(false);
    // const [data, setData] = useState([]);
    useEffect(() => {
        getdata();
    }, [])

    const onSubmit = (data) => {
        console.log(data);
        setIsModal(false);
        axios.post('https://hirenserver.herokuapp.com/question/', data).then((res) => {
            console.log("on submit question :-", res);
            getdata();
        }).catch((err) => { console.log("add error", err) });
        document.getElementById("create-course-form").reset();
    };


    function getdata() {
        let x = [];
        axios.get('https://hirenserver.herokuapp.com/question/').then(res => {
            console.log("api response", res["data"]);
            res["data"].map((item) => {
                let temp = {}
                temp["question_no"] = item["question_no"];
                temp["question"] = item["question"];
                temp["optionA"] = item["optionA"];
                temp["optionB"] = item["optionB"];
                temp["optionC"] = item["optionC"];
                temp["optionD"] = item["optionD"];
                temp["answer"] = item["answer"];
                temp["id"] = item["_id"];
                //console.log(temp);
                x.push(temp);

            })
            //console.log(apidata)
            setApidata(x);

        }).catch((err) => console.log(err));
    }
    console.log("api data", apidata)
    const [data, setData] = useState([]);

    //----------------------------------------------------
    const [columns, setColumns] = useState([
        { title: "id", field: "id", hidden: true },
        { title: 'Question No', field: 'question_no', },
        { title: 'Question', field: 'question', },
        { title: 'OptionA', field: 'optionA', },
        { title: 'OptionB', field: 'optionB', },
        { title: 'OptionC', field: 'optionC', },
        { title: 'OptionD', field: 'optionD', },
        { title: 'Answer', field: 'answer', },


    ]);



    return (<>
        <NavbarAdmin />
        <MaterialTable
            title="Question table"
            columns={columns}
            data={apidata}
            actions={[
                {
                    icon: 'add',
                    tooltip: 'Add User',
                    isFreeAction: true,
                    onClick: (event) => {
                        setIsModal(true);

                    }
                }
            ]}
            editable={{

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            console.log(newData);

                            console.log(oldData["id"]);
                            axios.put('https://hirenserver.herokuapp.com/question/' + oldData["id"], newData).then((res) => {
                                console.log("on submit:-", res);
                                getdata();
                            })
                                .catch((err) => { console.log("add error", err) })
                            //getdata();
                            resolve();
                        }, 1000)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            console.log(oldData["id"]);
                            axios.delete('https://hirenserver.herokuapp.com/question/' + oldData["id"]).then(res => {
                                console.log("delete", res);
                                getdata();
                            }).catch((err) => { console.log(err) });
                            //getdata();

                            resolve()
                        }, 1000)
                    }),
            }}
        />
        <Modal visible={isModal} onClickBackdrop={() => { setIsModal(false) }}>
            <div className="modal-header" style={{ backgroundColor: "lightblue" }}>
                <h5 className="modal-title">Add Question</h5>
            </div>
            <div className="modal-body">
                <form id="create-course-form" onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group">
                        <label for="exampleInputEmail1">Question Number</label>
                        <input type="text" name="email" className="form-control"  {...register('question_no', { required: true })} placeholder="Enter Question" />
                    </div>
                    {errors.question_no && <span style={{ color: "red" }}>Question number Require</span>}



                    <div className="form-group">
                        <label for="exampleInputEmail1">Question</label>
                        <input type="text" name="email" className="form-control"  {...register('question', { required: true })} placeholder="Enter Question" />
                    </div>
                    {errors.question && <span style={{ color: "red" }}>Question Require</span>}

                    <div className="form-group">
                        <label for="exampleInputPassword1">Option A</label>
                        <input type="text" className="form-control" placeholder="Enter option" {...register('optionA', { required: true })} />
                    </div>
                    {errors.optionA && <span style={{ color: "red" }}>Option required</span>}

                    <div className="form-group">
                        <label for="exampleInputPassword1">Option B</label>
                        <input type="text" className="form-control" placeholder="Enter option" {...register('optionB', { required: true })} />
                    </div>
                    {errors.optionB && <span style={{ color: "red" }}>Option required</span>}

                    <div className="form-group">
                        <label for="exampleInputPassword1">Option C</label>
                        <input type="text" className="form-control" placeholder="Enter option" {...register('optionC', { required: true })} />
                    </div>
                    {errors.optionC && <span style={{ color: "red" }}>Option required</span>}

                    <div className="form-group">
                        <label for="exampleInputPassword1">Option D</label>
                        <input type="text" className="form-control" placeholder="Enter option" {...register('optionD', { required: true })} />
                    </div>
                    {errors.optionD && <span style={{ color: "red" }}>Option required</span>}
                    <div className="form-group">
                        <label for="exampleInputPassword1">coorect answer</label>
                        <input type="text" className="form-control" placeholder="Enter answer" {...register('answer', { required: true })} />
                    </div>
                    {errors.optionD && <span style={{ color: "red" }}>answer required</span>}
                    <div className="modal-footer">

                        <button class="btn btn-primary" onClick={() => { setIsModal(false) }} type="button">Cancle</button>
                        <button style={{ float: 'right' }} class="btn btn-primary" type="submit">Submit</button>

                    </div>


                </form>
            </div>

        </Modal>
    </>
    )
}
export default Showuser;





