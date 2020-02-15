import React ,{Component, Fragment} from 'react';

export default class extends Component{
    render(){
        return(
         <Fragment>   
            <nav className="navigation">
                <h2>Flamigo</h2>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/users">Users</a>
              </li>
            </ul>
          </nav>
        </Fragment>
        )
    }
}