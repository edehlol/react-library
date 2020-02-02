class Book {
    constructor(title, author, pages, read) {
      this.title = title
      this.author = author
      this.pages = pages
      this.read = read
      this.id = Math.floor(Date.now() / Math.random() * 3)
    }
    setTitle(newTitle) {
      this.title = newTitle
    }
  }

  export default Book