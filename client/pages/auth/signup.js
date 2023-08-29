import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const Signup = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { doRequest, errors } = useRequest({
      url: "/api/users/signup",
      method: "post",
      body: {
         email,
         password
      },
      onSuccess: () => Router.push("/")
   });

   const onSubmit = async (ev) => {
      ev.preventDefault();

      await doRequest();
   };

   return (
      <form onSubmit={onSubmit}>
         <h1>Sign Up</h1>
         <div className="form-group">
            <label>Email Address</label>
            <input value={email} onChange={(ev) => setEmail(ev.target.value)} className="form-control" />
         </div>
         <div className="form-group">
            <label>Password</label>
            <input
               value={password}
               type="password"
               onChange={(ev) => setPassword(ev.target.value)}
               className="form-control"
            />
         </div>
         {errors}
         <button className="btn btn-primary">Sign Up</button>
      </form>
   );
};

export default Signup;
