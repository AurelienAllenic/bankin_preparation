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
            console.log(res)
            setPost(res.data);
        });
    }, []);

  return (
      <div>
          <ul>
              <li key={post._id}>
                  <p>{post.title}</p>
                  <p>{post.description}</p>
                  <img src={post.imageUrl} alt={post.title} />
              </li>
          </ul>
      </div>
  )
}

export default OnePost