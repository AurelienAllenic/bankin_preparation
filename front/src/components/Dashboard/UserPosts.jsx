import React, {useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";
import LikesDislikes from './Likes';

const UserPosts = () => {
    const navigate = useNavigate();
    const [userPosts, setUserPosts] = useState([]);

    const logout = () => {
        localStorage.clear()
        navigate("/")
        window.location.reload()
      }

      const userId = localStorage.getItem('userId');

      useEffect(() => {
        axios.get('http://localhost:4000/api/post/all')
            .then(res => {
                const userPostsData = res.data.filter(post => post.userId === userId);
                const sortedUserPosts = userPostsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setUserPosts(sortedUserPosts);
            }).catch(err => {
                console.log('pas de posts');
            });
    }, [userId]);

  return (
    <section id='dashboard'>
        <button onClick={logout}>Logout</button>
        <Link to='/create-post'>Créer un Post</Link>
            {userPosts.length > 0 && (
                <ul>
                    {userPosts.map((post) => (
                        <li key={post._id}>
                            <p>
                                <Link to={`/one-post/${post._id}`}>
                                    {post.title}
                                </Link>
                            </p>
                            <p>{post.description}</p>
                            <img src={post.imageUrl} alt={post.title} />
                            <LikesDislikes post={post} />
                        </li>
                    ))}
                </ul>
            )}
    </section>
  )
}

export default UserPosts