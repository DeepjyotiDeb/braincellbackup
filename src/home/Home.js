import React from 'react'
import Navbar from "./navbar/Navbar"
import BlogContainer from "./blog-container/BlogContainer"
import SinglePost from "./blog-container/singlepost/SinglePost"
import MakePost from './makepost/makePost'
import MyPost from './blog-container/mypost/MyPost'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import UpdatePost from './updatepost/UpdatePost'
import SignUp from './navbar/signup/SignUp'

export default function Home() {
    return (
        <div>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<BlogContainer></BlogContainer>}></Route>
                    <Route path="/view-post/:id" element={<SinglePost/>}></Route>
                    <Route path="/update-post/:id" element={<UpdatePost/>}></Route>
                    <Route path="/create-post" element={<MakePost></MakePost>}></Route>
                    <Route path="/my-posts" element={<MyPost/>}></Route>
                    <Route path="/sign-up" element={<SignUp/>}></Route>
                    </Routes>
            </Router>
        </div>
    )
}
