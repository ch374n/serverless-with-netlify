const { query } = require('./utils/hasura')

exports.handler = async (event) => {
	const { id, title, poster , tagline } = JSON.parse(event.body) 
	
	const result = await query({
		query: `
			mutation MyMutation($poster: String = "", $tagline: String = "", $title: String = "", $id: String = "") {
			  insert_movies_one(object: {poster: $poster, tagline: $tagline, title: $title, id: $id}) {
			    poster
			    tagline
			    title
			    id
			  }
			}

		`, 
		variables: { id, title, tagline, poster } 
	})

	return {
		statusCode: 200, 
		body: JSON.stringify(result)
	}
}