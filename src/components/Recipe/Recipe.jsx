import PropTypes from 'prop-types'
import { User } from '../User.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'
import placeholder from '../../assets/BSU_logo2.jpg'

export function Recipe({
  title,
  imageUrl,
  author,
  description,
  id,
  fullRecipe = false,
}) {
  const imageSrc = imageUrl || placeholder
  const imageStyle = fullRecipe
    ? {
        width: '400px',
        height: '400px',
        border: '1px solid #ccc',
        objectFit: 'cover',
      }
    : {
        width: '100px',
        height: '100px',
        border: '1px solid #ccc',
        objectFit: 'cover',
      }

  return (
    <article>
      {fullRecipe ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/recipes/${id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}
      <div>
        <img src={imageSrc} alt={title} style={imageStyle} />
      </div>
      {fullRecipe && <div>{description}</div>}
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
