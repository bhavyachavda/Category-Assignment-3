import React, { useEffect, useState } from 'react'

import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function Category() {
    const [category, setCategory] = useState('');
    const [name, setName] = useState("");
    const [type, setType] = useState('');
    const navigate = useNavigate();
    const [ans, setAns] = useState('');

    function getParent() {
        axios.get("http://localhost:9001/getparent").then((res) => {
            const ans = res.data;
            console.log(res.data);
            setAns(ans);
        })
    }

    function addCategory() {
        axios.post("http://localhost:9001/addcategory", { category: category, name: name, type: type }).then((res) => {
            navigate("/");
        });
    }
    useEffect(() => {
        getParent()
    }, []);

    return (
        <div>
            {/* <Header /> */}
            <div>
                <form className='category' onSubmit={addCategory}>
                    <h3>Category Form</h3>
                    <div className="form-group">
                        <label htmlFor="type">Category Type: </label>&nbsp;
                        <input
                            id="Parent"
                            type="radio"
                            name="type"
                            value="Parent"
                            onChange={(e) => { setType(e.target.value) }}
                            checked={type == "Parent" ? "true" : null}
                        />
                        <label htmlFor="Parent" className='px-2'>Parent</label>
                        &nbsp;
                        <input
                            id="Child"
                            type="radio"
                            name="type"
                            value="Child"
                            onChange={(e) => setType(e.target.value)}
                            checked={type == "Child" ? "true" : null}
                        />
                        <label htmlFor="Child" className='px-2'>Child</label>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="name">Category Name: </label> &nbsp; <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Category Name" />
                    </div>
                    <br></br>
                    {type == "Child" &&
                        <div> <label htmlFor="department">Category: </label>&nbsp;&nbsp;
                            <select
                                id="category"
                                type="text"
                                name="category"
                                value={category}
                                onChange={e => { setCategory(e.target.value) }} >
                                <option value="select">--Select--</option>
                                {
                                    ans.length > 0 ? (
                                        ans.map((item, index) => (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        ))
                                    ) : <></>
                                }
                            </select>
                        </div>}
                    <div>
                        <input type="submit" value="Submit" className='btn btn-primary' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Category;