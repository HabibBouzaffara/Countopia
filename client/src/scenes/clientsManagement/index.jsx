import React,{useEffect, useState} from "react";

const Clients = () => {
    const [user,setUser]=useState(null);

    const getClients = async () => {
        try {
          const clients = await fetch(process.env.REACT_APP_BASE_URL + "/clients", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const data = await clients.json();
          if (!clients.ok) {
            throw new Error(data.msg);
          }
          setUser(data);
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(() => {
        getClients();
      }, []);
      if (!user) return null;
      return <p>{user.map((u)=>u.name)}</p>

     
    };


export default Clients;