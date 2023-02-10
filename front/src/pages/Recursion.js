import React,{useState,useEffect} from 'react';
import axios from  "axios";

function Recursion({item}) {
    const [name,setName] = useState("");
    const [childData,setChildData] = useState([]);
    const [btn, setbtn] = useState(false);

    useEffect(()=>{
        if(item){
            console.log(item);
            setName(item.name);
            getChildData();
        }
    },[])
    const getChildData = async () =>{
        axios.get("http://localhost:9001/getdata",{params:{id:item.id}}).then((res) => {
            const ans = res.data;
            console.log(res.data);
            setChildData(ans);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const deletedata =  () =>{
        axios.get("http://localhost:9001/delete",{params: {name:name, id:item.id}}).then((res)=> {
            console.log(res.data)
        })
        console.log("delete");
    }

  return (
    <div style={{marginLeft:"40px"}}><li>{name}<br></br>
    <button onClick={deletedata} >Delete</button>{childData.map((item1)=>(<Recursion item={item1}/>))}</li>
    </div>
  )
}

export default Recursion