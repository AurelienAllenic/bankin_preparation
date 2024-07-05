import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();


  const onSubmit = data => {
    axios.post('http://localhost:4000/api/user/login', data)
      .then(res => {
        // On enregistre le token dans le localStorage
        localStorage.token = res.data.token;
        localStorage.userId = res.data.userId;
        // On "enregistre" le token dans la conf. de Axios
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
        // On "navigate" (redirige) vers '/my-notes'
        navigate('/');
      }).catch(err => {
        alert(err.message + ' - Paire email / mot de passe incorrecte');
      })
  }


  return (
    <section id='login'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input type="text"
              name="login"
              placeholder="login"
              rules={{ required: true }}
              {...register('login', { required: true })}></input>
            <input type="password"
              name="password"
              placeholder="mot de passe"
              rules={{ required: true }}
              {...register('password', { required: true })}></input>
            <input type="submit" name="valider" value="Valider"></input>
          </div>
        </form>
        <div>
            <p>Pas encore inscrit ?</p>
            <Link to='/signup'>
                Créer un compte
            </Link>
        </div>
    </section>
  )
}

export default Login
