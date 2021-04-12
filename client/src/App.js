import { useState, useEffect } from 'react';
import { Grid, Input, Header, Button, } from 'semantic-ui-react';
import axios from 'axios';
import Tweets from './Tweets';

const App = () => {
  const [tweets, setTweets] = useState([])
  const [visible, setVisible] = useState([])
  const [search, setSearch] = useState('')
  const [tweet, setTweet] = useState('')

  useEffect( () => {
    axios.get('/api/tweets')
      .then( res => {
        setTweets(res.data)
      })
      .catch( err => console.log(err))
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
    updateVisible()
  }

  const updateVisible = () => {
    if (search.length === 0) {
      setVisible(tweets)
    }
    else if (search.length > 3) {
      axios.get(`/api/search?term=${search}`)
        .then( res => setVisible(res.data) )
        .catch( err => console.log(err))
    } 
  }

  const updateTweet = (e) => {
    setTweet(e.target.value)
  }

  const postTweet = () => {
    if (tweet) {
      axios.post('/api/tweet', { tweet })
        .then( res => {
          setTweet('')
          setTweets([...visible, res.data])
        }) 
        .catch( err => console.log(err))
    }
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column mobile={16} tablet={16} computer={4}>
          <Header as="h2" textAlign="center">Search</Header>
          <Input
            value={search}
            onChange={handleChange}
            icon={{ name: 'search', circular: true }}
            placeholder="Search..."
          />
          <hr />
          <Header as="h2" textAlign="center">Tweet Something</Header>
          <Input onChange={updateTweet} value={tweet} />
          <Button onClick={postTweet}>Tweet!</Button>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={10}>
          <Tweets tweets={visible} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
