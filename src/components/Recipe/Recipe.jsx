import PropTypes from 'prop-types'
import { User } from '../User.jsx'

export function Recipe({ title, imageUrl, author: userId }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{imageUrl}</div>
      {userId && (
        <em>
          <br />
          Written by <User id={userId} />
        </em>
      )}
    </article>
  )
}
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  author: PropTypes.string,
}
