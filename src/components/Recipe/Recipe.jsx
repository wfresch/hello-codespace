import PropTypes from 'prop-types'
import { User } from '../User.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'

export function Recipe({
  title,
  imageUrl,
  author,
  description,
  id,
  fullRecipe = false,
}) {
  return (
    <article>
      {fullRecipe ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/recipes/${id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}
      {fullRecipe && <div>{description}</div>}
      {fullRecipe && <div>{imageUrl}</div>}
      {author && (
        <em>
          {fullRecipe && <br />}
          Written by <User {...author} />
        </em>
      )}
    </article>
  )
}
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  author: PropTypes.shape(User.propTypes),
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  fullRecipe: PropTypes.bool,
}
