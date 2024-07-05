import React, {useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
    const navigate = useNavigate();
    const { handleSubmit } = useForm();
    const params = useParams();
    const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '' });

    useEffect(() => {
        axios.get(`http://localhost:4000/api/post/${params.id}`).then((res) => {
            setFormData(res.data);
        }).catch((err) => {
            alert(err.message + " - Erreur lors de la récupération du post");
        });
    }, [params.id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setFormData({ ...formData, imageUrl: imageUrl });
    };

    const onSubmit = () => {
        const updatedData = new FormData();
        updatedData.append("imageUrl", formData.imageUrl)
        updatedData.append("title", formData.title)
        updatedData.append("description", formData.description)
        axios.put(`http://localhost:4000/api/post/${params.id}`, updatedData)
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
                <input type="text" name="title" placeholder='title' value={formData.title} onChange={handleInputChange} />
                <textarea placeholder='description' name="description" rows="8" value={formData.description} onChange={handleInputChange} />
                <label htmlFor="imageUrl">Image</label>
                <input id="imageUrl" type="file" name="image" onChange={handleImageChange} />
                {formData.imageUrl && <img src={formData.imageUrl} alt={formData.title} />}
                <button type="submit" placeholder='valider' />
            </form>
    </section>
  )
}

export default UpdatePost
