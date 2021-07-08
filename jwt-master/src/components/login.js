import React from "react"
import {Redirect} from "react-router-dom"
import Axios from "axios"
import '../App.css';

export default class Login extends React.Component{

    constructor(){
        super()
        let loggedIn = false
        
        const token = localStorage.getItem("token")
        if(token) loggedIn = true

        this.state = {
            username: "",
            password: "",
            loggedIn,
            error: ""
        }

        this.onChange =  this.onChange.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async formSubmit(e){
        e.preventDefault()
        const {username, password} = this.state
        try {
            const token = await Axios.post("/login", {username, password})
            localStorage.setItem("token", token)
            this.setState({
                loggedIn: true
            })
        } catch (err) {
            this.setState({
                error: err.message
            })
        }
    }

    render(){
        if(this.state.loggedIn === true){
            return <Redirect to="/dashboard" />
        }
        return(
            <div class="App">
            <h1>Enter Username & Password to be "sourav" to get Authenticated!</h1>
            <form onSubmit={this.formSubmit}>
                <input type="text" placeholder="Enter Username" value={this.state.username} onChange={this.onChange} name="username" />
                <input type="password" placeholder="Enter Password" value={this.state.password} onChange={this.onChange} name="password" />
                <input type="submit" />
                {this.state.error}
            </form>
            </div>
            
        )
    }
}