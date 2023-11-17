import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAuth from '../Hooks/useAuth';

const PhotoUpload = () => {
  const {
    register,
    handleSubmit,
  } = useForm();
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=f9ac07b10a13ed0f0fc1151de85b1d26`;
const {user}= useAuth();
const userName= user.displayName;
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const {userName}= data;
          const newData = {userName, image: imgURL };
          axiosSecure.post('/userphoto', newData)
            .then(data => {
              if (data.insertedId) {
                toast.success("User created successfully");
              }
              navigate("/users");
              console.log('after successful data sending to server', data.data);
            })
        }
      });
  };

  return (
    <>
      <div className="photosss">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="myCokj">
            <h5>Upload Your Photo</h5>
          <input
            className="fileForm"
            {...register("image", { required: true, maxLength: 120 })}
            type="file"
            accept="image/*"
            capture="camera" // This captures a photo using the device camera
          />
            </div>
            <br/>
          <input className="logOutButton" type="submit" name="Submit" id="" />
        </form>
      </div>
    </>
  );
};

export default PhotoUpload;
