import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'

export default class AddFolder extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: ""
    }
  }

  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;
  handleSubmit = event => {
    event.preventDefault()
    let currentValue= event.target.folderInput.value
    const folder = {
      name: event.target['folderInput'].value
    }
    if (currentValue === "") {
      this.setState({
        error: "Please provide a folder name"
      });
    } else {
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then(folder => {
      this.context.addFolder(folder)
      this.props.history.push(`/folder/${folder.id}`)
    })
    .catch(error => {
      console.error( {error} )
    })
  }
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='form'>
            <label htmlFor='folderInput'>
              Enter a folder name: 
            </label>
            <input type='text' id='folderInput' name='folderInput' />
          </div>
          <div className='button'>
            <button type='submit'>
              Add folder
            </button>
          </div>
          <div className="error">
            {this.state.error}
          </div>
        </NotefulForm>
      </section>
    )
  }
}
