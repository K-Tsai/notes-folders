import React, { Component } from 'react'

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
	static contextType = ApiContext;
	
	handleSubmit(event) {
		event.preventDefault();
	}
  render() {
    return (
      <section className='AddNote' onSubmit={e => this.handleSubmit(e)}>
        <h2>Create a Note</h2>
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
            <input type= 'text' id='folder-choice' name='folder-choice' />
          </div>
          <div className='button'>
            <button type='submit'>
							Submit
            </button>
          </div>
      </section>
    )
  }
}