import React from 'react';
import './App.css';
// import mastery from './mastery.jpg'
// import antifragile from './antifragile.jpg'
// import lotr from './lotr.png'
import styled from 'styled-components'
import Book from './modules/book.js'
import BookList from './components/bookList.js'
import BookForm from './components/bookForm.js'

const Header = styled.header`
  // margin-top: 16px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  width: 100%;
  height: 40px;
  background: #1890ff;
`
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: white;
  text-align: right;
  margin-right: 24px;
`
const Content = styled.div`
  margin-top: 48px;
  // position: absolute;
  // background: green;
  height: 100%;
  width: 896px;
  float: right;
`
const AddBookButton = styled.button`
  position: absolute;
  left: 106px;
  bottom: 40px;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  background: #40a9ff;
  &:hover {
    background: #1890ff;
    cursor: pointer;
  }
  color: white;
  font-size: 16px;
  font-weight: 500;
  width: 128px;
  height: 32px;
`
const lotr = new Book('Lord of the Rings', 'J.R.R. Tolkien', '654', 'Read')
const antifragile = new Book('Antifragile', 'Nassim Taleb', '894', 'Read')

const books = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [lotr,antifragile]

class AddBook extends React.Component {
  render() {
    return (
      <AddBookButton onClick={this.props.toggleForm}>Add Book</AddBookButton>
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
      titleValid: false,
      authorValid: false,
      // Toggle form between adding book and editing book
      formType: 'newBookForm',
      formDisplayed: false
    }
    this.toggleForm = this.toggleForm.bind(this)
    this.toggleFormOn = this.toggleFormOn.bind(this)
    this.toggleFormOff = this.toggleFormOff.bind(this)
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
  toggleFormOn() {
    this.setState({
      formDisplayed: true
    })
  }
  toggleFormOff() {
    this.setState({
      formDisplayed: false
    })
  }
  toggleForm() {
    this.clearStates()
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
      formType: 'editBookForm'
      // formType: state.formType === 'newBookForm' ? state.formType = 'editBookForm' : state.formType = 'newBookForm'
    }))
    books.forEach(book => {
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
    books.forEach(book => {
      if (book.id === this.state.id) {
        book.title = this.state.title
        book.author = this.state.author
        book.pages = this.state.pages
        book.read = this.state.read
        localStorage.setItem('books', JSON.stringify(books))
        this.toggleForm()
      }
    })
  }
  handleClickDelete() {
    books.forEach((book, index) => {
      // alert('Are you sure you want to delete this book? This action cannot be undone.')
      if (book.id === this.state.id) {
        books.splice(index,1)
        localStorage.setItem('books', JSON.stringify(books))
        this.clearStates()
        this.toggleForm()
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
  formValidation(input, type='text') {
    console.log(input.toString())
    if (input === '') {
      this.setState({
        [input]: false
      })
    }
  }
  handleSubmit(form) {
    form.preventDefault()
    this.formValidation(this.state.title)
    if (form.target.classList.contains('newBookForm')) {
      if (!this.formValidation(this.state.title)) {
        // this.setState({
        //   formValid: false
        // })
        console.log('fff')
        return
      }
      else {
        this.setState({
          formValid: true
        })
        const book = new Book(
          this.state.title, 
          this.state.author,
          this.state.pages,
          this.state.read
          )
          books.push(book)
          localStorage.setItem('books', JSON.stringify(books))
      }
      this.toggleForm()
      }

  }
  render() {
    let myBooks = books
    return (
      <div>
        <Header>
          <Title>My Library</Title>
        </Header>
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
                    toggleForm={this.toggleForm}
                    toggleFormOff={this.toggleFormOff}
                    toggleFormOn={this.toggleFormOn}
                  />
            )}
        <Content>
          <BookList
            handleClickEdit={this.handleClickEdit}
            books={myBooks}
          />


          <AddBook toggleForm={this.toggleForm}/>
        </Content>
        
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
