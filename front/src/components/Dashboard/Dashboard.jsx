import React, {useEffect, useState} from 'react'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
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
        setAllData(res.data)
        navigate('/');
      }).catch(err => {
        console.log('pas de posts')
      })
    }, [navigate])

  return (
    <section id='dashboard'>
        <button onClick={logout}>Logout</button>
        <Link to='/create-post'>Créer un Post</Link>
        <Link to='/user-posts'>Vos Post</Link>
            {allData.length > 0 && (
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
            )}
    </section>
  )
}

export default Dashboard
