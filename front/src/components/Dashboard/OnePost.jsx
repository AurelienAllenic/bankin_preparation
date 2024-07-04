import React, {useEffect, useState} from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const OnePost = () => {
    const params = useParams();
    console.log(params.id, "params")
    const navigate = useNavigate();
    const [post, setPost] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/post/${params.id}`).then((res) => {
            console.log(res.data._id)
            setPost(res.data);
        }).catch((err) => {
          console.log(err.response.data)
          alert(err.message + " - Erreur lors de la récupération du post");
        });
    }, []);

    const deletePost = (PostId) => {
      
      axios.delete(`http://localhost:4000/api/post/${PostId}`).then((res) => {
            navigate('/')
        }).catch((err) => {
          console.log(PostId)
          alert(err.message + " - Erreur lors de la suppression du post");
        });
    }

  return (
      <div>
          <ul>
              <li key={post._id}>
                  <p>{post.title}</p>
                  <p>{post.description}</p>
                  <img src={post.imageUrl} alt={post.title} />
              </li>
          </ul>
          <div>
            <button onClick={() => deletePost(post._id)}>Supprimer</button>
            <Link to={`/update-post/${post._id}`}>Modifier</Link>
          </div>
      </div>
  )
}

export default OnePost