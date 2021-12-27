import React from 'react'
import { Card, CardHeader, CardContent, Typography, Box,  } from '@mui/material'
import { Link } from "react-router-dom";
export default function Post(props) {   

    const postData = props.postData;

    return (
        <Box m={3}>
            <Card>
                <CardHeader title={<Link to={`/view-post/${postData.id}`} 
                            style = {{ color: "inherit", underline : "never"}}>
                                {postData.id} {postData.title}
                                    </Link>}>
                </CardHeader>
                <CardContent>
                    <Typography variant="h5">{postData.summary}</Typography>
                    {/* <Typography variant="body">{postData.body}</Typography> */}
                    <div><Typography variant="h10" m={4}>Created on {postData.created_on}</Typography></div>
                </CardContent>
            </Card>
        </Box>
    )
}
