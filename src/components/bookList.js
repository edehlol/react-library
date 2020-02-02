import React from 'react'
import styled from 'styled-components'

const TableContainer = styled.div`
color: #1c1c1c;
`
const Table = styled.table`
  font-size: 14px;
  width: 100%;
  border-collapse: collapse;
//   grid-template-columns: 208px 168px 80px 80px 104px;
`
const Tr = styled.tr`
//   border-bottom: 1px solid; 
// display: grid;
// grid-template-columns:   208px 168px 80px 80px 104px;
width: 100%;
border-bottom: 1px solid #bfbfbf;
height: 64px;
// @media only screen and (max-width: 896px) {
//     width: 80%;
//     background: green;
// }

`
const EditButton = styled.button`
    border: none;
    background: none;
    text-decoration: underline;
    font-size: 14px;
    color: #1890ff;
    &:hover {
        cursor: pointer;
    }
`
const Th = styled.th`
    font-size: 16px;
    font-weight: 500;
    text-align: left;
`
class BookList extends React.Component {
    render() {
      const bookList = this.props.books.map(book =>
        <Tr key={book.id} id={book.id}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.pages}</td>
          <td>{book.read ? 'Read' : 'Not Read'}</td>
          <td><EditButton onClick={this.props.handleClickEdit}>Edit</EditButton></td>
        </Tr>
        )
      return (
          <TableContainer>
<Table>
          <thead>
            <Tr>
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>Pages</Th>
              <Th>Status</Th>
              <Th></Th>
            </Tr>
          </thead>
          <tbody>
            {bookList}
          </tbody>
        </Table>
          </TableContainer>
        
      )
    }
  }

  export default BookList