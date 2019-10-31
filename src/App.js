import React, {Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      users: [],
      limit: 10
    }

    this.onLoadMore = this.onLoadMore.bind(this)
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=100')
    .then(response => response.json())
    .then((data) => {
      this.setState({ users: data.results })
    })
    .catch(console.log)
  }

  onLoadMore(){
    this.setState({
      limit: this.state.limit >= this.state.users.length ? this.state.limit : this.state.limit + 10
    });
  }

  render () {
    const UserCards = this.state.users.sort((one, two) => (one.location.city > two.location.city) ? 1 : -1 ).slice(0, this.state.limit).map((user, index) => (
      <Card>
        {
          <div className="row card-center-position">
            <CardContent key={index}>
              <div className="col-sm-1">
                <img src={user.picture.thumbnail}/>
              </div>
              <div className="col-sm-4">
                <h5 className="card-title">{user.name.first + " " + user.name.last + ", " + user.dob.age}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.location.city + ", " + user.location.state + " " + user.location.postcode}</h6>
              </div>
            </CardContent>
          </div>
      }
      </Card>
    ))

    return (
      <Fragment>
        { UserCards }
        <Button class="button-center-position" variant="outlined" onClick={this.onLoadMore}>
          Load More
        </Button>
      </Fragment>
    );
  }
}

export default App;
