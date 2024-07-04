import React, { useState, useEffect } from 'react'
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs"
import axios from 'axios'
import { useParams } from "react-router-dom";

const LikesDislikes = ({ post }) => {
  const params = useParams();
  const [likes, setLikes] = useState(0)
  const [likeActive, setLikeActive] = useState(false)

  useEffect(() => {
    setLikes(post.likes)
    setLikeActive(
      post && post.usersLiked && post.usersLiked.includes(localStorage.userId)
    )
  }, [post])


  const LikeBack = () => {
    const numberLikes = { like: likeActive ? 0 : 1 };
    axios.post(`http://localhost:4000/api/post/${post._id}/like`, numberLikes).then((res) => {
        setLikeActive(res.data.likeActive);
        console.log(res.data.likeActive)
        if (res.data.likeActive) {
            setLikes(likes + 1);
        } else {
            setLikes(likes - 1);
        }
    }).catch((error) => {
        console.log(error);
    });
}


  return (
    <>
      <div>
        <button onClick={LikeBack}><BsHandThumbsUp />{likes}</button>
      </div>
    </>
  )
}

export default LikesDislikes