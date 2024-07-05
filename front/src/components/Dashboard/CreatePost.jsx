import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
    };

    const onSubmit = data => {
        const formData = new FormData();
        formData.append("imageUrl", data.imageUrl[0])
        formData.append("title", data.title)
        formData.append("description", data.description)
        axios.post('http://localhost:4000/api/post/create', formData)
            .then(res => {
                alert('post créé !')
                navigate('/')
            }).catch(err => {
                alert(err.message + ' - Erreur lors de la création du post')
            });
    }


  return (
    <section id='dashboard'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="title" placeholder='Titre' {...register('title', { required: true })} />
                <textarea placeholder='description' name="description" rows="8" {...register('description', { required: true })} />
                <label htmlFor="imageUrl">Image</label>
                <input id="imageUrl" type="file" name="image" placeholder='image' {...register('imageUrl', { required: false })} onChange={handleImageChange}/>
                {selectedImage && <img src={selectedImage} alt="Selected" />}
                <button type="submit" placeholder='valider' />
            </form>
    </section>
  )
}

export default CreatePost
