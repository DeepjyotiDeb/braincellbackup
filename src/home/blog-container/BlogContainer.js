import { Container } from '@mui/material'
import React, {useEffect, useState} from 'react'
import Post from './post/Post'
import axios from "../../api/axios";

export default function BlogContainer() {

    const [posts, setPosts] = useState([]);

    // mount
    useEffect(() => {
        console.log("This got called")
        axios.get('/posts')
        .then(function (response) {
            // handle success
            console.log('here is my data', response.data);
            setPosts(response.data.posts)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            // <h1>nothing</h1>
        });
    }, []);

    const postComponents = posts.map(item => {
        return <Post key={item.id} postData={item}></Post>
    })

    return (
        <Container maxWidth="lg">
            {postComponents}
        </Container>
    )
}
