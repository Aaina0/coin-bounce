class BlogDetailsDTO {
  constructor(blog) {
    this.content = blog.content;
    this.title = blog.title;
    this.photo = blog.photoPath;
    this._id = blog._id;
    this.authorName = blog.author.name;
    this.authorUserName = blog.authorUserName;
    this.createdAt = blog.createdAt;
    
  }
}


module.exports= BlogDetailsDTO