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
        <Form onSubmit={this.props.handleSubmit} className='newBookForm'>
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
              value={this.props.read}
              onChange={this.props.handleChange}
            />
          </label>
          <button>Add</button>
        </Form>
      </div>
    )
  }
}
class AddBook extends React.Component {
  render() {
    return (
      <button>Add Book</button>
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
      read: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)
  }
  handleClickEdit(button) {
    books.map(book => {
      if (book.id === Number(button.target.parentNode.parentNode.id)) {
        this.setState({
          title: book.title
        })
      }
    })
    console.log(button.target.parentNode.parentNode.id)
    const test = books.map(book => 
      console.log(book.id)
      )
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
    console.log(form.target.classList)
    if (form.target.classList.contains('newBookForm')) {
      const book = new Book(
        this.state.title, 
        this.state.author,
        this.state.pages,
        this.state.read
        )
        books.push(book)
    }
    this.setState({
      title: '',
      author: '',
      pages: '',
      read: false
    })
    
    console.log(books)
  }
  render() {
    return (
      <div>
        <h1>My Library</h1>
        <BookList
          handleClickEdit={this.handleClickEdit}
        />
        <BookForm
          title={this.state.title}
          author={this.state.author}
          pages={this.state.pages}
          read={this.state.read}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <AddBook/>
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
