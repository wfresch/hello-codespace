/* global use, db */
use('blog-simulated')
db.getCollection('events').aggregate([
  {
    $match: { action: 'like' },
  },
  {
    $group: {
      _id: '$post',
      likes: { $count: {} },
    },
  },
])
