import React, { Component } from 'react'

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
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
      </section>
    )
  }
}
