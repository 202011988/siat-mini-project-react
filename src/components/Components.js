import React, { useState } from "react";
import { Link, Outlet, useLocation, useParams, useSearchParams } from "react-router-dom";

// /home

export function Main() {
    return (
        <div>
            <h1>Mainpage</h1>
            <a href="/signin">로그인</a> <br />
            <a href="/signup">회원가입</a>
        </div>
    );
}

export function SignUp() {

    return (
        <div>
            <h1>SignUp</h1>
        </div>
    );
}

// /home
export function SignIn() {
    return (
        <div>
            <h1>Login</h1>
        </div>
    );
}

export function Projects() {
    const { projectId } = useParams();

    return (
      <div>
          <h1>Projects</h1>
          <a>project id : {projectId}</a>

          <Outlet />
      </div>
    );
}

export function Tasks() {

    const { taskId } = useParams();

    return (
        <div>
            <h2>Tasks</h2>
            <p>task id : {taskId}</p>
        </div>
    );
}




export function NotFoundPage() {
    return <div>Page Not Found</div>;
}
