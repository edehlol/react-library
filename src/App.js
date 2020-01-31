import React from 'react';
import './App.css';
// import mastery from './mastery.jpg'
// import antifragile from './antifragile.jpg'
// import lotr from './lotr.png'
import styled from 'styled-components'

const Table = styled.table`
  margin: 0 auto;
`
const Form = styled.form`
  text-align: left;
`

const books = []

const generateKey = () => {
  return (Math.floor(Date.now() / Math.random() * 3))
}
class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = generateKey()
  }
  setTitle(newTitle) {
    this.title = newTitle
  }
}
const lotr = new Book('Lord of the Rings', 'J.R.R. Tolkien', '654', 'Read')
const antifragile = new Book('Antifragile', 'Nassim Taleb', '894', 'Read')
books.push(lotr)
books.push(antifragile)


class BookForm extends React.Component {
  render() {
    return (
      <div>
        <Form className={this.props.formType} onSubmit={this.props.handleSubmit}>
          <label>
            Title:
            <input 
              type='text' 
              name='title'
              value={this.props.title} 
              onChange={this.props.handleChange}
            />
          </label>
          <br/>
          <label>
            Author:
            <input 
              type='text' 
              name='author'
              value={this.props.author} 
              onChange={this.props.handleChange}
            />
          </label>
          <br/>
          <label>
            Pages:
            <input 
              type='text'
              name='pages'
              value={this.props.pages}
              onChange={this.props.handleChange}
            />
          </label>
          <br/>
          <label>
            Read:
            <input 
              type='checkbox'
              name='read'
              // value={this.props.read}
              checked={this.props.read}
              onChange={this.props.handleChange}
            />
          </label>
          {this.props.formType === 'newBookForm' &&
            <button>Add</button>
          }
          {this.props.formType === 'editBookForm' &&
          <div>
            <button onClick={this.props.handleClickSave}>Save</button>
            <button onClick={this.props.handleClickDelete} name='delete'>Delete</button>
          </div>
          }
        </Form>
      </div>
    )
  }
}
class AddBook extends React.Component {
  render() {
    return (
      <button onClick={this.props.toggleForm}>Add Book</button>
    )
  }
}
class BookList extends React.Component {
  render() {
    const bookList = books.map(book =>
      <tr key={book.id} id={book.id}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.pages}</td>
        <td>{book.read ? 'Read' : 'Not Read'}</td>
        <td><button onClick={this.props.handleClickEdit}>Edit</button></td>
      </tr>
      )
    return (
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {bookList}
        </tbody>
      </Table>
    )
  }
}
        
class Library extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // The book form
      title: '',
      author: '',
      pages: '',
      read: false,
      id: null,
      // Toggle form between adding book and editing book
      formType: 'newBookForm',
      formDisplayed: false
    }
    this.toggleForm = this.toggleForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)
    this.handleClickSave = this.handleClickSave.bind(this)
    this.handleClickDelete = this.handleClickDelete.bind(this)
  }
  clearStates() {
    this.setState({
      title: '',
      author: '',
      pages: '',
      read: false,
      id: null,
      formType: 'newBookForm'
    })
  }
  toggleForm() {
    this.setState( state => ({
      formDisplayed: state.formDisplayed ? false : true
    }))
  }
  handleClickEdit(button) {
    if (this.state.formDisplayed === false) {
      this.setState({
        formDisplayed: true
      })
    }
    this.setState(state => ({
      formType: state.formType === 'newBookForm' ? state.formType = 'editBookForm' : state.formType = 'newBookForm'
    }))
    books.map(book => {
      if (book.id === Number(button.target.parentNode.parentNode.id)) {
        this.setState({
          title: book.title,
          author: book.author,
          pages: book.pages,
          read: book.read,
          id: Number(button.target.parentNode.parentNode.id)
        })
      }
    })
  }
  handleClickSave(button) {
    button.preventDefault()
    books.map(book => {
      if (book.id === this.state.id) {
        book.title = this.state.title
        book.author = this.state.author
        book.pages = this.state.pages
        book.read = this.state.read
        this.clearStates()
      }
    })
  }
  handleClickDelete(button) {
    books.map((book, index) => {
      alert('Are you sure you want to delete this book? This action cannot be undone.')
      if (book.id === this.state.id) {
        console.log(index)
        books.splice(index,1)
        console.log(books)
      }
    })
  }
  handleChange(input) {
    const target = input.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = input.target.name
    this.setState({
      [name]: value
    })
  }
  handleSubmit(form) {
    form.preventDefault()
    if (form.target.classList.contains('newBookForm')) {
      const book = new Book(
        this.state.title, 
        this.state.author,
        this.state.pages,
        this.state.read
        )
        books.push(book)
    }
    this.clearStates()
  }
  render() {
    return (
      <div>
        <h1>My Library</h1>
        <BookList
          handleClickEdit={this.handleClickEdit}
        />
        {(this.state.formDisplayed && 
                  <BookForm
                  title={this.state.title}
                  author={this.state.author}
                  pages={this.state.pages}
                  read={this.state.read}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  handleClickSave={this.handleClickSave}
                  handleClickDelete={this.handleClickDelete}
                  formType={this.state.formType}
                />
          )}

        <AddBook toggleForm={this.toggleForm}/>
      </div>
    )
  }
}
function App() {
  return (
    <div className="App">
      <Library/>
    </div>
  );
}

export default App;
