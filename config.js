const env = process.env.NODE_ENV || 'production'

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
	production:{	
		APIKey : 'INSERT API KEY FROM ZOOM',
		APISecret : 'INSERT API SECRET FROM ZOOM'
	}
};

module.exports = config[env]
