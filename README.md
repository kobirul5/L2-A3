<h1> Library Management API</h1>

<p>A RESTful API for managing a library system, built with <strong>Express.js</strong>, <strong>TypeScript</strong>, and <strong>MongoDB (Mongoose)</strong>.</p>


<h2>🚀 Live Link</h2>
<p><em>https://library-management-two-gold.vercel.app/</em></p>

<h2> Features</h2>
<ul>
  <li>Add, update, delete, and retrieve books</li>
  <li>Borrow books with availability control</li>
  <li>Automatic copy count adjustment after borrowing</li>
  <li>Aggregation summary of borrowed books</li>
  <li>Genre-based filtering and sorting</li>
  <li>Mongoose validation</li>
</ul>

<h2> Technologies Used</h2>
<ul>
  <li><strong>Node.js</strong> with <strong>Express</strong></li>
  <li><strong>TypeScript</strong></li>
  <li><strong>MongoDB</strong> with <strong>Mongoose</strong></li>
</ul>

<

<h2> API Endpoints</h2>

<h3> Books</h3>
<ul>
  <li><strong>Create Book</strong>: <code>POST /api/books</code></li>
  <li><strong>Get All Books</strong>: <code>GET /api/books</code>
    <ul>
      <li>Supports: <code>filter</code>, <code>sort</code>, <code>limit</code></li>
    </ul>
  </li>
  <li><strong>Get Book by ID</strong>: <code>GET /api/books/:bookId</code></li>
  <li><strong>Update Book</strong>: <code>PUT /api/books/:bookId</code></li>
  <li><strong>Delete Book</strong>: <code>DELETE /api/books/:bookId</code></li>
</ul>

<h3> Borrow</h3>
<ul>
  <li><strong>Borrow Book</strong>: <code>POST /api/borrow</code>
    <ul>
      <li>Checks if copies are available</li>
      <li>Updates availability if needed</li>
    </ul>
  </li>
  <li><strong>Borrow Summary</strong>: <code>GET /api/borrow</code>
    <ul>
      <li>Aggregates total quantity per book</li>
    </ul>
  </li>
</ul>
