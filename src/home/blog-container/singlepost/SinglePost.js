import { Container, Typography, Card, CardHeader, CardContent, Button } from '@mui/material'
import React, {useEffect, useState} from 'react'
import axios from "../../../api/axios"
import { useNavigate, useParams } from 'react-router-dom';
import {    Link,
  } from "react-router-dom";

export default function SinglePost() {
    const navigate = useNavigate()
    const { id } = useParams(); // Reads the URL on the URL Bar and gets whatever is after ":"
    const [post, setPost] = useState({});

    const handleSubmit= () => {
        axios.delete(`/delete-post/${id}`, 
        { headers:
        {"Authorization": `Bearer ${localStorage.getItem('access_token')}`}})
             .then((response) => console.log(response))
             .then(() => navigate('/'))
    }

    // mount
    useEffect(() => {
        axios.get(`/get-post/${id}`)
        .then(function (response) {
            // handle success
            setPost(response.data.post)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }, []);

    const SuperButton = () => {
        if(post.user_id == localStorage.getItem('user_id')){return(<>
            <Button variant = "contained" 
                    color ="success"><Link to={`/update-post/${post.id}`} 
                    style = {{textDecoration: "none", color: "inherit"}}>edit post </Link></Button>
                <Button variant = "contained"
                    color = "error" onClick = {handleSubmit}>delete post</Button></>)
        }else{
            return(console.log("empty"))
        }
    }
    return (
        <Container maxWidth="lg">
            <Card>
                <CardHeader title={`${post.title}`}></CardHeader>
                <CardContent>
                    <Typography variant="h5">{post.summary}</Typography>
                    <Typography variant="body">{post.body}</Typography>
                    <div><Typography variant="h10" m={4}>Created on {post.created_on} this is {post.id}</Typography></div>
                </CardContent>
            </Card>
                {/* {console.log("the ids are",post.user_id, localStorage.getItem('user_id'))} */}
                {SuperButton()}
                {/* {(post.user_id===localStorage.getItem('user_id')?<>
                <Button variant = "contained" 
                    color ="success"><Link to={`/update-post/${post.id}`} style = {{textDecoration: "none", color: "inherit"}}>edit post {post.id} </Link></Button>
                <Button variant = "contained"
                    color = "error" onClick = {handleSubmit}>delete post {post.id}</Button></>:(<></>))} */}
        </Container>
    )
}
