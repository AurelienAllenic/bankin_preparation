import React, {useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const params = useParams();
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


    const onSubmit = data => {
        const formData = new FormData();
        formData.append("imageUrl", data.imageUrl[0])
        formData.append("title", data.title)
        formData.append("description", data.description)
        axios.put(`http://localhost:4000/api/post/${params.id}`, formData)
            .then(res => {
                alert('post modifié !')
                navigate('/')
            }).catch(err => {
                alert(err.message + ' - Erreur lors de la modification du post')
            });
    }

  return (
    <section id='dashboard'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="title" placeholder='title' defaultValue={post.title} {...register('title', { required: false })} />
                <textarea placeholder='description' defaultValue={post.description} name="description" rows="8" {...register('description', { required: false })} />
                <label htmlFor="imageUrl">Image</label>
                <input id="imageUrl" type="file" name="image" placeholder='image' {...register('imageUrl', { required: false })} />
                <img src={post.imageUrl} alt={post.title} />
                <button type="submit" placeholder='valider' />
            </form>
    </section>
  )
}

export default UpdatePost