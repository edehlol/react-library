import React from 'react'
import styled from 'styled-components'


const Sidebar = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 336px;
    height: 100%;
    padding-top: 64px;
    border-right: 1px;
    box-shadow: 1px 0px 2px 0px rgba(0,0,0,0.35);
    z-index: 2;
    background: #fafafa;
    color: #1c1c1c;
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
`
const Title = styled.h2`
    font-size: 24px;
    font-weight: 500;
    margin-top: 0px;
    margin-right: 32px;
    text-align: right;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 272px;
  height: 100%;
  font-size: 14px;
  margin: auto;

`
const LabelAndInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 272px;
  height: 32px;
  margin-top: 16px;
  margin-bottom: 16px;
  padding-bottom: 32px;
  border-bottom: 1px solid #bfbfbf;
`
const Label = styled.label`
    font-size: 14px;
    height: 24px;
    line-height: 28px;
    width: 64px;
    text-align: left;

`
const Input = styled.input`
    flex: 1;
    height: 24px;
    font-size: 14px;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
    padding-left: 8px;
    padding-right: 8px;
    &:focus {
      border: 2px solid #40a9ff;
    }
`
const SaveButton = styled.button`
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
const CancelButton = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  text-decoration: none;
  text-decoration: underline #1c1c1c;
  border: none;
  background: none;
  margin-top: 8px;
  &:hover {
    cursor: pointer;
    font-weight: 500;
  }
`
const SaveAndCancelContainer = styled.div`
  text-align: center;
`
const DeleteButton = styled.button`
  align-self: flex-end;
  text-align: right;
  margin-top: 104px;
  height: 32px;
  width: 128px;
  border: none;
  background: none;
  color: #ff4d4f;
  text-decoration: underline #ff4d4f;
  font-size: 14px;
  font-weight: 400;

  &:hover {
    cursor: pointer;
    color: #f5222d;
    text-decoration: underline #f5222d;
  }
`

class BookForm extends React.Component {
    render() {
      return (
        <Sidebar>
            {this.props.formType === 'editBookForm' && 
                <Title>{this.props.title}</Title>
            }
            {this.props.formType === 'newBookForm' &&
                <Title>New book</Title>
            }
          <Form className={this.props.formType} onSubmit={this.props.handleSubmit}>
            <LabelAndInput>
              <Label>
                  Title*: 
              </Label>
              <Input 
                  type='text' 
                  name='title'
                  value={this.props.title} 
                  onChange={this.props.handleChange}
              />
            </LabelAndInput>

            <LabelAndInput>
              <Label>
                Author*:
              </Label>
              <Input 
                  type='text' 
                  name='author'
                  value={this.props.author} 
                  onChange={this.props.handleChange}
                />
            </LabelAndInput>

            <LabelAndInput>
              <Label>
                Pages:

              </Label>
              <Input 
                  type='number'
                  name='pages'
                  value={this.props.pages}
                  onChange={this.props.handleChange}
                />
            </LabelAndInput>
            <LabelAndInput>
              <Label>
                Read:

              </Label>
              <Input 
                  type='checkbox'
                  name='read'
                  // value={this.props.read}
                  checked={this.props.read}
                  onChange={this.props.handleChange}
                />
            </LabelAndInput>

            <SaveAndCancelContainer>
              {this.props.formType === 'newBookForm' &&
              <div>
                <SaveButton>Add</SaveButton>
                <CancelButton onClick={this.props.toggleForm}>Cancel</CancelButton>
              </div>
              }
              {this.props.formType === 'editBookForm' &&
              <div>
                <SaveButton onClick={this.props.handleClickSave}>Save</SaveButton>
                <CancelButton onClick={this.props.toggleForm}>Cancel</CancelButton>
              </div>
              }
            </SaveAndCancelContainer>
              {this.props.formType === 'editBookForm' &&
                <DeleteButton onClick={this.props.handleClickDelete} name='delete'>Delete Book</DeleteButton>
              }
          </Form>
        </Sidebar>
      )
    }
  }
              

export default BookForm