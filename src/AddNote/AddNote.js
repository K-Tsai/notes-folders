import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'


export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
	static contextType = ApiContext;
	
	handleSubmit = event => {
    event.preventDefault();
    const newNote = {
      name: event.target['note-name-input'].value,
      content: event.target['note-content-input'].value,
      folderId: event.target['folder-choice'].value,
      modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method:'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
    .then(res => {
      if(!res.ok)
        return res.json().then(e => Promise.reject(e))
        return res.json()
    })
    .then(note => {
      this.context.addNote(note)
      this.props.history.push(`/folder/${note.folderId}`)
    })
    .catch(error => {
      console.error( {error} )
    })
  }

  render() {
    const {folders = [] } = this.context
    return (
      <section className='AddNote' onSubmit={e => this.handleSubmit(e)}>
        <h2>Create a Note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='form'>
            <label htmlFor='note-name-input'>
              Enter a note name: 
            </label>
            <input type='text' id='note-name-input' name='note-name-input' />
            <label htmlFor='note-content-input'>
                Enter content:
            </label>
            <input type= 'text' id='note-content-input' name='note-content-input' />
            <label htmlFor='folder-choice'>
                Enter folder:
            </label>
            <select id ='folder-choice' name='folder-choice'>
              <option value ={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='button'>
            <button type='submit'>
							Submit
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}