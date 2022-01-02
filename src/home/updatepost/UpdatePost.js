import { Container, Box, Typography, Card, CardHeader, Button, TextField } from '@mui/material'
import React, {useEffect, useState} from 'react'
import axios from "../../api/axios";
import { useNavigate,useParams } from "react-router-dom"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "../makepost/styles.css"

export default function UpdatePost() {
    let navigate = useNavigate();
    const { id } = useParams(); // Reads the URL on the URL Bar and gets whatever is after ":"
    const [post, setPost] = useState({});
    const [values, setValues] = useState({
        title: "",
        summary: "",
      })
    const [body, setBody] = useState("");

    useEffect(() => {
        axios.get(`/get-post/${id}`)
        .then(function (response) {
            setPost(response.data.post)
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('edited values', values, body);
        axios.put(`/update-post/${post.id}`, { 'title': values.title, 'summary': values.summary, 'body': body},
        { headers:
            {"Authorization" : `Bearer ${localStorage.getItem('access_token')}`}})        
        .then(()=> navigate('/'))    
      }
    // mount    
    
    return (
        <Container maxWidth="lg">
            <Card>
                <CardHeader title={`Currently Viewing ${post.title}`}></CardHeader>
                    <Typography variant="h5">{post.summary}</Typography>
                    <div dangerouslySetInnerHTML={{ __html: post.body}} />
                    <div><Typography variant="h10" m={4}>Created on {post.created_on}</Typography></div>
            </Card>
            <Box component="form" noValidate autoComplete="off">
            <div>
      <div>    
    <TextField
          onChange={handleChange}
          id="outlined-textarea"
          label="title"
          name="title"
          placeholder={post.title}
          multiline
          value={values.title}
          sx = {{float: 'left',m:1}}
        /></div>
        <div>
    <TextField
          id="outlined-textarea2"
          onChange={handleChange}
          label="Summary"
          name="summary"
          placeholder={post.summary}
          multiline
          value={values.summary}
          sx = {{float: 'left', m:1, width:'60ch' }}
        /></div>
        <div className="editor">
    {/* <TextField
          onChange={handleChange}
          id="outlined-textarea3"
          label="Body"
          name="body"
          placeholder={post.body}
          multiline
          value={values.body}
          size = "large"
          sx = {{float: 'left', m: 1, width:'100ch', height: '90%' }}
        /> */}
        <div className="cke">
        <CKEditor 
        editor={ ClassicEditor }        
        onChange={ ( event, editor ) => {
            const data = editor.getData();           
            setBody(data)          
          } }        
    /></div>
    </div><div>  
            <Button variant = "contained" 
                    color ="success"
                    // onClick={handleClick}>Update Post</Button>
                    sx = {{float: 'left', m: 1, width:'50ch', height: '90%' }}
                    onClick={handleSubmit}>Update Post</Button></div> </div></Box>                   
        </Container>
    )
}
