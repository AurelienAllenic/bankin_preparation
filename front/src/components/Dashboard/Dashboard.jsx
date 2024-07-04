import React, {useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";
import LikesDislikes from './Likes';

const Dashboard = () => {
    const navigate = useNavigate();
    const [allData, setAllData] = useState([]);

    const logout = () => {
        localStorage.clear()
        navigate("/")
        window.location.reload()
      }

    useEffect(() => {
        axios.get('http://localhost:4000/api/post/all')
      .then(res => {
        console.log(res)
        setAllData(res.data)
        navigate('/');
      }).catch(err => {
        alert(err.message + ' - pas de posts');
      })
    }, [])

  return (
    <section id='dashboard'>
        <button onClick={logout}>Logout</button>
        <Link to='/create-post'>Créer un Post</Link>
            {
            allData.length > 0 && (
                <ul>
                    {allData.map((data) => (
                        <li key={data._id}>
                            <p>
                                <Link to={`/one-post/${data._id}`}>
                                    {data.title}
                                </Link>
                            </p>
                            <p>{data.description}</p>
                            <img src={data.imageUrl} alt={data.title} />
                            <LikesDislikes post={data} />
                        </li>
                    ))}
                </ul>
            )
        } 
    </section>
  )
}

export default Dashboard