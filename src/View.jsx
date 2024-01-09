import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'
function View({books , deleteBook}) {
  return books.map((book) => 
                <tr key={book.number}>
                  <td>{book.number}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td className='delete-btn' onClick={() => deleteBook(book.number)}>
                    <Icon icon={trash} />
                  </td>
                </tr>
            )  
}

export default View