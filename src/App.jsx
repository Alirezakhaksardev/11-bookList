
import { useState, useEffect } from 'react';
import View from './View';

function App() {

  const getDataFromLs = () => {
    const data = localStorage.getItem('books');
    if(data)
      return JSON.parse(data);
    else
      return [];
  }

  const [books, setBooks] = useState(getDataFromLs);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [number, setNumber] = useState("");

  // const isFound = (id) => { 

  //   books.some(element => {
  //     if (element.number === id) {
  //       return true;
  //     }
  //     return false;
  //   });
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    let book ={
      title,
      author,
      number
    }

    const isFound = books.some(e => {
      if(e.number == book.number){
        return true;
      }
      return false;
    })
    if(!isFound)
      {
        setBooks([...books,book]);
        setAuthor('');
        setNumber('');
        setTitle('')
      }

    }

  useEffect(()=>{
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])
  

  const deleteBook = number => {
    const filterBooks = books.filter((element) => {
      return element.number != number;
    });
    setBooks(filterBooks);
  }

  return (
    <div className="wrapper">
      <h1>لیست کتاب ها</h1>
      <p>کتاب جدید خود را به کتابخانه اضافه کنید.</p>
      <div className="main">
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="">عنوان</label>
              <input 
                type="text"
                className="form-control"
                required
                onChange={(e)=> setTitle(e.target.value)}
                value={title}
                />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="">نویسنده</label>
              <input 
              type="text" 
              className="form-control" 
              required
              onChange={(e)=> setAuthor(e.target.value)}
              value={author}
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="">شماره #</label>
              <input 
              type="text" 
              className="form-control" 
              required
              onChange={(e)=> setNumber(e.target.value)}
              value={number}
              />
            </div>
            <div className="form-grou mt-4">
              <button type="submit" className="btn btn-success btn-md">افزودن</button>
            </div>
          </form>
        </div>
        <div className="view-container">
          {
            books.length > 0 &&
            <>               
              <div className="table-responsive w-100">
                <table className="table">
                    <thead>
                        <tr>
                          <th>شماره#</th>
                          <th>عنوان</th>
                          <th>نویسنده</th>
                          <th>حذف</th>
                        </tr>
                      </thead>
                      <tbody>

                        <View books={books} deleteBook={deleteBook} />
                        
                      </tbody>
                </table>
              </div>
              <button className='btn btn-danger btn-md' onClick={()=> setBooks([])}>حذف همه</button>
            </>
          }
          {
            books.length < 1 && <div className='text-center' >کتابی توی کتابخانه نداریم</div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
