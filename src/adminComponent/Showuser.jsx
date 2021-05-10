import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import NavbarAdmin from './NavbarAdmin';
import axios from 'axios';
import Modal from 'react-bootstrap4-modal';
import { useForm } from 'react-hook-form';

function Showuser() {
    const { useState } = React;
    const { register, handleSubmit, formState: { errors }, } = useForm();
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
        //validateAdmin(data)
        document.getElementById("create-course-form").reset();
        axios.post('https://hirenserver.herokuapp.com/user/', data).then((res) => {
            console.log("on submit:-", res["data"]);
            getdata();
        })
            .catch((err) => { console.log("add error", err) });
            
    };

    const checkUserName=(e)=>
    {
    console.log("onchange",e.target.value);
    }


    function getdata() {
        let x = [];
        axios.get('https://hirenserver.herokuapp.com/user/').then(res => {
            //  console.log("api response",res["data"]);
            res["data"].map((item) => {
                let temp = {}
                temp["email"] = item["email"];
                temp["username"] = item["username"];
                temp["id"] = item["_id"]
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
        { title: 'Email', field: 'email', },
        { title: 'username', field: 'username', type: 'string' },

    ]);



 




    return (<>
        <NavbarAdmin />
        <MaterialTable
            title="Users List"
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
                            //console.log(oldData)

                            console.log(oldData["id"]);
                            axios.put('https://hirenserver.herokuapp.com/user/' + oldData["id"], newData).then((res) => {
                                console.log("on submit:-", res);
                                getdata();
                            })
                                .catch((err) => { console.log("add error", err) })
                                
                            resolve();
                        }, 1000)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            console.log(oldData["id"]);
                            //getdata();
                            axios.delete('https://hirenserver.herokuapp.com/user/'+oldData["id"]).then(res=>{
                                console.log("delete",res);
                                getdata();
                            }).catch((err)=>{console.log(err)});
                    

                            resolve();
                        }, 1000)
                    }),
            }}
        />
        <Modal visible={isModal} onClickBackdrop={() => { setIsModal(false) }}>
            <div className="modal-header" style={{ backgroundColor: "lightblue" }}>
                <h5 className="modal-title">Register User</h5>
            </div>
            <div className="modal-body">
                <form id="create-course-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" name="email" className="form-control" aria-describedby="emailHelp" {...register('email', { required: true })} placeholder="Enter email" />
                    </div>
                    {errors.email && <span style={{ color: "red" }}>Email required</span>}

                    <div className="form-group">
                        <label for="exampleInputPassword1">Username</label>
                        <input type="text" onChange={ checkUserName } className="form-control"  placeholder="Enter Username" {...register('username', { required: true })} />
                    </div>
                    {errors.username && <span style={{ color: "red" }}>Username required</span>}
                               <p style={error?{display:"inline-block"}:{display:'none'}}>username alerdy exist</p>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" placeholder="Password" {...register('password', { required: true })} />
                    </div>
                    {errors.password && <span style={{ color: "red" }}>Password required</span>}

                    <div className="form-group">
                        <label for="exampleInputPassword1"> Confrim Password</label>
                        <input type="password" className="form-control" placeholder="Password" {...register('confirm_password', { required: true })} />
                    </div>
                    {errors.confirm_password && <span style={{ color: "red" }}>Confirm password required</span>}

                    <div className="modal-footer">

                        <button className="btn btn-primary" onClick={() => { setIsModal(false);document.getElementById("create-course-form").reset();                                        }} type="button">Cancle</button>
                        <button style={{ float: 'right' }} className="btn btn-primary" type="submit">Submit</button>

                    </div>


                </form>
            </div>

        </Modal>
    </>
    )
}
export default Showuser;





